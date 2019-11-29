import {MatTableDataSource} from '@angular/material';
import { MarqueService } from 'src/app/service/marque/marque.service';
import { FormControl, FormGroup } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Marque } from 'src/app/Class/marque/marque';
import { API_URL } from 'src/app/service/api.url.config';
import { Ng2ImgMaxService } from 'ng2-img-max';



@Component({
  selector: 'app-marque',
  styleUrls: ['./marque.component.css'],
  templateUrl: './marque.component.html',


})
export class MarqueComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public array: any;
  displayedColumns: string[] = ['libelle', 'createdAt', 'updatedAt','active', 'action','view'];
  public dataSource: any;    
  public pageSize = 4;
  public currentPage = 0;
  public totalSize = 0; 
  imagePath: any;
  public URL;
  //fileToUpload: File = null;
  ngOnInit() {
    this.getAllMarques();
     this.URL = API_URL.URL;
  }

  AddMarque = new FormGroup({
    libelle: new FormControl(),
    description: new FormControl(),
  });
  EditMarque = new FormGroup({
    libelle: new FormControl(),
    description: new FormControl(),

  });
  private marqueImages:Marque[] = []
  selectedFile: any;
  marque: any;
  marqueFile:any = File;
  constructor(private marqueService:MarqueService,private _sanitizer: DomSanitizer ,private ng2ImgMaxService:Ng2ImgMaxService) {
    // Create 100 users
    

}
public isActive(element)  {
  console.log(element)
  if(element.active){
   this.marqueService.desactiveMarque(element.id).subscribe(
     (reponse)=>{
       this.getAllMarques();

     }
   )
  }else{
   this.marqueService.activeMarque(element.id).subscribe(
     (reponse)=>{
       this.getAllMarques();

     }
   )
  }

}
handleFileInput(event) {
 
  if (event.target.files && event.target.files.length > 0) {
    this.ng2ImgMaxService.resize([event.target.files[0]], 600, 300).subscribe(result => {
      this.marqueFile = new File([result], result.name);

      //all good, result is a file
      console.info(result);
   });
  
  
}
}
public handlePage(e: any) {
  this.currentPage = e.pageIndex;
  this.getAllMarques();
}
public getAllMarques(){
    this.marqueService.getAllMarquesPagination(this.currentPage).subscribe(
      (response)=>{
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
   deleteMarque(marque){
    console.log(marque);
    this.marqueService.deleteMarque(marque.id).subscribe((data)=>{
      this.getAllMarques()  
    },(error)=>{
      console.log(error);
    });
  }
  public image:any = Marque ;
 
  public getSantizeUrl(url : string) {
    return this._sanitizer.bypassSecurityTrustUrl(url);
}
  processForm(n){
    if(n==-1){
      const marque = this.AddMarque.getRawValue();
      
      const formData = new FormData();
      formData.append('marque',JSON.stringify(marque));
      formData.append('file',this.marqueFile);

     this.marqueService.createMarque(formData).subscribe((marque)=>{
     
       this.getAllMarques();
     },(error)=>{
       console.log(error);
     });
  }else{
    this.marque = this.EditMarque.getRawValue();
    this.marque.id=n;
    const formData = new FormData();
    formData.append('marque',JSON.stringify(this.marque));
    formData.append('file',this.marqueFile);
    console.log("file file  " +formData);

     this.marqueService.updateMarque(formData).subscribe((marque)=>{
      this.getAllMarques();
    },(error)=>{
       console.log(error);
     });
  }
    }
 

  }
  
  