export type Rating = {
    id: string;
    score: number;
    product_id: string;
    user_id: string;
    created_at: string;
  };
  
  export type AddRating = {
    product_id: string;
    score: number;
  };
  