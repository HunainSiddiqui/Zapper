package main

import (
	"context"
	"encoding/json"
	"log"
	"strconv"
	"time"

	database "worker/datbase"
	"worker/funtions"
	"worker/utils"

	"github.com/segmentio/kafka-go"
)

type MessageValue struct {
	ZapRunID string `json:"zapRunId"`
	Stage    int    `json:"stage"`
}

func processKafkaMessage(msg kafka.Message, reader *kafka.Reader, kafkaWriter *kafka.Writer) {
	startTime := time.Now()
	var parsedValue MessageValue
	if err := json.Unmarshal(msg.Value, &parsedValue); err != nil {
		log.Println("Error parsing JSON:", err)
		return
	}

	type ZapRunQueryResult struct {
		ID    string `gorm:"column:id"`
		ZapID string `gorm:"column:zapId"`
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var zaprunDetails ZapRunQueryResult
	query := `SELECT id, "zapId" FROM "ZapRun" WHERE id = ?`
	err := database.DB.WithContext(ctx).Raw(query, parsedValue.ZapRunID).Scan(&zaprunDetails).Error
	if err != nil {
		log.Println("Error fetching ZapRun:", err)
		return
	}

	type Action struct {
		ID           string `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()"`
		ZapID        string `gorm:"type:uuid;not null"`
		ActionID     string `gorm:"column:actionId"`
		SortingOrder int    `gorm:"column:sortingOrder"`
		Metadata     string `gorm:"type:json;default:'{}'"`
	}

	zapID := zaprunDetails.ZapID
	var actions []Action
	query2 := `SELECT a.* FROM "Zap" z LEFT JOIN "Action" a ON a."zapId" = z.id WHERE z.id = ?;`
	err = database.DB.WithContext(ctx).Raw(query2, zapID).Scan(&actions).Error
	if err != nil {
		log.Println("Error fetching actions:", err)
		return
	}

	// Find the current action based on sorting order
	// var currentAction Action
	// // for _, act := range actions {
	// 	if act.SortingOrder == parsedValue.Stage {
	// 		currentAction = act
	// 		break
	// 	}
	// }
	// Define a channel to signal when the action is complete
	actionComplete := make(chan bool)

	for _, act := range actions {
		go func(act Action) {

			if act.SortingOrder == parsedValue.Stage {
				if act.ActionID == "email" {
					actionMetadata, err := utils.DestructureMetadata(act.Metadata)
					if err != nil {
						log.Println("Error destructuring metadata:", err)
						actionComplete <- false
						return
					}
					funtions.SendEmail(actionMetadata.Email, actionMetadata.Body)
				}
			}
			actionComplete <- true
		}(act)

		<-actionComplete
	}

	if parsedValue.Stage < len(actions)-1 {
		log.Println("Pushing back to the queue")
		nextMessage, _ := json.Marshal(MessageValue{
			Stage:    parsedValue.Stage + 1,
			ZapRunID: parsedValue.ZapRunID,
		})

		err = kafkaWriter.WriteMessages(context.Background(), kafka.Message{
			Value: nextMessage,
		})
		if err != nil {
			log.Println("Failed to push message to queue:", err)
		}
	}

	offset, _ := strconv.Atoi(strconv.FormatInt(msg.Offset, 10))
	reader.CommitMessages(context.Background(), kafka.Message{
		Topic:     msg.Topic,
		Partition: msg.Partition,
		Offset:    int64(offset) + 1,
	})
	messageDuration := time.Since(startTime)
	log.Printf("Time taken to process Kafka message: %v\n", messageDuration)

}

func main() {

	database.ConnectDatabase()

	topic := "zap-events"
	groupID := "main-worker-2"

	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers:     []string{"localhost:9092"},
		Topic:       topic,
		GroupID:     groupID,
		StartOffset: kafka.FirstOffset,
	})

	defer reader.Close()

	log.Println("Subscribed to topic:", reader.Config().Topic)

	kafkaWriter := kafka.NewWriter(kafka.WriterConfig{
		Brokers: []string{"localhost:9092"},
		Topic:   topic,
	})
	defer kafkaWriter.Close()

	for {
		msg, err := reader.ReadMessage(context.Background())
		if err != nil {
			log.Fatal("Failed to read message:", err)
		}

		go processKafkaMessage(msg, reader, kafkaWriter)
	}
}
