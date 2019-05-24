import {Component, Input} from '@angular/core';
import {Party} from '../../model/party';

@Component({
  selector: 'cc-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.less']
})
export class PartyListComponent {
  @Input()
  parties: Party[];
}
