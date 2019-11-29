import {MatTableDataSource} from '@angular/material';
import { MarqueService } from 'src/app/service/marque/marque.service';
import { FormControl, FormGroup } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CategorieService } from 'src/app/service/categorie/categorie.service';
import { INgxSelectOption } from 'ngx-select-ex';
import { Ng2ImgMaxService } from 'ng2-img-max';

import { Marque } from 'src/app/Class/marque/marque';
import { ProduitService } from 'src/app/service/produit/produit.service';
import { API_URL } from 'src/app/service/api.url.config';
import { Produit } from 'src/app/Class/produit/produit';
import { findLocaleData } from '@angular/common/src/i18n/locale_data_api';

@Component({
  selector: 'app-marque',
  styleUrls: ['./produit.component.css'],
  templateUrl: './produit.component.html',


})

export class ProduitComponent  {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public array: any;
  displayedColumns: string[] = ['libelle', 'createdAt', 'updatedAt', 'active' , 'action' ,'view'];
  public dataSource: any;    
  public pageSize = 4;
  public currentPage = 0;
  public totalSize = 0; 
  imagePath: any;
  
  //public marques:Array<string> ;
  categories: any;
  marques: any;
  produit: any;
  selectedMarques = [];
  
public itemsMarque:Array<any> =[];
public items:Array<any> =[];
  AddProduit = new FormGroup({
    nameProduit: new FormControl(),
    description: new FormControl(),

  });
  EditProduit = new FormGroup({
    nameProduit: new FormControl(),
    description: new FormControl(),

  });
  constructor(private marqueService:MarqueService,private _sanitizer: DomSanitizer,private categorieService:CategorieService,
    private produitService:ProduitService ,private ng2ImgMaxService:Ng2ImgMaxService) {
  }
  URL :any
  //fileToUpload: File = null;
  ngOnInit() {
    this.getAllMarques();
    this.getAlCategories();
    this.getAllProduits();
    this.URL = API_URL.URL;

    }

  



public isActive(element)  {
  console.log(element.active)
  if(element.active){
   this.produitService.desactiveProduit(element.id).subscribe(
     (reponse)=>{
       this.getAllProduits();
     }
   )
  }else{
   this.produitService.activeProduit(element.id).subscribe(
     (reponse)=>{
      this.getAllProduits();
     }
   )
  }

}
  public getAllMarques(){
    this.marqueService.getAllMarquesActive(true).subscribe(
      (response)=>{
        this.itemsMarque = response;
          
      });
  }
  public itemsCategorie:Array<any> =[];
  public getAlCategories(){
    this.categorieService.getAllMCategorieActive(true).subscribe(
      (response)=>{
        this.itemsCategorie = response;

      });
  }
 
private _ngxDefaultTimeout;
private _ngxDefaultInterval;
private _ngxDefault;
ngOnDestroy(): void {
  clearTimeout(this._ngxDefaultTimeout);
  clearInterval(this._ngxDefaultInterval);
}

public doNgxDefault(): any {
  return this._ngxDefault;
}

public inputTyped = (source: string, text: string) => console.log('SingleDemoComponent.inputTyped', source, text);


marque_produit : any = null;
public doSelectMarque (e: any) {
  this.marque_produit = e;
  e=null;
  console.log(this.marque_produit);
}
categorie_produit:Array<any> =[];
public doSelectCategorie (e: any) {
  this.categorie_produit.push(e);
  e=null;
  console.log(e);

  console.log(this.categorie_produit);
}
public doRemove = (produit: any) => console.log('SingleDemoComponent.doRemove', produit);

public doSelectOptions = (options: INgxSelectOption[]) => console.log('SingleDemoComponent.doSelectOptions', options);

produitFile:Array<any> =[];

handleFileInput(event) {  
  this.produitFile = []
  console.log( this.produitFile)
 
for (let index = 0; index < event.target.files.length; index++) {

  if (event.target.files && event.target.files.length > 0) {
    this.ng2ImgMaxService.resize([event.target.files[index]], 600, 300).subscribe(result => {
      this.produitFile.push( new File([result], result.name)) ;
      //all good, result is a file
      console.info(result);
   });

  }
}

}
iconeproduit:any = File;
onFileChange(event) {
 // this.iconeproduit = event.target.files[0];
  if (event.target.files && event.target.files.length > 0) {
    this.ng2ImgMaxService.resize([event.target.files[0]], 50, 50).subscribe(result => {
      this.iconeproduit = new File([result], result.name);

      //all good, result is a file
      console.info(result);
   });
  
 }
}  

/////////////
processForm(n){
  console.log(n);

  if(n==-1){

    const produit = this.AddProduit.getRawValue();
    const formData = new FormData();
    formData.append('iconeproduit', this.iconeproduit);
console.log(this.iconeproduit)
    formData.append('produit',JSON.stringify(produit));
    formData.append('marque',JSON.stringify(this.marque_produit));
    for (var i = 0; i < this.categorie_produit.length; i++) {
      formData.append('categories',this.categorie_produit[i]);
     }
    for (var i = 0; i < this.produitFile.length; i++) {
      formData.append('file',this.produitFile[i]);
      console.log(this.produitFile[i])
     }
    
  this.categorie_produit=[];
  this.marque_produit = null,

  this.produitService.createProduit(formData).subscribe((rep)=>{
   
    this.getAllProduits();
  },(error)=>{
     console.log(error);
   });
}else{
  const produit = this.EditProduit.getRawValue();
  console.log(produit);
  const formData = new FormData();
  formData.append('iconeproduit', this.iconeproduit);

  formData.append('id',JSON.stringify(n));
  formData.append('produit',JSON.stringify(produit));
  formData.append('marque',JSON.stringify(this.marque_produit));
  for (var i = 0; i < this.categorie_produit.length; i++) {
    formData.append('categories',this.categorie_produit[i]);

}

  for (var i = 0; i < this.produitFile.length; i++) {
    formData.append('file',this.produitFile[i]);

}
  this.produitService.updateProduit(formData).subscribe((rep)=>{
    this.getAllProduits();
  },(error)=>{
     console.log(error);
   });
}
  }

 public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.getAllProduits();
  }
  public getAllProduits(){
      this.produitService.getAllProduitPagination(this.currentPage,4).subscribe(
        (response)=>{
          this.dataSource = new MatTableDataSource<Element>(response['content']);
          this.array = response['content'];
 
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

  
  }
  
  