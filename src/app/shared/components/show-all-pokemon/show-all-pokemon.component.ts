import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-show-all-pokemon',
  imports: [],
  templateUrl: './show-all-pokemon.component.html',
})
export class ShowAllPokemonComponent {
  style = input.required<string>()

  resetSearch() {
    window.location.reload();
  }
}
