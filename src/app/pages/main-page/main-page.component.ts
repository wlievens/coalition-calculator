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

  constructor(
    private coalitionCalculatorService: CoalitionCalculatorService
  ) {
  }

  ngOnInit() {
    const parties = [
      /*  0 */ new Party('VL', 'N-VA', '#eaf629', 33),
      /*  1 */ new Party('WA', 'PS', '#b42a4b', 23),
      /*  2 */ new Party('WA', 'MR', '#3e5e9d', 20),
      /*  3 */ new Party('VL', 'CD&V', '#ffa43c', 18),
      /*  4 */ new Party('VL', 'Open Vld', '#47749d', 14),
      /*  5 */ new Party('VL', 'sp.a', '#a2292b', 13),
      /*  6 */ new Party('WA', 'cdH', '#d16f33', 9),
      /*  7 */ new Party('WA', 'Ecolo', '#71cb6c', 6),
      /*  8 */ new Party('VL', 'Groen', '#379c4b', 6),
      /*  9 */ new Party('VL', 'VB', '#5e5552', 3, true),
      /* 10 */ new Party('WA', 'FDF', '#3794c0', 2),
      /* 11 */ new Party('WA', 'PTB / PvdA', '#641919', 2),
      /* 12 */ new Party('WA', 'PP', '#615d6e', 1, true)
    ];

    const exclusions = [
      [parties[0], parties[10]],
      [parties[0], parties[11]]
    ];

    const pairs = [
      [parties[7], parties[8]]
    ];

    this.parties = parties;
    this.exclusions = exclusions;
    this.pairs = pairs;

    this.coalitions = this.coalitionCalculatorService.calculateCoalitions(parties, this.exclusions, this.pairs);
  }
}
