import { Component } from '@angular/core';
import { SwUpdateService } from './sw-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlayersAndMaps';

  constructor(public Pwa: SwUpdateService) {

  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }

}
