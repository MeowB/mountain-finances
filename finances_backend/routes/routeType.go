package routes

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type NewUser struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Pot struct {
	ID           int     `json:"id"`
	Name         string  `json:"name"`
	TotalSaved   float64 `json:"total_saved"`
	TargetAmount float64 `json:"target_amount"`
	UserID       int     `json:"user_id"`
}
