import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IP4V-CountDown';

  sub: Subscription;
  sub2: Subscription;
  countDown;
  countDown2;
  count;
  count2;
  time = 3000;
  time2 = 86400000;
  amount = 1;
  amount2 = 1;

  ngOnInit() {
    this.myTimer();
    this.daysLeft();
  }

  myTimer() {
    this.count = 5308311; // start hoeveelheid
    this.countDown = Observable.timer(0, this.time) //3000 is 3 seconden
      .subscribe(x => {
        this.count = this.count - this.amount;
      });

    this.sub = Observable.interval(500)
      .subscribe(x => {
        console.log(this.count);
        console.log(this.amount);
        if (this.count < 0) {
          this.countDown.unsubscribe();
        }
      });
    console.log(this.time);
    console.log(this.amount);
  }

  daysLeft() {
    this.count2 = 182; // start hoeveelheid
    this.countDown2 = Observable.timer(0, this.time2) //3000 is 3 seconden
      .subscribe(x => {
        this.count2 = this.count2 - this.amount2;
      });

    this.sub2 = Observable.interval(500)
      .subscribe(x => {
        console.log(this.count2);
        console.log(this.amount2);
        if (this.count2 < 0) {
          this.countDown2.unsubscribe();
        }
      });
    console.log(this.time2);
    console.log(this.amount2);
  }

  timeChange() {
    this.time = 10;
    this.time2 = 1000;
    this.amount = 292;
    this.countDown.unsubscribe();
    this.countDown2.unsubscribe();
    this.ngOnInit();
  }

  timeRevert() {
    location.reload();
  }
}

