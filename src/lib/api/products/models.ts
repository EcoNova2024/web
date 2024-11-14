import { User } from "../user/models";
import { Transaction } from "../transactions/models";
export type ProductStatus = "available" | "restored" | "sold";


export type Products = {
  products: ProductResponse[];
}

export type ProductResponse = {
  id: string;
  name: string;
  category: string;
  sub_category: string;
  description: string;
  price: number;
  rating: number;             
  rating_average: number;      
  rating_count: number;        
  created_at: string;
  status: ProductStatus;
  transactions: Transaction[];
  user: User;                 
};

export type ProductRequest = {
  name: string;
  category: string;
  sub_category: string;
  description: string;
  price: number;
  image_url?: string;         
  status?: ProductStatus;    
  user_id: string;           
};


