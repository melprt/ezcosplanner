import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  selector: 'ezc-app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ezcosplanner';
}
