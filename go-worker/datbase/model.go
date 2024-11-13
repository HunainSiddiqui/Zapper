package database

type ZapRun struct {
	ID           string       `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	ZapID        string       `gorm:"index" json:"zapId"`
	Metadata     string       `gorm:"type:jsonb"`
	Zap          Zap          `gorm:"foreignKey:ZapID;references:ID"`
	ZapRunOutbox ZapRunOutbox `gorm:"foreignKey:ZapRunID"`
}

type Zap struct {
	ID        string   `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()" json:"id"`
	TriggerID string   `json:"triggerId"`
	UserID    int      `json:"userId"`
	Actions   []Action `gorm:"foreignKey:ZapID"`
	ZapRuns   []ZapRun `gorm:"foreignKey:ZapID"`
}

type Action struct {
	ID           string          `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()"`
	ZapID        string          `gorm:"type:uuid;not null" json:"zapId"`
	Zap          Zap             `gorm:"foreignKey:ZapID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	ActionID     string          `gorm:"type:uuid;not null"`
	Type         AvailableAction `gorm:"foreignKey:ActionID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Metadata     string          `gorm:"type:json;default:'{}'"`
	SortingOrder int             `gorm:"default:0"`
}
type AvailableAction struct {
	ID      string `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()"`
	Name    string
	Image   string
	Actions []Action `gorm:"foreignKey:ActionID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
}

type Trigger struct {
	ID        string `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	ZapID     string `gorm:"unique"`
	TriggerID string
	Metadata  string           `gorm:"default:'{}'"`
	Type      AvailableTrigger `gorm:"foreignKey:TriggerID"`
	Zap       Zap              `gorm:"foreignKey:ZapID"`
}

type AvailableTrigger struct {
	ID       string `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	Name     string
	Image    string
	Triggers []Trigger `gorm:"foreignKey:TriggerID"`
}

type ZapRunOutbox struct {
	ID       string `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()"`
	ZapRunID string `gorm:"unique"`
}

type User struct {
	ID       int    `gorm:"primaryKey;autoIncrement"`
	Name     string `json:"name"`
	Email    string `gorm:"unique" json:"email"`
	Password string `json:"password"`
	Zaps     []Zap  `gorm:"foreignKey:UserID"`
}

func (ZapRun) TableName() string {
	return "ZapRun"
}

func (Zap) TableName() string {
	return "Zap"
}

func (Action) TableName() string {
	return "Action"
}

func (AvailableAction) TableName() string {
	return "AvailableAction"
}

func (Trigger) TableName() string {
	return "Trigger"
}

func (AvailableTrigger) TableName() string {
	return "AvailableTrigger"
}

func (ZapRunOutbox) TableName() string {
	return "ZapRunOutbox"
}

func (User) TableName() string {
	return "User"
}
