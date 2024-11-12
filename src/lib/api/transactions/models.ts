export type Transaction = {
    id: string;
    action: "submitted" | "revitalized" | "sold";
    description: string;
    image_url: string;
    item_id: string;
    created_at: string;
  };
  
  export type AddTransactionRequest = {
    action: "submitted" | "revitalized" | "sold";
    description: string;
    image_url: string;
    price: number;
  };
  