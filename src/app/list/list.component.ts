import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  throttle = 1000;
  scrollDistance = 1;
  scrollUpDistance = 1;
  constructor(
    public activatedRrouter: ActivatedRoute,
    public listService: ListService,
    public route: Router
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.getList();
  }

  getParams() {
    this.activatedRrouter.params.subscribe((paramValues: Params) => {
      this.listService.parem1 = paramValues['param1'];
      this.listService.parem2 = paramValues['param2'];
    });
    this.activatedRrouter.queryParams.subscribe((queryParamValues) => {
      this.listService.queryParamValues = queryParamValues;
    });
  }

  //intial call api call with and with out query params
  getList() {
    // console.log(this.listService.queryParamValues);
    // converting params to string text
    const filterString = Object.keys(this.listService.queryParamValues)
      .map((data) => `${data}=${this.listService.queryParamValues[data]}`)
      .join('|');

    this.listService.parametersObj.f = filterString;

    this.listService.parametersObj.pno = this.listService.pageNo;
    this.listService.parametersObj.ps = this.listService.pageSize;
    this.listService.parametersObj.by = 'popular';

    this.listService.getApiForAll().subscribe((res) => {
      this.listService.productsList = res.Data.ProductsDetails;
      this.listService.totalRecords = res.Data.TotalRecords;
      this.listService.filtersList = res.Data.Facets;
    });
  }

  // Api call on Scrolling
  onScrollDown() {
    if (this.listService.productsList.length != this.listService.totalRecords) {
      this.listService.parametersObj.pno = this.listService.pageNo + 1;
      this.listService.getApiForAll().subscribe((res) => {
        this.listService.productsList = this.listService.productsList.concat(
          res.Data.ProductsDetails
        );
        this.listService.pageNo = this.listService.parametersObj.pno;
      });
    }
  }

  // trackBy function for display items for updated list on Scroll
  onScrollList(index: any, product: any) {
    return index;
  }

  //Sort options of get Api
  sortOptions(event: any) {
    for (let sort of this.listService.sortOptions) {
      if (event.target.value == sort.value) {
        this.listService.parametersObj.by = sort.by;
        this.listService.parametersObj.dir = sort.dir;
      }
    }
    this.listService.getApiForAll().subscribe((res) => {
      this.listService.productsList = res.Data.ProductsDetails;
      this.listService.totalRecords = res.Data.TotalRecords;
    });
  }

  checkBoxData: any = [];
  checkBoxData2: any = [];
  checkBoxFun(event: any, keyName: any) {
    let { checked, value } = event.target;
    let url: any;
    if (checked == true) {
      if (this.checkBoxData2.length == 0) {
        this.checkBoxData2.push({ [keyName]: value });
      } else {
        console.log('Multy Select');
      }
    } else {
      this.checkBoxData2.forEach((check: any, index: any) => {
        let val = Object.keys(check);
        val = val.filter((key) => {
          if (check[key] == value) {
          }
        });
      });
    }

    //passing single catagery
    let checkedVal = Object.keys(this.checkBoxData);
    checkedVal = checkedVal.filter((key) => this.checkBoxData[key] == true);
    var checkedJoin = checkedVal.join(':');

    if (checkedJoin != '') {
      url = {
        [keyName]: checkedJoin,
      };
    }
    this.route.navigate([this.listService.parem1, this.listService.parem2], {
      queryParams: url,
    });
    this.getParams();
    setTimeout(() => {
      this.getList();
    }, 300);
  }
}
