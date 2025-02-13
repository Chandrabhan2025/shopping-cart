import { Component } from '@angular/core';
import { CarouselComponent } from '../../component/carousel/carousel.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, ProductCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  productData: any [] = [];
  productSports: any [] = [];
  productBoots: any [] = [];

  constructor(private http: HttpClient){
      this.getAllShoes();
      this.getAllSports();
      this.getAllBoots();
    }
  
  
    getAllShoes(){
      this.http.get("http://localhost:8085/product/type/sneakers").subscribe((res: any)=>{
          console.log(res);
          this.productData = res.slice(0,3);
      })
    }

    getAllSports(){
      this.http.get("http://localhost:8085/product/type/sports").subscribe((res: any)=>{
        console.log(res);
        this.productSports = res.slice(0,3);
    })
    }

    getAllBoots(){
      this.http.get("http://localhost:8085/product/type/boots").subscribe((res: any)=>{
        console.log(res);
        this.productBoots = res.slice(0,3);
    })
    }
}
