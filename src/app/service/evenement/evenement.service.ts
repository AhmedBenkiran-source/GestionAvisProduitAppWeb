import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.url.config';
import { Commentaire } from 'src/app/Class/commentaire/commentaire';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': localStorage.getItem('UserToken')
  })
};

@Injectable({
  providedIn: 'root'
})

export class EvenementService {
  
  private commentaire = new Commentaire();
  constructor(private _http:HttpClient) { }
  
  getAllCommentairesPagination(page:number):Observable<any>{
    return this._http.get(API_URL.COMMENTAIRE_URL+ '/pagination' + '?page='+page,httpOptions);
  } 
  getAllCommentaires():Observable<any>{
    return this._http.get(API_URL.COMMENTAIRE_URL+'/all',httpOptions);
  }     
  getAllCommentairesActive(isActive):Observable<any>{
    return this._http.get(API_URL.COMMENTAIRE_URL+'/all/isActive' + '?isActive=' + isActive,httpOptions);
  }
  desactiveCommentaire(id:Number){
    return this._http.get(API_URL.COMMENTAIRE_URL+'/desactive/'+id,httpOptions);
  }
  activeCommentaire(id:Number){
    return this._http.get(API_URL.COMMENTAIRE_URL+'/active/'+id,httpOptions);
  }
  findCommentaireProduit(page:number,id:number){
    return this._http.get(API_URL.COMMENTAIRE_URL+ '/findproduit/pagination/' + id +'?page='+page ,httpOptions);
  }
  findCommentaireMarque(page:number,id:number){
    return this._http.get(API_URL.COMMENTAIRE_URL+ '/findmarque/pagination/' + id +'?page='+page ,httpOptions);
  }
  errorHandler(error:Response){
     return Observable.throw(error||"SERVER ERROR");
  }


}
