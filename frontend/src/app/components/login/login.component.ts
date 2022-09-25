import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  public changeForm() {
    let switchCtn = document.querySelector('#switch-cnt');
    let switchC1 = document.querySelector('#switch-c1');
    let switchC2 = document.querySelector('#switch-c2');
    let switchCircle = document.querySelectorAll('.switch__circle');
    let switchBtn = document.querySelectorAll('.switch-btn');
    let aContainer = document.querySelector('#a-container');
    let bContainer = document.querySelector('#b-container');
    let allButtons = document.querySelectorAll('.submit');

    switchCtn?.classList.add('is-gx');
    setTimeout(function () {
      switchCtn?.classList.remove('is-gx');
    }, 1500);

    switchCtn?.classList.toggle('is-txr');
    switchCircle[0].classList.toggle('is-txr');
    switchCircle[1].classList.toggle('is-txr');

    switchC1?.classList.toggle('is-hidden');
    switchC2?.classList.toggle('is-hidden');
    aContainer?.classList.toggle('is-txl');
    bContainer?.classList.toggle('is-txl');
    bContainer?.classList.toggle('is-z200');
  }
}
