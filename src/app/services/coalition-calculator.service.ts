/* tslint:disable:no-bitwise */
import {Injectable} from '@angular/core';
import {Coalition} from '../model/coalition';
import {Party} from '../model/party';

@Injectable({
  providedIn: 'root'
})
export class CoalitionCalculatorService {
  public calculateCoalitions(
    parties: Party[],
    exclusions: Party[][] = [],
    pairs: Party[][] = [],
    margin: number = 0,
    minimal: boolean = true,
    segmented: boolean = true
  ): Coalition[] {
    const totalSeats = this.getTotalSeats(parties);
    const threshold = this.getThreshold(totalSeats, margin);

    const segmentSeats = {};
    parties.forEach(party => segmentSeats[party.segment] = 0);
    parties.forEach(party => segmentSeats[party.segment] += party.seats);

    const pairedParties = [];
    pairs.forEach(pair => pair.forEach(party => {
        if (pairedParties.indexOf(party) < 0) {
          pairedParties.push(party);
        }
      })
    );

    return this.generatePermutations(parties)
      .filter(permutation => this.getTotalSeats(permutation) >= threshold)
      .map(permutation => new Coalition(permutation, parties.filter(party => permutation.indexOf(party) < 0)))
      .filter(coalition => !coalition.majority.find(party => party.excluded))
      .filter(coalition => !exclusions.find(exclusion => coalition.majorityContainsAll(exclusion)))
      .filter(coalition => !pairs.find(pair => coalition.majorityContainsAny(pair) && !coalition.majorityContainsAll(pair)))
      .filter(coalition => !segmented || this.isSegmented(coalition, segmentSeats))
      .filter(coalition => !minimal || this.isMinimal(coalition, pairedParties, threshold))
      .sort((a, b) => b.getMajoritySeats() - a.getMajoritySeats())
      ;
  }

  public getTotalSeats(parties: Party[]): number {
    return parties.map(party => party.seats).reduce((a, b) => a + b, 0);
  }

  public isMinimal(coalition: Coalition, pairedParties: Party[], threshold: number): boolean {
    if (coalition.majority.length === 0) {
      return true;
    }
    const seats = this.getTotalSeats(coalition.majority);
    for (const party of coalition.majority) {
      if (pairedParties.indexOf(party) < 0) {
        if (seats - party.seats >= threshold) {
          return false;
        }
      }
    }
    return true;
  }

  private getThreshold(totalSeats: number, margin: number) {
    return Math.ceil((totalSeats + 1 + margin) / 2);
  }

  private isSegmented(coalition: Coalition, segmentSeats: { [key: string]: number }): boolean {
    return !Object.keys(segmentSeats).find(segment => {
      const majority = this.getThreshold(segmentSeats[segment], 0);
      return this.getTotalSeats(coalition.majority.filter(party => party.segment === segment)) < majority;
    });
  }

  private generatePermutations<T>(objects: T[]): T[][] {
    const list: T[][] = [];
    const arity = objects.length;
    for (let n = 0; n < (1 << arity); ++n) {
      const permutation = [];
      for (let i = 0; i < arity; ++i) {
        const object = objects[i];
        const mask = (1 << i);
        if (n & mask) {
          permutation.push(object);
        }
      }
      list.push(permutation);
    }
    return list;
  }
}
