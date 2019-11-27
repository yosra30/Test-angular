import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
 
const apiUrl = 'https://butler.luxurynsight.net/1/indexes/news';
const apiKey ='5dca84fc75a4dbe295d75470'
@Injectable({
  providedIn: 'root'
})

export class ApiService {
 searchText: string =""
 searchTextUpdated = new EventEmitter();
 displayType:string="ListView"
 displayTypeUpdate=new EventEmitter();
  constructor(private http: HttpClient) { }

  getAllNews(page:number) {
    var body={
      attributesToRetrieve:["name","url","domain","previewImage","releasedAt","_tags"],
      page:page,
      hitsPerPage:15
     }
     if (this.searchText!="")
     {
       body["query"]=this.searchText;
     }
    return this.http.post(apiUrl+'/query',body,{headers: {'x-key': apiKey}})
      .pipe(  catchError(this.errorHandl)
      );
  }
getSpecificNews(newsId){
  var attributesToRetrieve = 'name,domain,releasedAt,text,previewImage'

  return this.http.get(`${apiUrl}/${newsId}?attributesToRetrieve=${attributesToRetrieve}`,{headers: {'x-key': apiKey}})

}
setDisplaytype(type){
  this.displayType=type;
this.displayTypeUpdate.emit(this.displayType);
}
getDisplaytype(){
  return this.displayType;
}
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
 setSearchText(searchText){
this.searchText=searchText;
this.searchTextUpdated.emit(this.searchText);

 }
}
