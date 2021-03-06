import {MatTableDataSource} from '@angular/material';
import { MarqueService } from 'src/app/service/marque/marque.service';
import { FormControl, FormGroup } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CategorieService } from 'src/app/service/categorie/categorie.service';
import { INgxSelectOption } from 'ngx-select-ex';

import { Marque } from 'src/app/Class/marque/marque';
import { ProduitService } from 'src/app/service/produit/produit.service';
import { API_URL } from 'src/app/service/api.url.config';
import { Produit } from 'src/app/Class/produit/produit';
import { EvenementService } from 'src/app/service/evenement/evenement.service';
@Component({
  selector: 'app-liste',
  styleUrls: ['./liste_produit.component.css'],
  templateUrl: './liste_produit.component.html',


})

export class ListeProduitComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginatorCommentiare: MatPaginator;

  public array: any;
  displayedColumns: string[] = ['libelle' , 'view'];
  displayedColumnsCommentaire: string[] = [  'description','note' ];

  public dataSource: any;    
  public pageSize = 8;
  public currentPage = 0;
  public totalSize = 0; 
  imagePath: any;
  
  //public marques:Array<string> ;
  categories: any;
  marques: any;
  produit: any;
  selectedMarques = [];
  
public items:Array<any> =[];
  produits: any;
  commentaires: Object;
  pageSizeCommentaire= 1;
  arrayCommentaire: any;
  currentPageCommenatire =0;
  totalSizeCommentaire = 0;
  currentProduit: any;
  dataCommentaire: any;

  constructor(private marqueService:MarqueService,private _sanitizer: DomSanitizer,private categorieService:CategorieService,
    private produitService:ProduitService,private evenementService:EvenementService) {
  }
  URL :any
  //fileToUpload: File = null;
  ngOnInit() {
    this.getAllProduits();
    this.URL = API_URL.URL;

    }

/////////////


 public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.getAllProduits();
  }
  public getAllProduits(){
      this.produitService.getAllProduitPaginationActive(this.currentPage,8).subscribe(
        (response)=>{
          this.produits = response;
          this.dataSource = new MatTableDataSource<Element>(response['content']);
          this.array = response['content'];
        console.log(this.array);
  
          //this.pageSize = response['numberOfElements']
          console.log(response);
          this.totalSize=response['totalElements'];
          console.log('handlePage'  +   this.currentPage  , this.pageSize);
  
         this.iterator();
        });
       
    }
    
    private iterator() {
      const end = (this.currentPage + 1) * this.pageSize;
      const start = this.currentPage * this.pageSize;
      const part = this.array.slice(start, end);
      console.log('iterator'  +  part , start ,end)
      this.dataSource = part;
      
    }
    public handlePageCommentaire(e: any) {
      this.currentPageCommenatire = e.pageIndex;
      this.getAllCommentaires();
    }
    private iteratorCommentaire() {
      const end = (this.currentPageCommenatire + 1) * this.pageSizeCommentaire;
      const start = this.currentPageCommenatire * this.pageSizeCommentaire;
      const part = this.arrayCommentaire.slice(start, end);
      this.dataSource = part;
    }
    public getAllCommentaires(){
      this.evenementService.findCommentaireProduit(this.currentPageCommenatire, this.currentProduit).subscribe(
        (response)=>{
            this.commentaires =response;
            this.dataSource = new MatTableDataSource<Element>(response['content']);

            this.arrayCommentaire = response['content'];  
            console.log( this.arrayCommentaire )

            this.totalSizeCommentaire=response['totalElements'];
    
           this.iteratorCommentaire();
        });
       
    }
public getProduit(produit){
  this.currentProduit = produit.id;
  console.log( this.currentProduit)
  this.getAllCommentaires();
}
    
  }
  
  