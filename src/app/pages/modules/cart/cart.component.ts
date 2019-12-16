import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  selectedTab: number;
  showCartPage: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  goToSelectAddress() {
    this.selectedTab = 2;
  }

}
