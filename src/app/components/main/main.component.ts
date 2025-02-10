import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  quotes = [
    "Your job search ends here!",
    "Opportunities don't happen. You create them.",
    "Find your dream job with JobNest!",
    "The best way to predict the future is to create it."
  ];
}
