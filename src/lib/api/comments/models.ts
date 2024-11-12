export type Comment = {
    id: string;
    content: string;
    created_at: string;
    product_id: string;
    user_id: string;
  };
  
  export type AddComment = {
    content: string;
    product_id: string;
  };
  