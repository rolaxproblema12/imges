import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public getImgs(url:string){
    return this.http.get(url);
  }
  public postImg(url:string, data:any){
    return this.http.post(url, data);
  }
}
