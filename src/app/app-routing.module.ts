import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Dashboards

import {AnalyticsComponent} from './Pages/Dashboards/analytics/analytics.component';

// Pages

import {ForgotPasswordBoxedComponent} from './Pages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginComponent} from './Pages/UserPages/login-boxed/login.component';
import {RegisterBoxedComponent} from './Pages/UserPages/register-boxed/register-boxed.component';

// Elements

import {MarqueComponent} from './Pages/Gestion/marque/marque.component';
import {CategorieComponent} from './Pages/Gestion/categorie/categorie.component';
import { ProduitComponent } from './Pages/Gestion/produit/produit.component';
import { EvenementComponent } from './Pages/Gestion/evenement/evenement.component';


// Widgets

import {ChartBoxes3Component} from './Pages/Widgets/chart-boxes3/chart-boxes3.component';


// Charts

import { AuthGuardService as AuthGuard} from  './service/guards/auth-guard.service';
import { ListeProduitComponent } from './Pages/Gestion/liste_produit/liste_produit.component';
import { ListeMarqueComponent } from './Pages/Gestion/liste_marque/liste_marque.component';

const routes: Routes = [
  
  {
    
    "path": '',
    "component": BaseLayoutComponent,
    "canActivate": [AuthGuard],

    "children": [

      // Dashboads

      {path: '', component: AnalyticsComponent, data: {extraParameter: 'dashboardsMenu'}},

      // Elements

      {path: 'elements/marque', component: MarqueComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/categorie', component: CategorieComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'produit', component: ProduitComponent, data: {extraParameter: 'produit'}},
      {path: 'evenement', component: EvenementComponent, data: {extraParameter: 'evenement'}},
      {path: 'listeproduit', component: ListeProduitComponent, data: {extraParameter: 'listeproduit'}},
      {path: 'listemarque', component: ListeMarqueComponent, data: {extraParameter: 'listemarque'}},




   

    ]

  },
  {
    path: '',
    component: PagesLayoutComponent
  },
   

      {"path": 'login', component: LoginComponent, data: {extraParameter: ''}},
      {"path": 'register', component: RegisterBoxedComponent, data: {extraParameter: ''}},
      {"path": 'forgot-password', component: ForgotPasswordBoxedComponent, data: {extraParameter: ''}},
  
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
