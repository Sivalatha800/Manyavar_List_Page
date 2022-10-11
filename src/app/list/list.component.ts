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
  filterString: any;
  checkBoxData: any = [];
  showClear: boolean = false;
  constructor(
    public activatedRrouter: ActivatedRoute,
    public listService: ListService,
    public route: Router
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.getList();
  }

  // Getting Params
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
    // converting params to string text
    const filterString = Object.keys(this.listService.queryParamValues)
      .map((data) => `${data}=${this.listService.queryParamValues[data]}`)
      .join('|');
    //clear option show or hide
    const paramsLength = Object.keys(this.listService.queryParamValues);
    if (paramsLength.length != 0) {
      this.showClear = true;
    } else {
      this.showClear = false;
    }
    // setting query params before api call
    this.listService.parametersObj.f = filterString;
    //setting params before api call
    this.listService.parametersObj.pno = 1;
    this.listService.parametersObj.ps = this.listService.pageSize;
    this.listService.parametersObj.by = 'popular';
    // api call
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

  //checkbox functionality
  checkBoxFun(event: any, keyName: any) {
    this.showClear = true;
    let url: any;
    //passing single catagery
    let checkedVal = Object.keys(this.checkBoxData);

    checkedVal = checkedVal.filter((key) => this.checkBoxData[key] == true);
    console.log(checkedVal);
    var checkedJoin = checkedVal.join(':');

    if (checkedJoin != '') {
      url = {
        [keyName]: checkedJoin,
      };

      this.route.navigate([this.listService.parem1, this.listService.parem2], {
        queryParams: url,
        queryParamsHandling: 'merge',
      });
    } else {
      this.route.navigate([this.listService.parem1, this.listService.parem2], {
        queryParams: url,
      });
    }

    this.getParams();
    setTimeout(() => {
      this.getList();
    }, 300);
  }

  sampleData: any[] = [];
  data: any = {
    value: 'value',
    checked: 'checked',
  };

  //clear all filters
  onClearFilters() {
    this.checkBoxData = [];
    this.showClear = false;
    this.route.navigate([this.listService.parem1, this.listService.parem2]);
    this.listService.parametersObj.pno = 1;
    this.listService.parametersObj.ps = this.listService.pageSize;
    this.listService.parametersObj.by = 'popular';
    this.listService.parametersObj.f = '';

    this.listService.getApiForAll().subscribe((res) => {
      this.listService.productsList = res.Data.ProductsDetails;
      this.listService.totalRecords = res.Data.TotalRecords;
      this.listService.filtersList = res.Data.Facets;
    });
  }
}
