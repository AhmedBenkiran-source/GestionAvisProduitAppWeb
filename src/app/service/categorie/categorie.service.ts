import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categorie } from 'src/app/Class/categorie/categorie';
import { Observable } from 'rxjs';
import { API_URL } from '../api.url.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': localStorage.getItem('UserToken')
  })
};
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private categorie = new Categorie();
  constructor(private _http:HttpClient) { }

  getAllCategoriesPagination(page:number):Observable<any>{
    return this._http.get(API_URL.CATEGORIE_URL+'/all'+'?page='+page ,httpOptions);
  } 
  getAllCategories():Observable<any>{
    return this._http.get(API_URL.CATEGORIE_URL+'s',httpOptions);
  } 
  getAllMCategorieActive(isActive):Observable<any>{
    return this._http.get(API_URL.CATEGORIE_URL+'/all/isActive' + '?isActive=' + isActive,httpOptions);

  }

  desactiveCategorie(id:Number){
    return this._http.get(API_URL.CATEGORIE_URL+'/desactive/'+id,httpOptions);
  }
  activeCategorie(id:Number){
    return this._http.get(API_URL.CATEGORIE_URL+'/active/'+id,httpOptions);
  }
  getCategorie(id:Number){
    return this._http.get(API_URL.CATEGORIE_URL+id,httpOptions);
  }
    
updateCategorie(categories:Categorie){
    return this._http.put(API_URL.CATEGORIE_URL,categories,httpOptions);
}
  
createCategorie(categories:Categorie){
  return this._http.post(API_URL.CATEGORIE_URL,categories,httpOptions);
}
errorHandler(error:Response){
     return Observable.throw(error||"SERVER ERROR");
  }


  
}
