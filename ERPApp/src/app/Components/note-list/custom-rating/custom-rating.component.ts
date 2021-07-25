import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-rating',
  templateUrl: './custom-rating.component.html',
  styleUrls: ['./custom-rating.component.scss']
})
export class CustomRatingComponent implements OnInit {

  @Input() AverageScore: number;
  AverageScoreRemaining: number;

  constructor() { }

  ngOnInit(): void {
    this.AverageScoreRemaining = 5 - this.AverageScore;
  }

}
