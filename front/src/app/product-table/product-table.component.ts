import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Category } from '../category-table/category';
import { ApiProduct } from './apiProduct';
import { Product } from './product';

type ProductSearchOption = 'name' | 'description' | 'price' | 'category_name' | 'created_by_name' | 'created_at' | 'is_archived'
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  products?: Product[];
  categories: Category[];
  newProduct: Product;
  editedProduct: Product;
  errorMessage?: string;
  userName: string;
  userId: number;
  edit: boolean;
  searchTerm: string;
  searchOption: ProductSearchOption;
  startDate?: Date;
  endDate?: Date;

  constructor(private http: HttpClient) { 
    this.categories = [];
    this.newProduct = {id: 0, name: '', description: '', price: 0.0, category_id:0, created_by_id: 0,
            category_name: '', created_by_name :'', created_at: new Date(), is_archived: false, 
            chosen_to_be_archived: false, being_edited: false, shown: true};
    // this.editedProduct = {id: 0, name: '', description: '', price: 0.0, category_id:0, created_by_id: 0,
    //         category_name: '', created_by_name :'', created_at: new Date(), is_archived: false, 
    //         chosen_to_be_archived: false, being_edited: false, shown: true};
    this.editedProduct = this.newProduct;
    this.userName = 'admin';
    this.userId = 1;
    this.edit = false;
    this.searchTerm = '';
    this.searchOption = 'name';
    this.getProducts();
  }

  ngOnInit(): void {
  }

  getProducts(){
    this.errorMessage = '';
    this.http.get<Product[]>("https://localhost:44365/api/Products").subscribe(
      prods => {
        console.log(prods);
        this.products = prods;
        this.products.map(p => {p.being_edited = false; p.shown = true, p.chosen_to_be_archived = false});
      }
    );
    this.http.get<Category[]>("https://localhost:44365/api/Categories").subscribe(
      cats => {
        console.log(cats);
        this.categories = cats;
      }
    );
  }

  deleteProduct(id: number){
    this.errorMessage = '';
    console.log(`will delete product with id ${id}`);
    this.http.delete(`https://localhost:44365/api/Products/${id}`, {responseType: 'text',observe: 'response'}).subscribe(
      res =>{
        this.products = this.products?.filter(e => e.id !== id);

      },
      err => {
        if(err.status !== 200)
          this.errorMessage = err.error;
      }
    );
  }
  saveNewProduct():void{
    this.errorMessage = '';
    for (let i = 0; i < this.categories.length; i++) {
      const e = this.categories[i];
      if(e.id == this.newProduct.category_id) {
        console.log("inside if for loop");
        console.log(e);
        this.newProduct.category_name = e.name;
      }
    }
    var newProd : ApiProduct= {
      "id": 0,
      "name" :  this.newProduct.name,
      "description" : this.newProduct.description,
      "price": this.newProduct.price,
      "createdBy": this.userId,
      "categoryId": this.newProduct.category_id,
      "createdAt": new Date(),
      "isArchived": false
    }
    this.http.post<ApiProduct>('https://localhost:44365/api/Products', newProd).subscribe(
      res =>{
        const {id, name, description, price, categoryId, createdBy, createdAt, isArchived} = res;
        const prod: Product = {id: id, name: name, description: description, created_by_id: this.userId, created_by_name: this.userName,
                              category_id: this.newProduct.category_id, category_name: this.newProduct.category_name, price: price, 
                              created_at: createdAt, is_archived: isArchived, chosen_to_be_archived: false, shown: true, being_edited:false};
        this.products?.push(prod);
        console.log(this.products);
      },
      err => {
        console.log("error");
        console.log(err);
      }

    );
  }

  editProduct(prod: Product): void{
    this.errorMessage = '';
    for (let i = 0; i < this.categories.length; i++) {
      const e = this.categories[i];
      if(e.id == this.editedProduct.category_id) {
        console.log("inside if for loop");
        console.log(e);
        this.editedProduct.category_name = e.name;
      }
    }
    var editedProd : ApiProduct= {
      "id": 0,
      "name" :  this.editedProduct.name,
      "description" : this.editedProduct.description,
      "price": this.editedProduct.price,
      "createdBy": this.userId,
      "categoryId": this.editedProduct.category_id,
      "createdAt": new Date(),
      "isArchived": false
    }
    this.http.put<ApiProduct>('https://localhost:44365/api/Products', editedProd).subscribe(
      res =>{
        const {id, name, description, price, categoryId, createdBy, createdAt, isArchived} = res;
        const prod: Product = {id: id, name: name, description: description, created_by_id: this.userId, created_by_name: this.userName,
                              category_id: this.newProduct.category_id, category_name: this.newProduct.category_name, price: price, 
                              created_at: createdAt, is_archived: isArchived, chosen_to_be_archived: false, shown: true, being_edited:false};
        this.products = this.products?.map<Product>((p: Product):Product => {
          if(p.id === prod.id){
            p = prod
          }
          return p;
        });
      },
      err => {
        console.log("error");
        console.log(err);
      }

    );
  }

  startEditProduct(prod: Product): void{
    this.editedProduct = {id: 0, name: '', description: '', price: 0.0, category_id:0, created_by_id: 0,
            category_name: '', created_by_name :'', created_at: new Date(), is_archived: false, 
            chosen_to_be_archived: false, being_edited: false, shown: true};
    this.products = this.products?.map<Product>((p: Product) :Product => {
      if(prod.id === p.id){
        p.being_edited = true;
      }else{
        p.being_edited = false;
      }
      return p;
    });
  }

  search(): void{
    // this.categories = this.categories?.map<Category>( (c: Category): Category => {
    //   c.shown = true; 
    //   c.beingEdited = false; 
    //   return c;
    // });
    // if(!this.searchTerm)return;
    // this.categories = this.categories?.map<Category>((c: Category): Category => {
    //   switch (this.searchOption) {
    //     case 'name':
    //       if(!c.name.includes(this.searchTerm))c.shown = false;
    //       break;
    //     case 'description':
    //       if(!c.description.includes(this.searchTerm))c.shown = false;
    //       break;
    //     case 'created by':
    //       if(!c.createdByName.includes(this.searchTerm))c.shown = false;
    //       break;
    //     default:
    //       break;
    //   }
    //   return c;
    // });
  }


}