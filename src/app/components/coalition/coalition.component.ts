import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Coalition} from '../../model/coalition';

@Component({
  selector: 'cc-coalition',
  templateUrl: './coalition.component.html',
  styleUrls: ['./coalition.component.less']
})
export class CoalitionComponent implements OnChanges {
  @Input()
  coalition: Coalition;

  majoritySeats: number;
  totalSeats: number;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('coalition' in changes) {
      this.majoritySeats = this.coalition ? this.coalition.getMajoritySeats() : null;
      this.totalSeats = this.coalition ? this.coalition.getTotalSeats() : null;
    }
  }
}
