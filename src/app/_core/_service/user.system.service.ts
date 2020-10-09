import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaginatedResult } from '../_model/pagination';
import { SystemCode } from '../_model/system';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserSystemService {
  authUrl = environment.apiUrl;
  tmsUrl = 'http://10.4.4.224:106/api/';
  constructor(private http: HttpClient) { }
  mapUserSystem(obj) {
    return this.http.post(`${this.tmsUrl}UserSystem/MapUserSystem`, obj);
  }
  deleteSystem(id) { return this.http.delete(`${this.tmsUrl}UserSystem/deleteSystem/${id}`); }
  updateSystem(update) { return this.http.put(`${this.tmsUrl}UserSystem/updateSystem`, update); }
  createSystem(create) { return this.http.post(`${this.tmsUrl}UserSystem/createSystem`, create); }
  getAllSystem() {
    return this.http.get<Array<SystemCode>>(`${this.tmsUrl}UserSystem/GetAllSystem`);
    }
  getAllUserBySystem(systemID) {
    return this.http.get(`${this.tmsUrl}UserSystem/GetAllUserBySystem/${systemID}`);
    }
}
