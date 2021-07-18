import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import {HttpClient} from '@angular/common/http';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';
import { ReturnStatement, ThrowStmt } from '@angular/compiler';

type SearchOption = 'name' | 'description' | 'created by';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {
  categories?: Category[];
  newTitle?: string;
  newDesc?: string;
  editTitle?: string;
  editDesc?: string;
  errorMessage?: string;
  userName: string;
  userId: number;
  edit: boolean;
  searchTerm: string;
  searchOption: SearchOption;

  constructor(private http: HttpClient) { 
    this.userName = 'admin';
    this.userId = 1;
    this.edit = false;
    this.searchTerm = '';
    this.searchOption = 'name';
    this.getCategories();
  }

  ngOnInit(): void {
  }

  getCategories(){
    this.errorMessage = '';
    this.http.get<Category[]>("https://localhost:44365/api/Categories").subscribe(
      cats => {
        console.log(cats);
        this.categories = cats;
        this.categories.map(c => {c.beingEdited = false; c.shown = true});
      }
    );
  }

  deleteCategory(id: number){
    this.errorMessage = '';
    console.log(`will delete category with id ${id}`);
    this.http.delete(`https://localhost:44365/api/Categories/${id}`, {responseType: 'text',observe: 'response'}).subscribe(
      res =>{
        console.log(res.status);
        console.log(res);
        this.categories = this.categories?.filter(e => e.id !== id);

      },
      err => {
        console.log(err.status);
        console.log(err.error);
        if(err.status !== 200)
          this.errorMessage = err.error;
      }
    );
  }
  saveNewCategory():void{
    this.errorMessage = '';
    var newCat = {
      "id": 0,
      "name" :  this.newTitle,
      "description" : this.newDesc,
      "createdBy": this.userId
    }
    this.http.post<Category>('https://localhost:44365/api/Categories', newCat).subscribe(
      res =>{
        const {id, name, description} = res;
        const cat: Category = {id: id, name: name, description: description, createdByName: this.userName, beingEdited:false, shown:true};
        this.categories?.push(cat);
        console.log(this.categories);
      },
      err => {
        console.log("error");
        console.log(err);
      }

    );
  }

  editCategory(cat: Category): void{
    this.errorMessage = '';
    var editCat = {id: cat.id, name: this.editTitle, description: this.editDesc , createdBy: this.userId};
    this.http.put<Category>('https://localhost:44365/api/Categories', editCat).subscribe(
      res =>{
        console.log(res);
        const {id, name, description} = res;
        const cat: Category = {id: id, name: name, description: description, createdByName: this.userName, beingEdited:false, shown: true};
        this.categories = this.categories?.map<Category>((c: Category):Category => {
          if(c.id === cat.id){
            c = cat
          }
          return c;
        });
        console.log(this.categories);
      },
      err => {
        console.log("error");
        console.log(err);
      }
    );
  }

  startEditCategory(cat: Category): void{
    this.editTitle = '';
    this.editDesc = '';
    this.categories = this.categories?.map<Category>((c: Category) :Category => {
      if(cat.id === c.id){
        c.beingEdited = true;
      }else{
        c.beingEdited = false;
      }
      return c;
    });
  }

  search(): void{
    this.categories = this.categories?.map<Category>( (c: Category): Category => {
      c.shown = true; 
      c.beingEdited = false; 
      return c;
    });
    if(!this.searchTerm)return;
    this.categories = this.categories?.map<Category>((c: Category): Category => {
      switch (this.searchOption) {
        case 'name':
          if(!c.name.includes(this.searchTerm))c.shown = false;
          break;
        case 'description':
          if(!c.description.includes(this.searchTerm))c.shown = false;
          break;
        case 'created by':
          if(!c.createdByName.includes(this.searchTerm))c.shown = false;
          break;
        default:
          break;
      }
      return c;
    });
  }

}
