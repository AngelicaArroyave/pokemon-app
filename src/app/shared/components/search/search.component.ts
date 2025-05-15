import { map } from 'rxjs';
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'shared-search',
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  newPokemonList = output<string>()

  onSearch(query: string) {
    this.newPokemonList.emit(query)
  }
}
