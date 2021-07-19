export interface Product{
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  created_by_id: number;
  category_name: string;
  created_by_name: string;
  created_at: string;
  is_archived: boolean;
  chosen_to_be_archived: boolean;
  being_edited: boolean;
  shown: boolean;
}