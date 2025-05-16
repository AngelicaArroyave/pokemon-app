import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { NavbarComponent } from '@/shared/components/navbar/navbar.component';
import { PokemonService } from '@/pokemon/services/pokemon.service';
import { PokemonResponse } from '@/pokemon/interfaces/pokemon.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'page-pokemon-complete-information',
  imports: [
    NavbarComponent,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './pokemon-complete-information.component.html',
})
export class PokemonCompleteInformationComponent {
  private pokemonService = inject(PokemonService)
  private activatedRoute = inject(ActivatedRoute)

  pokemonName = this.activatedRoute.snapshot.params['name']

  pokemonImages = signal<string[]>([])

  pokemonResource = rxResource({
    request: () => ({ name: this.pokemonName }),
    loader: ({ request }) => {
      return this.pokemonService.getPokemonByName(request.name)
    }
  })

  getSprites(pokemonInformation: PokemonResponse | null): string[] {
    if (!pokemonInformation) return []

    return [
      pokemonInformation.sprites.front_default,
      pokemonInformation.sprites.front_shiny,
      pokemonInformation.sprites.back_default,
      pokemonInformation.sprites.back_shiny,
    ].filter(sprite => sprite !== null)
  }
}
