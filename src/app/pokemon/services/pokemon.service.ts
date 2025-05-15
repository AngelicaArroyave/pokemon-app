import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

import { environment } from '@/environments/environment.development';
import { OptionsResponse, PokemonResponse } from '../interfaces/pokemon.interface';

const URL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient)
  totalPages = signal(0)
  currentPage = signal(1)

  getPokemonList(page: number, options?: any): Observable<any> {
    const { limit = 16, offset = (page - 1) * limit } = options || {}

    return this.http.get<any>(`${URL}/pokemon`, {
      params: { limit, offset }
    }).pipe(
      switchMap((response: OptionsResponse) => {
        this.totalPages.set(Math.ceil(response.count / limit))
        const pokemonInformation = response.results.map(pokemon => this.getPokemonImage(pokemon.url))

        return forkJoin(pokemonInformation)
      }),
    )
  }

  getPokemonByName(name: string): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${URL}/pokemon/${name}`)
  }

  getPokemonImage(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(details => ({
        name: details.name,
        image: details.sprites.front_default
      }))
    )
  }

  getNameAndUrl(name: string): Observable<any> {
    return this.getPokemonByName(name).pipe(
      map(details => ({
        name: details.name,
        image: details.sprites.front_default
      }))
    )
  }
}
