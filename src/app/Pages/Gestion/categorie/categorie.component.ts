import {Component, ViewChild, TemplateRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { CategorieService } from 'src/app/service/categorie/categorie.service';
import { Categorie } from 'src/app/Class/categorie/categorie';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

const PrimaryWhite = '#fff';
const SecondaryGrey = '#ccc';
const PrimaryRed = 'var(--danger)';
const SecondaryBlue = 'var(--primary)';

@Component({
  selector: 'app-categorie',
  styleUrls: ['./categorie.component.css'],
  templateUrl: './categorie.component.html',
  styles: []
})
export class CategorieComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public array: any = null;
  displayedColumns: string[] = ['libelle', 'createdAt', 'updatedAt','active', 'action'];
  public dataSource: any;    
  public pageSize = 4;
  public currentPage = 0;
  public totalSize = 0; 

  categorie: any;
  categories: Categorie[]=[];

  constructor(private categorieService:CategorieService) {
    this.dataSource = new MatTableDataSource(this.array);

  }

  AddCate = new FormGroup({
    libelle: new FormControl(),
  });
  EditCate = new FormGroup({
    libelle: new FormControl(),


  });
  ngOnInit() {
    this.getAllCategories();
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.getAllCategories();
  }
 public isActive(element)  {
   console.log(element)
   if(element.active){
    this.categorieService.desactiveCategorie(element.id).subscribe(
      (reponse)=>{
        this.getAllCategories();

      }
    )
   }else{
    this.categorieService.activeCategorie(element.id).subscribe(
      (reponse)=>{
        this.getAllCategories();

      }
    )
   }

 }
 public getAllCategories(){
    this.categorieService.getAllCategoriesPagination(this.currentPage).subscribe(
      (response)=>{
        this.dataSource = new MatTableDataSource<Element>(response['content']);
        this.array = response['content'];
       
        //this.pageSize = response['numberOfElements']
        console.log(response);
        this.totalSize=response['totalElements'];
        this.iterator();
      });
     
  }
  
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
    
  }
  desactiveCategorie(categorie){
    console.log(categorie);
    this.categorieService.desactiveCategorie(categorie.id).subscribe((data)=>{
      this.getAllCategories();  
        this.ngOnInit();      
  
    },(error)=>{
      console.log(error);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
console.log(this.dataSource.filter)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  processForm(n){
    if(n==-1){
      this.categorie = this.AddCate.getRawValue();
     this.categorieService.createCategorie(this.categorie).subscribe((categorie)=>{ 
       this.getAllCategories();
     },(error)=>{
       console.log(error);
     });
  }else{
    this.categorie = this.EditCate.getRawValue();
    this.categorie.id=n;
     this.categorieService.updateCategorie(this.categorie).subscribe((categorie)=>{
      this.getAllCategories();
    },(error)=>{
       console.log(error);
     });
  }
    }
  
 
}
