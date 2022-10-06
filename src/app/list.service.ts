import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { listURL } from './list/apiUrl';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI1ODE0NjE1Ni01MzUyLTQwMzUtYWQxMS1kNmE1ZmEyMjBmOTgiLCJhaWQiOiJDQUQ1MDU5MC1BMTg5LTQxNEYtQTJGNS0xMDMzOUQxRjlGOTciLCJkaWQiOiI0NDQ5NkIwMy0zNjQ3LTQ5MEMtQjJGMC0yRTE1OUIyN0QyNzgiLCJuYmYiOjE2NjUwMzExMTEsImV4cCI6MTY2NTExNzUxMSwiaWF0IjoxNjY1MDMxMTExfQ.v1RTwMDP47NcIGN2QfxoQptEpmJJGRPTo_oktVDZ4Gs';

  constructor(private http: HttpClient) {}

  tokenHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.token,
  });

  //Veriables Declaration
  parem1: any;
  parem2: any;
  pageNo: number = 1;
  pageSize = 12;
  productsList: any[] = [];
  totalRecords: any;
  filtersList: any[] = [];

  //get Api parameters object
  parametersObj = {
    cat1: 'manyavar',
    cat2: '',
    cat3: '',
    cat4: '',
    pno: 0,
    ps: 0,
    by: '',
    dir: '',
    f: '',
    ctkn: '',
    nuid: '',
    nbtid: '',
    cid: 1,
  };

  //GET API For All Functions
  getApiForAll() {
    this.parametersObj.cat2 = this.parem1;
    this.parametersObj.cat3 = this.parem2;
    return this.http
      .get(listURL, {
        headers: this.tokenHeaders,
        params: this.parametersObj,
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
