import { Injectable } from '@angular/core';
import { Marque } from 'src/app/Class/marque/marque';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.url.config';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('UserToken')
  })
};

const httpFile = {
  headers: new HttpHeaders({
    'Authorization': localStorage.getItem('UserToken')
  })
};
@Injectable({
  providedIn: 'root'
})

export class MarqueService {
  
  private marque = new Marque();
  constructor(private _http:HttpClient) { }
  
  getAllMarquesPagination(page:number):Observable<any>{
    return this._http.get(API_URL.MARQUE_URL+ '/all' + '?page='+page,httpOptions);
  } 
  getAllMarquesPaginationActive(page:number):Observable<any>{
    return this._http.get(API_URL.MARQUE_URL+  '?page='+page,httpOptions);
  } 
  getAllMarques():Observable<any>{
    return this._http.get(API_URL.MARQUE_URL+'s',httpOptions);
  } 
  
  getAllMarquesActive(isActive):Observable<any>{
    return this._http.get(API_URL.MARQUE_URL+'/all/isActive' + '?isActive=' + isActive,httpOptions);

  }
  desactiveMarque(id:Number){
    return this._http.get(API_URL.MARQUE_URL+'/desactive/'+id,httpOptions);
  }
  activeMarque(id:Number){
    return this._http.get(API_URL.MARQUE_URL+'/active/'+id,httpOptions);
  }
deleteMarque(id:Number){
    return this._http.delete(API_URL.MARQUE_URL+'/'+id,httpOptions);
  }
getMarque(id:Number){
        return this._http.get(API_URL.MARQUE_URL+'/'+id,httpOptions);
  }
    
updateMarque(formData:FormData){
    return this._http.put(API_URL.MARQUE_URL,formData,httpFile);
}
  
createMarque(formData:FormData){
  return this._http.post(API_URL.MARQUE_URL,formData,httpFile);
}
errorHandler(error:Response){
     return Observable.throw(error||"SERVER ERROR");
  }


}
