import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-status',
  imports: [FormsModule, CommonModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css'
})
export class OrderStatusComponent implements OnInit {
  statuses = ['pending', 'confirmed', 'dispatched', 'delivered'];

  currentStatusIndex: number = 0;

  @Input() orderStatus: string = ''; 

  ngOnInit(): void {
    this.updateOrderStatus(this.orderStatus);
  }

  updateOrderStatus(status: string): void {
    this.currentStatusIndex = this.statuses.indexOf(status);
  }
}
