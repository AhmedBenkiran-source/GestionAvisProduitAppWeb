import { Component, OnInit } from '@angular/core';
import { MarqueService } from 'src/app/service/marque/marque.service';
import { CategorieService } from 'src/app/service/categorie/categorie.service';
import { ProduitService } from 'src/app/service/produit/produit.service';
import { EvenementService } from 'src/app/service/evenement/evenement.service';
import { AuthentificationService } from 'src/app/service/authentification/authentification.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent implements OnInit {

  comtActive: any;
  comtNonActive: any;
  catActive: any;
  catNonActive: any;
  marActive: any;
  marNonActive: any;
  proActive: any;
  proNonActive: any;
  user: any;

 
  constructor(private marqueService:MarqueService,private categorieService:CategorieService,
    private produitService:ProduitService,private evenementService:EvenementService,private authentificationService:AuthentificationService ) {
  }
    ngOnInit(){
      this.getAllCommentaireActive();
      this.getAllCommentaireNonActive();
      this.getAllCategorieActive();
      this.getAllCategorieNonActive();
      this.getAllMarqueActive();
      this.getAllMarqueNonActive();
      this.getAllProduitActive();
      this.getAllProduitNonActive();
      this.getAllUser();
    }
    public getAllUser(){
      this.authentificationService.getAllUsers().subscribe((data)=>{
        this.user = data.length ;
      })
    }
    public getAllCommentaireActive(){
      this.evenementService.getAllCommentairesActive(true).subscribe((data)=>{
        this.comtActive = data.length ;
      })
    }
    public getAllCommentaireNonActive(){
      this.evenementService.getAllCommentairesActive(false).subscribe((data)=>{
        this.comtNonActive = data.length ;
      })
    }
    public getAllCategorieActive(){
      this.categorieService.getAllMCategorieActive(true).subscribe((data)=>{
        this.catActive = data.length ;
      })
    }
    public getAllCategorieNonActive(){
      this.categorieService.getAllMCategorieActive(false).subscribe((data)=>{
        this.catNonActive = data.length ;
      })
    }
    public getAllMarqueActive(){
      this.marqueService.getAllMarquesActive(true).subscribe((data)=>{
        this.marActive = data.length ;
      })
    }
    public getAllMarqueNonActive(){
      this.marqueService.getAllMarquesActive(false).subscribe((data)=>{
       this.marNonActive = data.length ;
      })
    }
    public getAllProduitActive(){
      this.produitService.getAllProduitActive(true).subscribe((data)=>{
        this.proActive = data.length ;
      })
    }
    public getAllProduitNonActive(){
      this.produitService.getAllProduitActive(false).subscribe((data)=>{
        this.proNonActive = data.length ;
      })
    }
}
