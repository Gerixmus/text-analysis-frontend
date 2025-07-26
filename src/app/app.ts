import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Files } from './files/files';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Files],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('text-analysis-frontend');
}
