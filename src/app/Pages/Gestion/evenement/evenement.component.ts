import {MatTableDataSource} from '@angular/material';

import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EvenementService } from 'src/app/service/evenement/evenement.service';
import { MarqueService } from 'src/app/service/marque/marque.service';
import { AuthentificationService } from 'src/app/service/authentification/authentification.service';


@Component({
  selector: 'app-evenement',
  styleUrls: ['./evenement.component.css'],
  templateUrl: './evenement.component.html',


})

export class EvenementComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public array: any;
  displayedColumns: string[] = ['user', 'createdAt','description','note','active','view'];
  public dataSource: any;    
  public pageSize = 4;
  public currentPage = 0;
  public totalSize = 0;  
  marques: any;
  users: any;
  constructor(private _sanitizer: DomSanitizer,private evenementService:EvenementService) {}
  ngOnInit() {
    this.getAllCommentaires();
  }
  public getAllCommentaires(){
    this.evenementService.getAllCommentairesPagination(this.currentPage).subscribe(
      (response)=>{
        this.dataSource = new MatTableDataSource<Element>(response['content']);
        this.array = response['content'];
        console.log(this.array);

        //this.pageSize = response['numberOfElements']
        this.totalSize=response['totalElements'];
        console.log('handlePage'  +   this.currentPage  , this.pageSize);

       this.iterator();
      });
     
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.getAllCommentaires();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    console.log('iterator'  +  part , start ,end)
    this.dataSource = part;
    
  }
  //////////////
  public isActive(element)  {
    console.log(element.active)
    if(element.active){
     this.evenementService.desactiveCommentaire(element.id_commentaire).subscribe(
       (reponse)=>{
         this.getAllCommentaires();
       }
     )
    }else{
     this.evenementService.activeCommentaire(element.id_commentaire).subscribe(
       (reponse)=>{
        this.getAllCommentaires();
       }
     )
    }
  
  }

  }
  
  