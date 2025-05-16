import { Component, effect, inject, input, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { PokemonService } from '@/pokemon/services/pokemon.service';
import { PokemonResponse } from '@/pokemon/interfaces/pokemon.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'pages-pokemon-list',
  imports: [TitleCasePipe],
  templateUrl: './pokemon-list.component.html'
})
export class PokemonListComponent {
  queryName = input.required<string>()

  pokemonService = inject(PokemonService)

  pokemonInformation = signal<PokemonResponse | null>(null)

  constructor() {
    effect(() => {
      const name = this.queryName()

      if (!name) return

      firstValueFrom(this.pokemonService.getPokemonByName(name)).then(response => {
        this.pokemonInformation.set(response)
      })
    })
  }
}
