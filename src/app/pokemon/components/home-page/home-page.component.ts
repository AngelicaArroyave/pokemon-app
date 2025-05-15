import { Component, computed, effect, inject, signal } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

import { NavbarComponent } from '@/shared/components/navbar/navbar.component';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PokemonService } from '@/pokemon/services/pokemon.service';
import { SearchComponent } from '@/shared/components/search/search.component';

@Component({
  selector: 'home-page',
  imports: [
    NavbarComponent,
    PaginationComponent,
    SearchComponent,
    TitleCasePipe,
    UpperCasePipe
],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private pokemonService = inject(PokemonService)

  currentPage = signal(1)
  searchQuery = signal('')
  hasError = signal(false)

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

  updatePokemonList(query: string) {
    this.searchQuery.set(query)
  }

  onImageLoad(name: string) {
    this.loadingImages.delete(name)
  }

  updatePage(page: number) {
    this.currentPage.set(page)
  }

  resetSearch() {
    window.location.reload();
  }
}
