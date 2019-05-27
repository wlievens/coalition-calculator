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

  exclusionsActive: boolean = true;
  pairsActive: boolean = true;
  minimal: boolean = true;
  segmented: boolean = true;

  constructor(
    private coalitionCalculatorService: CoalitionCalculatorService
  ) {
  }

  ngOnInit() {
    const VL = 'VL';
    const WA = 'WA';
    const parties = [
      new Party(VL, 'N-VA', '#d8d326', 25),
      new Party(WA, 'PS', '#dc3a26', 20),
      new Party(VL, 'VB', '#766a2d', 18),
      new Party(WA, 'MR', '#3e5e9d', 14),
      new Party(WA, 'Ecolo', '#71cb6c', 13),
      new Party(VL, 'CD&V', '#ffa43c', 12),
      new Party(VL, 'Open Vld', '#47749d', 12),
      new Party(VL, 'sp.a', '#cd3436', 9),
      new Party(VL, 'Groen', '#379c4b', 8),
      new Party(WA, 'PTB', '#641919', 7),
      new Party(VL, 'PVDA', '#641919', 5),
      new Party(WA, 'cdH', '#d16f33', 5),
      new Party(WA, 'Défi', '#3794c0', 2),
    ];

    const exclusions = [
      [this.getParty(parties, 'VB')],
      [this.getParty(parties, 'N-VA'), this.getParty(parties, 'PTB')],
      [this.getParty(parties, 'N-VA'), this.getParty(parties, 'PVDA')],
      [this.getParty(parties, 'N-VA'), this.getParty(parties, 'Défi')],
      [this.getParty(parties, 'Open Vld'), this.getParty(parties, 'PTB')],
      [this.getParty(parties, 'Open Vld'), this.getParty(parties, 'PVDA')],
    ];

    const pairs = [
      [this.getParty(parties, 'Ecolo'), this.getParty(parties, 'Groen')],
      [this.getParty(parties, 'PTB'), this.getParty(parties, 'PVDA')],
    ];

    parties.sort((a, b) => b.seats - a.seats);

    this.parties = parties;
    this.exclusions = exclusions;
    this.pairs = pairs;

    this.calculateCoalitions();
  }

  calculateCoalitions() {
    this.coalitions = this.coalitionCalculatorService.calculateCoalitions(this.parties, this.exclusionsActive ? this.exclusions : [], this.pairsActive ? this.pairs : [], 0, this.minimal, this.segmented);
  }

  getParty(parties: Party[], name: string): Party {
    return parties.find(party => party.name === name);
  }
}
