import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export class Item {
  itemId: number;
  productName: string;
  price: number;
  quantity: number;

  constructor(itemId: number, productName: string, price: number, quantity: number) {
    this.itemId = itemId;
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
  }

  // Utility function to parse the string representation of the item
  static fromString(itemString: string): Item {
    const regex = /itemId=(\d+),\s*productName=(\w+),\s*price=([\d.]+),\s*quantity=(\d+)/;
    const matches = itemString.match(regex);

    if (matches) {
      const itemId = +matches[1]; // Convert to number
      const productName = matches[2];
      const price = +matches[3]; // Convert to number
      const quantity = +matches[4]; // Convert to number

      return new Item(itemId, productName, price, quantity);
    }
    throw new Error("Invalid item format");
  }
}


@Component({
  selector: 'app-invoice',
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {

  item: Item = {
    itemId: 0,
    productName: '',
    price: 0,
    quantity: 0
  };

  orderId: number = 0;
  orderDetails: any = {}
  parsedItems: Item[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('orderId');
      if(id){
        this.orderId = parseInt(id, 10);
        this.fetchOrderDetails(this.orderId);
      }
    })

  }

  fetchOrderDetails(orderId: number){
    this.http.get("http://localhost:8085/order/orderId/" + orderId).subscribe((res: any) => {
      this.orderDetails = res;
      if (res.items && Array.isArray(res.items)) {
        this.parsedItems = res.items.map((itemString: string) => Item.fromString(itemString));
      } else {
        console.error("No items found in the order details.");
      }
    })
  }

  fromString(itemString: any) {
    try {
      this.item = Item.fromString(itemString);
    } catch (error) {
      console.error("Error parsing item string:", error);
    }
  }

}
