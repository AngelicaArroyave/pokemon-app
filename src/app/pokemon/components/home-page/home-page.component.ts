import { Component, computed, inject, signal } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { AlertComponent } from '@/shared/components/alert/alert.component';
import { NavbarComponent } from '@/shared/components/navbar/navbar.component';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PokemonListComponent } from '@/pokemon/pages/pokemon-list/pokemon-list.component';
import { PokemonService } from '@/pokemon/services/pokemon.service';
import { SearchComponent } from '@/shared/components/search/search.component';
import { ShowAllPokemonComponent } from '@/shared/components/show-all-pokemon/show-all-pokemon.component';

@Component({
  selector: 'home-page',
  imports: [
    AlertComponent,
    NavbarComponent,
    PaginationComponent,
    PokemonListComponent,
    SearchComponent,
    ShowAllPokemonComponent,
    TitleCasePipe
],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private pokemonService = inject(PokemonService)

  currentPage = signal(1)
  searchQuery = signal('')
  hasError = signal(false)
  pokemonName = signal('')

  loadingImages = new Set<string>()

  queryParams = computed(() => ({
    page: this.currentPage(),
    query: this.searchQuery().trim().toLowerCase(),
  }))

  pokemonList = toSignal(
    toObservable(this.queryParams).pipe(
      switchMap(({ page, query }) =>
        query ? this.pokemonService.getNameAndUrl(query) : this.pokemonService.getPokemonList(page)
      ),
      map(list => Array.isArray(list) ? list : [list]),
      tap(pokeList => this.handleLoadingImages(pokeList)),
      catchError(() => {
        this.hasError.set(true)
        return of([])
      }),
    ),
    { initialValue: [] }
  )

  handleLoadingImages(pokeList: any[]) {
    this.loadingImages.clear()
    pokeList.forEach(pokemon => this.loadingImages.add(pokemon.name))
  }
}
