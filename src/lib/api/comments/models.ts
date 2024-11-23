import { User } from "../user/models"
export type Comment = {
    id: string
    content: string
    created_at: string
    product_id: string
    user_id: string
}
  
export type AddComment = {
  content: string
  product_id: string
}

export type Comments = {
  products: CommentResponse[]
}

export type CommentResponse = {
  content: string
  created_at: string
  id: string
  product_id: string
  user: User
}
