import { Component, Input, OnInit } from '@angular/core';
import { Category } from './category';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { environment } from 'src/environments/environment';

type SearchOption = 'name' | 'description' | 'created by';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {
  categories?: Category[];
  user: User | null;
  newTitle?: string;
  newDesc?: string;
  editTitle?: string;
  editDesc?: string;
  errorMessage?: string;
  edit: boolean;
  searchTerm: string;
  searchOption: SearchOption;
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.user = this.authService.getSession();
    this.edit = false;
    this.searchTerm = '';
    this.searchOption = 'name';
    this.getCategories();
  }

  ngOnInit(): void {
  }

  getCategories(){
    this.errorMessage = '';
    this.http.get<Category[]>(`${this.API_URL}/api/Categories`, {headers: {'Authorization': `Bearer ${this.user?.jwt}`}}).subscribe(
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
    this.http.delete(`${this.API_URL}/api/Categories/${id}`, 
    { headers: {'Authorization': `Bearer ${this.user?.jwt}`},responseType: 'text',observe: 'response'})
    .subscribe(
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
      "createdBy": this.user?.id
    }
    this.http.post<Category>(`${this.API_URL}/api/Categories`, newCat ,{headers: {'Authorization': `Bearer ${this.user?.jwt}`}}).subscribe(
      res =>{
        const {id, name, description} = res;
        const cat: Category = {id: id, name: name, description: description, createdByName: this.user? this.user.username: '', beingEdited:false, shown:true};
        this.categories?.push(cat);
        console.log(this.categories);
      },
      err => {
        console.log(err);
        if(err.status !=201){
          this.errorMessage = "Error creating new Category"
        }
      }

    );
  }

  editCategory(cat: Category): void{
    this.errorMessage = '';
    var editCat = {id: cat.id, name: this.editTitle, description: this.editDesc , createdBy: this.user?.id};
    this.http.put<Category>(`${this.API_URL}/api/Categories`, editCat, {headers: {'Authorization': `Bearer ${this.user?.jwt}`}}).subscribe(
      res =>{
        console.log(res);
        const {id, name, description} = res;
        const cat: Category = {id: id, name: name, description: description, createdByName: this.user? this.user.username:'', beingEdited:false, shown: true};
        this.categories = this.categories?.map<Category>((c: Category):Category => {
          if(c.id === cat.id){
            c = cat
          }
          return c;
        });
        console.log(this.categories);
      },
      err => {
        console.log(err);
        if(err.status !=201){
          this.errorMessage = "Error updating Category"
        }
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
