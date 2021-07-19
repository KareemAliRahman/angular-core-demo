export interface ApiProduct{
  id: number,
  name :  string,
  description : string,
  price: number,
  createdBy: number,
  categoryId: number,
  createdAt: Date,
  isArchived: boolean
}