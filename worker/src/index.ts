require('dotenv').config()

import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs";
import { parse } from "./parser";
import { sendEmail } from "./email";
import { sendSol } from "./solana";

const prismaClient = new PrismaClient();
const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
    clientId: 'outbox-processor-2',
    brokers: ['localhost:9092']
});

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker-1' });
    await consumer.connect();
    const producer = kafka.producer();
    await producer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

    await consumer.run({
        autoCommit: false,  // for acknowledgement
        eachMessage: async ({ topic, partition, message }) => {
            // Start measuring the time for processing the message
            const messageStartTime = performance.now();

            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            });

            if (!message.value?.toString()) {
                return;
            }

            const parsedValue = JSON.parse(message.value?.toString());
            const zapRunId = parsedValue.zapRunId;
            const stage = parsedValue.stage;

            // Time taken to fetch zapRunDetails from Prisma
            const zapRunFetchStartTime = performance.now();
            const zapRunDetails = await prismaClient.zapRun.findFirst({
                where: {
                    id: zapRunId
                },
                include: {
                    zap: {
                        include: {
                            actions: {
                                include: {
                                    type: true
                                }
                            }
                        }
                    },
                }
            });
            const zapRunFetchDuration = performance.now() - zapRunFetchStartTime;
            console.log(`Time to fetch zapRunDetails: ${zapRunFetchDuration.toFixed(2)}ms`);

            const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);

            if (!currentAction) {
                console.log("Current action not found?");
                return;
            }

            const zapRunMetadata = zapRunDetails?.metadata;

            // Time taken to process the action
            const actionProcessingStartTime = performance.now();

            if (currentAction.type.id === "email") {
                const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
                const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);
                console.log(`Sending out email to ${to} body is ${body}`);
                // Uncomment below to actually send an email
                // await sendEmail(to, body);
            }

            // if (currentAction.type.id === "send-sol") {
            //   const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
            //   const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
            //   console.log(`Sending out SOL of ${amount} to address ${address}`);
            //   await sendSol(address, amount);
            // }

            // Simulate some processing delay
            await new Promise(r => setTimeout(r, 500));

            const actionProcessingDuration = performance.now() - actionProcessingStartTime;
            console.log(`Time to process action: ${actionProcessingDuration.toFixed(2)}ms`);

            const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1; // 1

            if (lastStage !== stage) {
                console.log("Pushing back to the queue");
                await producer.send({
                    topic: TOPIC_NAME,
                    messages: [{
                        value: JSON.stringify({
                            stage: stage + 1,
                            zapRunId
                        })
                    }]
                });
            }

            // Time taken to commit offsets
            const commitStartTime = performance.now();
            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition: partition,
                offset: (parseInt(message.offset) + 1).toString() // 5
            }]);
            const commitDuration = performance.now() - commitStartTime;
            console.log(`Time to commit offsets: ${commitDuration.toFixed(2)}ms`);

            // Log the total time taken to process the message
            const messageProcessingDuration = performance.now() - messageStartTime;
            console.log(`Time to process Kafka message: ${messageProcessingDuration.toFixed(2)}ms`);
        },
    });
}

main();
