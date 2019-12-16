import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  btnAccountClick: boolean = false;
  accountDisplay: boolean = false;


  btnBasketClick: boolean = false;
  basketDisplay: boolean = false;

  isLoginVisible: Boolean = true;

  constructor(private eRef: ElementRef, private router: Router) {
  }



  @HostListener('document:click', ['$event'])
  clickout(event) {



    let element = event.target;

    let isBasketClick = false;
    let isAccountClick = false;

    while (element != null) {
      if (element.id == 'basket') {
        isBasketClick = true;
        break;
      }
      else
        element = element.offsetParent;
    }

    element = event.target;
    while (element != null) {
      if (element.id == 'account') {
        isAccountClick = true;
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

    if (!isAccountClick) {//event.target.offsetParent.id != 'basket' && event.target.id != 'basket') {

      //    if (event.target.offsetParent.id != 'basket' && event.target.id != 'basket') {
      if (!this.btnAccountClick) {

        this.btnAccountBoxClose();
        this.btnAccountClick = false;
      }
      else this.btnAccountClick = false;
    }






    //this.eRef.nativeElement.contains(event.target) &&
    // let element = event.target;

    // let isBasketClick = false;

    // while (element != null) {
    //   if (element.id == 'basket') {
    //     isBasketClick = true;
    //     break;
    //   }
    //   else
    //     element = element.offsetParent;
    // }

    // if (!isBasketClick) {
    // }

    // if (event.target.offsetParent.id != 'account' && event.target.id != 'account') {
    //   if (!this.btnAccountClick) {

    //     this.btnAccountBoxClose();
    //     this.btnAccountClick = false;
    //   }
    //   else this.btnAccountClick = false;
    // }
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key == "Escape") {
      this.btnAccountBoxClose();
    }

    if (event.key == "Escape") {
      this.btnBasketBoxClose();

    }
  }

  btnAccountBoxOpen() {
    this.btnAccountClick = true;
    if (this.accountDisplay) {
      this.btnAccountBoxClose();
    } else {
      this.accountDisplay = true;
      document.getElementById('account').classList.add('display');
    }
  }

  btnAccountBoxClose() {
    this.accountDisplay = false;
    document.getElementById('account').classList.remove('display');
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

  register_click() {

    this.btnAccountClick = true;
    this.isLoginVisible = true;

  }
  login_click() {
    this.btnAccountClick = true;
    this.isLoginVisible = false;
  }

  navigate(rout: string) {
    this.router.navigate([rout]);
  }

}
