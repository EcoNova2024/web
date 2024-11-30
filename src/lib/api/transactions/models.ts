import { User } from "../user/models"

export type Transaction = {
  id: string
  action: "submitted" | "revitalized" | "sold"
  description: string
  image_url: string
  item_id: string
  user: User
  created_at: string
}

export type AddTransactionRequest = {
  action: "submitted" | "revitalized" | "sold"
  description: string
  image_url: string
  price: number
}
