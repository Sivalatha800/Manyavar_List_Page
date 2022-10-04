import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { submitData } from './list/apiUrl';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJmYTM0M2VjNi1mOWJmLTQ5NzItYWI2MS01MDI0OWQ5ZGZiMjkiLCJhaWQiOiJDQUQ1MDU5MC1BMTg5LTQxNEYtQTJGNS0xMDMzOUQxRjlGOTciLCJkaWQiOiI0NDQ5NkIwMy0zNjQ3LTQ5MEMtQjJGMC0yRTE1OUIyN0QyNzgiLCJuYmYiOjE2NjQ4NTc4MjYsImV4cCI6MTY2NDk0NDIyNiwiaWF0IjoxNjY0ODU3ODI2fQ.GMdRf3FCiVypDgwWalrMiu7Cx_PXudGc_HL6RT8uNtI';

  constructor(private http: HttpClient) {}

  tokenHeaders = new HttpHeaders({
    // 'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.token,
  });

  // options = { headers: this.tokenHeaders };
  selectedShortOption: any;
  parem1: any;
  parem2: any;
  pageNo: number = 1;
  pageSize = 12;
  queryParams = {
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

  //Popular Intial get Api
  getWithParams() {
    this.queryParams.cat2 = this.parem1;
    this.queryParams.cat3 = this.parem2;
    this.queryParams.pno = this.pageNo;
    this.queryParams.ps = this.pageSize;
    this.queryParams.by = 'popular';

    return this.http
      .get(submitData, { headers: this.tokenHeaders, params: this.queryParams })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  //Scrolling Api
  scrollGetApi() {
    this.queryParams.cat2 = this.parem1;
    this.queryParams.cat3 = this.parem2;
    this.queryParams.pno = this.pageNo + 1;
    this.queryParams.ps = this.pageSize;

    // if (this.selectedShortOption == 'price asc') {
    //   this.queryParams.by = 'price';
    //   this.queryParams.dir = 'asc';
    // } else if (this.selectedShortOption == 'price desc') {
    //   this.queryParams.by = 'price';
    //   this.queryParams.dir = 'desc';
    // } else if (this.selectedShortOption == 'new arrival') {
    //   this.queryParams.by = 'new arrival';
    //   this.queryParams.dir = '';
    // } else {
    //   this.queryParams.by = 'popular';
    //   this.queryParams.dir = '';
    // }

    this.pageNo = this.queryParams.pno;

    return this.http
      .get(submitData, { headers: this.tokenHeaders, params: this.queryParams })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // Sort Options
  sortOptions() {
    this.queryParams.cat2 = this.parem1;
    this.queryParams.cat3 = this.parem2;
    this.queryParams.pno = this.pageNo;
    this.queryParams.ps = this.pageSize;

    if (this.selectedShortOption == 'price asc') {
      this.queryParams.by = 'price';
      this.queryParams.dir = 'asc';
    } else if (this.selectedShortOption == 'price desc') {
      this.queryParams.by = 'price';
      this.queryParams.dir = 'desc';
    } else if (this.selectedShortOption == 'new arrival') {
      this.queryParams.by = 'new arrival';
      this.queryParams.dir = '';
    }

    this.pageNo = this.queryParams.pno;
    return this.http
      .get(submitData, { headers: this.tokenHeaders, params: this.queryParams })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  list: any[] = [];
  url = '';
  filterOptions() {
    this.queryParams.cat2 = this.parem1;
    this.queryParams.cat3 = this.parem2;
    this.queryParams.pno = this.pageNo;
    this.queryParams.ps = this.pageSize;

    if ((this.list.length = 1)) {
      this.url = this.list[0].displayName + '=' + this.list[0].urlName;
    }

    this.queryParams.f = this.url;
    return this.http
      .get(submitData, { headers: this.tokenHeaders, params: this.queryParams })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
