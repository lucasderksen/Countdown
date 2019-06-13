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
  vaak = 0;
  time = 3000;
  time2 = 86400000;
  amount = 1;
  amount2 = 1;
  private currentDate: Date;
  private exhaustionDate: Date;

  ngOnInit() {
    this.count2 = this.calcDaysBetween(); // start hoeveelheid dagen
    this.count = this.count2 * 29166 //5308311; // start hoeveelheid 
    this.myTimer();
    this.daysLeft();
  }

  myTimer() {
    this.countDown = Observable.timer(0, this.time) //3000 is 3 seconden 10 is 0.01 seconden
      .subscribe(x => {
        this.count = this.count - this.amount;
      });

    this.sub = Observable.interval(500)
      .subscribe(x => {
        console.log("count: ", this.count);
        console.log("amount: ", this.amount);
        if (this.count < 2087) {
          this.count = 0;
          this.countDown.unsubscribe();
        }
      });
    console.log(this.time);
    console.log(this.amount);
  }

  daysLeft() {
    this.countDown2 = Observable.timer(0, this.time2) //3000 is 3 seconden
      .subscribe(x => {
        this.count2 = this.count2 - this.amount2;
        console.log("times", this.vaak = this.vaak +1);
      });
    this.sub2 = Observable.interval(500)
      .subscribe(x => {
        console.log(this.count2);
        console.log(this.amount2);
        if (this.count2 < 1) {
          this.countDown2.unsubscribe();
        }
      });
    console.log(this.time2);
    console.log(this.amount2);
  }

  timeChange() {
    this.time = 10;
    this.time2 = 1000;

    this.amount = this.count / this.count2;
    this.amount = Math.ceil(this.amount / 100);
    console.log("per seconden eraf", this.amount);
    this.countDown.unsubscribe();
    this.countDown2.unsubscribe();
    this.ngOnInit();
  }

  timeRevert() {
    location.reload();
  }

  public calcDaysBetween() {
    this.currentDate = new Date();
    console.log(this.currentDate);
    this.exhaustionDate = new Date("Wed Nov 20 2019");
    console.log("exhaustion date", this.exhaustionDate)
    const diff = Math.abs(this.exhaustionDate.getTime() - this.currentDate.getTime());
    console.log("difference", Math.ceil(diff / (1000 * 3600 * 24)));
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
}

