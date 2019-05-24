import {Party} from './party';

export class Coalition {
  constructor(
    public majority: Party[],
    public opposition: Party[]
  ) {
  }

  getMajoritySeats(): number {
    return this.majority.map(party => party.seats).reduce((a, b) => a + b, 0);
  }

  getOppositionSeats(): number {
    return this.opposition.map(party => party.seats).reduce((a, b) => a + b, 0);
  }

  getTotalSeats(): number {
    return this.getMajoritySeats() + this.getOppositionSeats();
  }

  majorityContainsAny(parties: Party[]) {
    return !!parties.find(party => this.majority.indexOf(party) >= 0);
  }

  majorityContainsAll(parties: Party[]) {
    return !parties.find(party => this.majority.indexOf(party) < 0);
  }
}
