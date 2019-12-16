import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})

export class BasketComponent implements OnInit {

  // @Output() menuClick = new EventEmitter<string>();

  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  btnBasketClick: boolean = false;
  basketDisplay: boolean = false;


  constructor() { }
  
  @HostListener('document:click', ['$event'])
  clickout(event) {

    //this.eRef.nativeElement.contains(event.target) &&
    let element = event.target;

    let isBasketClick = false;

    while (element != null) {
      if (element.id == 'basket') {
        isBasketClick = true;
        break;
      }
      else
        element = element.offsetParent;
    }


    if (!isBasketClick) {//event.target.offsetParent.id != 'basket' && event.target.id != 'basket') {

    //    if (event.target.offsetParent.id != 'basket' && event.target.id != 'basket') {
      if (!this.btnBasketClick) {

        this.btnBasketBoxClose();
        this.btnBasketClick = false;
      }
      else this.btnBasketClick = false;
    }

   
  }



  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {

    // event.key == "Enter" ||
    if (event.key == "Escape") {
      this.btnBasketBoxClose();
    
    }
  }


  btnBasketBoxOpen() {
    console.log('btnBasketBoxOpen');
    this.btnBasketClick = true;
    if (this.basketDisplay) {
      this.btnBasketBoxClose();
    } else {
      this.basketDisplay = true;
      document.getElementById('basket').classList.add('display');
    }
  }

  
  btnBasketBoxClose() {
    this.basketDisplay = false;
    document.getElementById('basket').classList.remove('display');
  }
  
  ngOnInit() {
  }

}
