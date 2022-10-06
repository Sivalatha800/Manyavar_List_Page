import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  throttle = 500;
  scrollDistance = 1;
  scrollUpDistance = 1;
  constructor(
    public activatedRrouter: ActivatedRoute,
    public listService: ListService,
    public route: Router
  ) {}

  ngOnInit(): void {
    this.activatedRrouter.params.subscribe((paramValues: Params) => {
      this.listService.parem1 = paramValues['param1'];
      this.listService.parem2 = paramValues['param2'];
    });
    this.getList();
  }

  //API Call On Load for Page-1
  getList() {
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
  onScrollList(product: any) {
    return product.ProductTitle;
  }

  //Sort options of get Api
  shortOptions(event: any) {
    if (event.target.value == 'price asc') {
      this.listService.parametersObj.by = 'price';
      this.listService.parametersObj.dir = 'asc';
    } else if (event.target.value == 'price desc') {
      this.listService.parametersObj.by = 'price';
      this.listService.parametersObj.dir = 'desc';
    } else if (event.target.value == 'new arrival') {
      this.listService.parametersObj.by = 'new arrival';
      this.listService.parametersObj.dir = '';
    } else {
      this.listService.parametersObj.by = 'popular';
      this.listService.parametersObj.dir = '';
    }
    this.listService.getApiForAll().subscribe((res) => {
      this.listService.productsList = res.Data.ProductsDetails;
      this.listService.totalRecords = res.Data.TotalRecords;
    });
  }

  checkBoxData: any[] = [];
  //get Filter Value
  checkBoxFun(event: any, keyName: any) {
    const selectedList = {
      displayName: keyName,
      urlName: event.target.value,
      isChecked: event.target.checked,
    };
    if (this.checkBoxData.length == 0) {
      this.checkBoxData.push(selectedList);
    } else {
      if (event.target.checked == false) {
        this.checkBoxData.forEach((check, index) => {
          if (check.urlName == event.target.value) {
            this.checkBoxData.splice(index, 1);
          }
        });
      } else {
        this.checkBoxData.push(selectedList);
      }
    }
    //pass parameters to url
    this.passParameters();
    //get api Call for filters
  }

  //passing parameters to url
  passParameters() {
    if (this.checkBoxData.length == 0) {
      this.route.navigate([this.listService.parem1, this.listService.parem2], {
        queryParams: {},
      });
    } else if (this.checkBoxData.length == 1) {
      this.route.navigate([this.listService.parem1, this.listService.parem2], {
        queryParams: {
          [this.checkBoxData[0].displayName]: this.checkBoxData[0].urlName,
        },
      });
    } else {
    }
  }
}
