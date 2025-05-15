import { PokemonService } from '@/pokemon/services/pokemon.service';
import { Component, computed, inject, input, linkedSignal, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  currentPage = input.required<number>()
  // pages = input<number>(0)

  // activePage = linkedSignal(this.currentPage)

  // getPagesList = computed(() => {
  //   return Array.from({ length: this.pages() }, (_, i) => i + 1)
  // })
  private pokemonService = inject(PokemonService)

  newCurrentPage = output<number>()

  pages = this.pokemonService.totalPages()

  addPage(operation?: string) {
    operation === 'add' ? this.newCurrentPage.emit(this.currentPage() + 1) : this.newCurrentPage.emit(this.currentPage() - 1)
  }
}
