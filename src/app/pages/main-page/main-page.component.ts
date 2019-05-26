import {Component, OnInit} from '@angular/core';
import {Coalition} from '../../model/coalition';
import {Party} from '../../model/party';
import {CoalitionCalculatorService} from '../../services/coalition-calculator.service';

@Component({
  selector: 'cc-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {
  parties: Party[];
  exclusions: Party[][];
  pairs: Party[][];

  coalitions: Coalition[];

  segmented: boolean = true;

  constructor(
    private coalitionCalculatorService: CoalitionCalculatorService
  ) {
  }

  ngOnInit() {
    const parties = [
      /*  0 */ new Party('VL', 'N-VA', '#d8d326', 25),
      /*  1 */ new Party('WA', 'PS', '#dc3a26', 20),
      /*  2 */ new Party('VL', 'VB', '#766a2d', 18),
      /*  3 */ new Party('WA', 'MR', '#3e5e9d', 14),
      /*  4 */ new Party('WA', 'Ecolo', '#71cb6c', 13),
      /*  5 */ new Party('VL', 'Open Vld', '#47749d', 12),
      /*  6 */ new Party('VL', 'CD&V', '#ffa43c', 11),
      /*  7 */ new Party('VL', 'sp.a', '#cd3436', 9),
      /*  8 */ new Party('VL', 'Groen', '#379c4b', 9),
      /*  9 */ new Party('WA', 'PTB', '#641919', 7),
      /* 10 */ new Party('WA', 'cdH', '#d16f33', 5),
      /* 11 */ new Party('VL', 'PVDA', '#641919', 5),
      /* 12 */ new Party('WA', 'Défi', '#3794c0', 2),
    ];

    const exclusions = [
      [parties[2]],
      [parties[0], parties[9]],
      [parties[0], parties[11]],
      [parties[0], parties[12]],
      [parties[6], parties[9]],
      [parties[6], parties[11]],
    ];

    const pairs = [
      [parties[5], parties[8]],
      [parties[9], parties[11]],
    ];

    parties.sort((a, b) => b.seats - a.seats);

    this.parties = parties;
    this.exclusions = exclusions;
    this.pairs = pairs;

    this.calculateCoalitions();
  }

  calculateCoalitions() {
    this.coalitions = this.coalitionCalculatorService.calculateCoalitions(this.parties, this.exclusions, this.pairs, 0, true, this.segmented);
  }
}
