import { Injectable } from '@angular/core';
import { Marque } from 'src/app/Class/marque/marque';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.url.config';
import { Produit } from 'src/app/Class/produit/produit';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': localStorage.getItem('UserToken')
  })
};

@Injectable({
  providedIn: 'root'
})

export class ProduitService {
  
  constructor(private _http:HttpClient) { }
  
  getAllProduitPagination(page:number,pagination:number):Observable<any>{
    return this._http.get(API_URL.PRODUIT_URL+ '/all'+'?page='+page +'&pagination='+pagination,httpOptions);

  } 

  getAllProduitActive(isActive):Observable<any>{
    return this._http.get(API_URL.PRODUIT_URL+'/all/isActive' + '?isActive=' + isActive,httpOptions);
  }
  getAllProduitPaginationActive(page:number,pagination:number):Observable<any>{
    return this._http.get(API_URL.PRODUIT_URL +'?page='+page +'&pagination='+pagination,httpOptions);

  } 
  desactiveProduit(id:Number){
    return this._http.get(API_URL.PRODUIT_URL+'/desactive/'+id,httpOptions);
  }
  activeProduit(id:Number){
    return this._http.get(API_URL.PRODUIT_URL+'/active/'+id,httpOptions);
  }
deleteProduit(id:Number){
    return this._http.delete(API_URL.PRODUIT_URL+'/'+id,httpOptions);
  }
getProduit(id:Number){
    return this._http.get(API_URL.PRODUIT_URL+id,httpOptions);
  }
    
updateProduit(formData:FormData){
    return this._http.put(API_URL.PRODUIT_URL,formData,httpOptions);
}
  
createProduit(formData:FormData){
  return this._http.post(API_URL.PRODUIT_URL,formData,httpOptions);
}
errorHandler(error:Response){
     return Observable.throw(error||"SERVER ERROR");
  }


}
