import { UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { ShowAllPokemonComponent } from '../show-all-pokemon/show-all-pokemon.component';

@Component({
  selector: 'shared-alert',
  imports: [
    ShowAllPokemonComponent,
    UpperCasePipe
  ],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  searchQuery = input.required<string>()
}
