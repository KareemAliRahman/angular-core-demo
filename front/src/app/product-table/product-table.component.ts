import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Category } from '../category-table/category';
import { User } from '../user';
import { ApiProduct } from './apiProduct';
import { Product } from './product';

type ProductSearchOption = 'name' | 'description' | 'price' | 'category_name' | 'created_by_name' | 'created_at' | 'is_archived'
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  user: User | null;
  products: Product[];
  categories: Category[];
  newProduct: Product;
  editedProduct: Product;
  errorMessage?: string;
  edit: boolean;
  searchTerm: string;
  searchOption: ProductSearchOption;
  startDate: string;
  endDate: string;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.user = this.authService.getSession();
    console.log(this.user);
    this.categories = [];
    this.products = [];
    this.newProduct = {id: 0, name: '', description: '', price: 0.0, category_id:0, created_by_id: 0,
            category_name: '', created_by_name :'', created_at: String(new Date()), is_archived: false, 
            chosen_to_be_archived: false, being_edited: false, shown: true};
    this.editedProduct = this.newProduct;
    this.edit = false;
    this.searchTerm = '';
    this.startDate = '';
    this.endDate = '';
    this.searchOption = 'name';
    this.getProducts();
  }

  ngOnInit(): void {
  }

  getProducts(){
    this.errorMessage = '';
    this.http.get<Product[]>("https://localhost:44365/api/Products", {headers: {'Authorization': `Bearer ${this.user?.jwt}`}}).subscribe(
      prods => {
        console.log(prods);
        this.products = prods;
        this.products.map(p => {p.being_edited = false; p.shown = true, p.chosen_to_be_archived = false});
      }
    );
    this.http.get<Category[]>("https://localhost:44365/api/Categories", {headers: {'Authorization': `Bearer ${this.user?.jwt}`}}).subscribe(
      cats => {
        console.log(cats);
        this.categories = cats;
      }
    );
  }

  deleteProduct(id: number){
    this.errorMessage = '';
    console.log(`will delete product with id ${id}`);
    this.http.delete(`https://localhost:44365/api/Products/${id}`, {headers: {'Authorization': `Bearer ${this.user?.jwt}`}, responseType: 'text',observe: 'response'}).subscribe(
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
        this.newProduct.category_name = e.name;
      }
    }
    var newProd : ApiProduct= {
      "id": 0,
      "name" :  this.newProduct.name,
      "description" : this.newProduct.description,
      "price": this.newProduct.price,
      "createdBy": this.user? this.user.id: 0,
      "categoryId": this.newProduct.category_id,
      "createdAt": new Date().toISOString(),
      "isArchived": false
    }
    console.log(JSON.stringify(newProd));
    this.http.post<ApiProduct>('https://localhost:44365/api/Products', newProd, {headers: {'Authorization': `Bearer ${this.user?.jwt}`}}).subscribe(
      res =>{
        const {id, name, description, price, categoryId, createdBy, createdAt, isArchived} = res;
        const prod: Product = {id: id, name: name, description: description, created_by_id: createdBy, created_by_name: this.user? this.user.username: '',
                              category_id: this.newProduct.category_id, category_name: this.newProduct.category_name, price: price, 
                              created_at: createdAt, is_archived: isArchived, chosen_to_be_archived: false, shown: true, being_edited:false};
        this.products?.push(prod);
        console.log(this.products);
      },
      err => {
        console.log(err);
        if(err.status !=201){
          this.errorMessage = "Error creating new Product"
        }
      }

    );
  }

  editProduct(prod: Product): void{
    this.errorMessage = '';
    var editedProd : ApiProduct= {
      "id": prod.id,
      "name" :  this.editedProduct.name? this.editedProduct.name : prod.name,
      "description" : this.editedProduct.description? this.editedProduct.description : prod.description,
      "price": this.editedProduct.price? this.editedProduct.price : prod.price,
      "createdBy": this.user? this.user.id: 0,
      "categoryId": this.editedProduct.category_id? this.editedProduct.category_id : prod.category_id, 
      "createdAt": prod.created_at,
      "isArchived": prod.is_archived
    }
    for (let i = 0; i < this.categories.length; i++) {
      const e = this.categories[i];
      if(e.id == this.editedProduct.category_id) {
        this.editedProduct.category_name = e.name;
      }
    }
    this.http.put<ApiProduct>('https://localhost:44365/api/Products', editedProd, {headers: {'Authorization': `Bearer ${this.user?.jwt}`}}).subscribe(
      res =>{
        const {id, name, description, price, categoryId, createdBy, createdAt, isArchived} = res;
        const eprod: Product = {id: id, name: name, description: description, created_by_id: prod.created_by_id, created_by_name: prod.created_by_name,
                              category_id: this.editedProduct.category_id, category_name: this.editedProduct.category_name, price: price, 
                              created_at: createdAt, is_archived: isArchived, chosen_to_be_archived: false, shown: true, being_edited:false};
        this.products = this.products?.map<Product>((p: Product):Product => {
          if(p.id === eprod.id){
            p = eprod
          }
          return p;
        });
      },
      err => {
        console.log(err);
        if(err.status !=201){
          this.errorMessage = "Error updating Product"
        }
      }

    );
  }

  startEditProduct(prod: Product): void{
    this.errorMessage = '';
    this.editedProduct = prod;
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
    this.errorMessage = '';
    this.products = this.products?.map<Product>( (p: Product): Product => {
      p.shown = true; 
      p.being_edited = false; 
      p.chosen_to_be_archived = false;
      return p;
    });

    if(!this.searchTerm&&!(this.searchOption == 'created_at'))return;
    if(this.searchOption == 'created_at' && (!this.startDate || !this.endDate))return;
    this.products = this.products?.map<Product>((p: Product): Product => {
      console.log(this.searchOption);
      switch (this.searchOption) {
        case 'name':
          if(!p.name.includes(this.searchTerm))p.shown = false;
          break;
        case 'description':
          if(!p.description.includes(this.searchTerm))p.shown = false;
          break;
        case 'created_by_name':
          if(!p.created_by_name.includes(this.searchTerm))p.shown = false;
          break;
        case 'category_name':
          if(!p.category_name.includes(this.searchTerm))p.shown = false;
          break;
        case 'is_archived':
          if(!String(p.is_archived).includes(this.searchTerm))p.shown = false;
          break;
        case 'price':
          if(!String(p.price).includes(this.searchTerm))p.shown = false;
          break;
        case 'created_at':
          if(!(Date.parse(this.startDate)<=Date.parse(p.created_at) && 
               Date.parse(this.endDate)>= Date.parse(p.created_at)))p.shown = false;
          break;
        default:
          break;
      }
      return p;
    });
  }

  archiveProducts():void{
    this.errorMessage = '';
    var archivedProductsIds: number[] = [];
    for(let p of this.products){
      if(p.chosen_to_be_archived)archivedProductsIds.push(p.id);
    }
    this.http.patch<number[]>('https://localhost:44365/api/Products', archivedProductsIds, {headers:{'Authorization': `Bearer ${this.user?.jwt}`}}).subscribe(
      res=>{
        for(let i of archivedProductsIds){
          for( let p of this.products){
            if(p.id == i){
              p.chosen_to_be_archived = false;
              p.is_archived = true;
            }
          }
        }
      },
      err =>{
        console.log(err);
        this.errorMessage = "Error archiving products";
      }

    )
  }
}