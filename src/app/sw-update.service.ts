import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {

  constructor(updates: SwUpdate) {
    updates.available.subscribe(event => {
      console.log('Event Type is ', event.type);
      console.log('Current version ', event.current);
      console.log('Available version is ', event.available);
    });

    updates.activated.subscribe(event => {
      console.log('Event type is ', event.type);
      console.log('Old veriosn', event.previous);
      console.log('Current Version', event.current);
    });
  }
}
