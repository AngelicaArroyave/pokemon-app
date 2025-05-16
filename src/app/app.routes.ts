import { Routes } from '@angular/router';

import { HomePageComponent } from './pokemon/components/home-page/home-page.component';
import { PokemonCompleteInformationComponent } from './pokemon/pages/pokemon-complete-information/pokemon-complete-information.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'pokemon/:name',
    component: PokemonCompleteInformationComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
