import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Party} from '../../model/party';
import {CoalitionCalculatorService} from '../../services/coalition-calculator.service';

@Component({
  selector: 'cc-party-table',
  templateUrl: './party-table.component.html',
  styleUrls: ['./party-table.component.less']
})
export class PartyTableComponent implements OnChanges {
  @Input()
  parties: Party[];

  totalSeats: number;

  constructor(
    private coalitionCalculatorService: CoalitionCalculatorService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('parties' in changes) {
      this.totalSeats = this.parties ? this.coalitionCalculatorService.getTotalSeats(this.parties) : null;
    }
  }
}
