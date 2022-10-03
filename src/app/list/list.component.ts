import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  productsList: any[] = [];

  constructor(public router: ActivatedRoute, public listService: ListService) {
    this.listService.parem1 = this.router.snapshot.paramMap.get('param1');
    this.listService.parem2 = this.router.snapshot.paramMap.get('param2');
  }

  ngOnInit(): void {
    this.getList();
  }
  image: any;
  title: string = '';
  totalRecords: any;
  listLength = 0;
  facets: any;
  facetArray: any[] = [];
  facetArrayList: any[] = [];

  getList() {
    this.listService.getWithParams().subscribe((res) => {
      this.productsList = res.Data.ProductsDetails;
      this.title = res.Data.ProductsDetails[0].ItemListName;
      this.facets = res.Data.Facets;
      this.totalRecords = res.Data.TotalRecords;
    });
  }

  getKeyValuePair(items: any) {
    let keys = [];
    for (let key in items) {
      keys.push({ key: key, value: items[key] });
    }

    console.log(keys);
    return keys;
  }

  throttle = 500;
  scrollDistance = 1;
  scrollUpDistance = 1;
  updateList: any[] = [];
  updateActive: boolean = false;

  onScrollDown() {
    this.listLength = this.productsList.length + this.updateList.length;
    if (this.listLength != this.totalRecords) {
      this.listService.scrollGetApi().subscribe((res) => {
        this.updateList = this.updateList.concat(res.Data.ProductsDetails);
      });
      this.updateActive = true;
    }
  }

  shortOptions(event: any) {
    this.listService.selectedShortOption = event.target.value;
    if (event.target.value == 'popular') {
      this.getList();
    } else {
      this.listService.sortOptions().subscribe((res) => {
        this.productsList = res.Data.ProductsDetails;
        this.title = res.Data.ProductsDetails[0].ItemListName;
        let fecets = res.Data.Facets;
        this.totalRecords = res.Data.TotalRecords;
      });
    }
  }
  expanBtn() {
    document.getElementById('filter_content')?.classList.toggle('show');
  }
}
