import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {
  search?: string;

  onEnterPress():void{
    console.log("lsdkl");
  }


  constructor() { }

  ngOnInit(): void {
  }

}
