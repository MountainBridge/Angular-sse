import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  message = '';
  messages: any[];
  sub: Subscription;

  constructor(private zone: NgZone, private http: HttpClient) {
  }

  getMessages(): Observable<any> {

    return Observable.create(
      observer => {

        let source = new EventSource("http://ec2-3-127-141-112.eu-central-1.compute.amazonaws.com:8402/v1/notifications/subscribe");
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }

        source.onerror = event => {
          this.zone.run(() => {
            observer.error(event)
          })
        }
      }
    )
  }

  ngOnInit(): void {
    this.messages = [];
    this.sub = this.getMessages().subscribe({
      next: data => {
        console.log('data::', data);
        this.addMessage(data);
      },
      error: err => console.error(err)
    });
  }

  addMessage(msg: any) {
    this.messages = msg;
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
