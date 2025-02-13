import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { SearchService } from '../../service/searchService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product',
  imports: [ProductCardComponent, CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  productType: string [] = [];
  category: string [] = [];
  searchQuery: string ='';
  productAll: any [] = [];
  filteredProducts: any [] = [];

  selectedPriceSort: string = 'all';
  selectedProductType: string = 'all';
  selectedCategory: string = 'all';

  constructor(private http: HttpClient, private searchService: SearchService){
    this.getAllProducts();
  }
  ngOnInit(): void {
    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.filterProducts();
      console.log(this.searchQuery)
    })
  }

  filterProducts(): void{
    if(this.searchQuery){
      this.filteredProducts = this.filteredProducts.filter(product => {
        return product.productName.toLowerCase().includes(this.searchQuery.toLowerCase());
      })
    }else{
      this.filteredProducts = [...this.productAll];
    }
  } 

  getAllProducts(){
    this.http.get("http://localhost:8085/product").subscribe((res: any)=>{
      this.productAll = res;
      this.filteredProducts = [...this.productAll];
    
      const uniqueCategory: Set<string> = new Set();
      this.productAll.forEach((product: any) => {
        if(product.category){
          uniqueCategory.add(product.category);
        }
      })
      this.category = Array.from(uniqueCategory);

      const uniqueProductType: Set<string> = new Set();
      this.productAll.forEach((product: any) => {
        if(product.productType){
          uniqueProductType.add(product.productType);
        }
      })
      this.productType = Array.from(uniqueProductType);
  })
  }

  sortByPrice(): void {
    console.log(this.selectedPriceSort);
    if (this.selectedPriceSort === 'asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedPriceSort === 'desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  sortByProductType(): void{
    console.log(this.selectedProductType);
    if(this.selectedProductType && this.selectedProductType !== 'all'){
      this.filteredProducts = this.productAll.filter(product => product.productType === this.selectedProductType);
    }else{
      this.filteredProducts = [...this.productAll];
    }
  }

  sortByCategory(): void{
    console.log(this.selectedCategory);
    if(this.selectedCategory && this.selectedCategory !== 'all'){
      this.filteredProducts = this.productAll.filter(product => product.category === this.selectedCategory)
    }else{
      this.filteredProducts = [...this.filteredProducts];
    }
  }

  clearAllFilter(): void{
    this.selectedPriceSort = 'all';
    this.selectedCategory = 'all';
    this.selectedProductType = 'all';
    this.filteredProducts = [...this.productAll];
  }

}
