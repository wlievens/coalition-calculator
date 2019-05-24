import {TestBed} from '@angular/core/testing';
import {Coalition} from '../model/coalition';
import {Party} from '../model/party';

import {CoalitionCalculatorService} from './coalition-calculator.service';

describe('CoalitionCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoalitionCalculatorService = TestBed.get(CoalitionCalculatorService);
    expect(service).toBeTruthy();
  });

  it('should calculate total seats correclty', () => {
    const service: CoalitionCalculatorService = TestBed.get(CoalitionCalculatorService);
    const parties = [
      new Party('X', 'A', '', 12, false),
      new Party('X', 'B', '', 8, false)
    ];
    expect(service.getTotalSeats(parties)).toEqual(20);
  });

  it('should calculate minimality correctly', () => {
    const service: CoalitionCalculatorService = TestBed.get(CoalitionCalculatorService);
    const party1 = new Party('X', 'A', '', 12, false);
    const party2 = new Party('X', 'B', '', 8, false);
    const coalition1 = new Coalition([party1], [party2]);
    const coalition2 = new Coalition([party1, party2], []);
    expect(service.isMinimal(coalition1, [], 11)).toEqual(true);
    expect(service.isMinimal(coalition2, [], 11)).toEqual(false);
  });

  it('should ignore pairs for minimality', () => {
    const service: CoalitionCalculatorService = TestBed.get(CoalitionCalculatorService);
    const party1 = new Party('X', 'A', '', 10, false);
    const party2 = new Party('X', 'B', '', 8, false);
    const party3 = new Party('X', 'C', '', 6, false);
    const party4 = new Party('X', 'D', '', 1, false);
    const coalition1 = new Coalition([party1, party2], null);
    const coalition2 = new Coalition([party1, party3], null);
    const coalition3 = new Coalition([party1, party2, party4], null);
    const coalition4 = new Coalition([party1, party3, party4], null);
    const coalition5 = new Coalition([party2, party3], null);
    const coalition6 = new Coalition([party2, party3, party4], null);
    const pairedParties = [party3, party4];
    expect(service.isMinimal(coalition1, pairedParties, 13)).toEqual(true);
    expect(service.isMinimal(coalition2, pairedParties, 13)).toEqual(true);
    expect(service.isMinimal(coalition3, pairedParties, 13)).toEqual(true); // false without pairing
    expect(service.isMinimal(coalition4, pairedParties, 13)).toEqual(true); // false without pairing
    expect(service.isMinimal(coalition5, pairedParties, 13)).toEqual(true);
    expect(service.isMinimal(coalition6, pairedParties, 13)).toEqual(true); // false without pairing
  });
});
