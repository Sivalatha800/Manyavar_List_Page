import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { listURL } from './list/apiUrl';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5YzY1ZTgyYy03YjZlLTQ5OTQtODhlMy0wODdiZDk2YWUwMzkiLCJhaWQiOiJDQUQ1MDU5MC1BMTg5LTQxNEYtQTJGNS0xMDMzOUQxRjlGOTciLCJkaWQiOiI0NDQ5NkIwMy0zNjQ3LTQ5MEMtQjJGMC0yRTE1OUIyN0QyNzgiLCJuYmYiOjE2NjU1NDk5NjksImV4cCI6MTY2NTYzNjM2OSwiaWF0IjoxNjY1NTQ5OTY5fQ.u4CUHJhwuikgmjSSyqfxwgHYp8cL7IBXdxWBuvx_dw8';

  constructor(private http: HttpClient) {}

  tokenHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.token,
  });

  //Veriables Declaration
  parem1: any;
  parem2: any;
  queryParamValues: any;
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

  //sort Options Array
  sortOptions = [
    { name: 'Best Seller', value: 'popular', by: 'popular', dir: '' },
    { name: 'Price Low to High', value: 'price asc', by: 'price', dir: 'asc' },
    {
      name: 'Price High to Low',
      value: 'price desc',
      by: 'price',
      dir: 'desc',
    },
    { name: 'New Arrival', value: 'new arrival', by: 'new arrival', dir: '' },
  ];

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
