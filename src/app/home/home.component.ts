import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { GlobalService } from '../services/global-service';
import { DateSourceService } from '../services/http-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DateSourceService]
})
export class HomeComponent implements OnInit {
  loginState: boolean = false;
  tableAction: boolean = false;
  dataSource: any[] = [];
  loading: boolean = false;
  editMode: boolean = false
  constructor(
    private globalService: GlobalService,
    private dataSourceService: DateSourceService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.checkUserLoginState()
    this.getData()
  }

  getData() {
    this.loading = true
    this.dataSourceService.getData().then(
      res => {
        let _data: any = res;
        this.dataSource = _data.result;
        console.log(this.dataSource);
      },
      err => { this.toastr.error('falid to get data') }
    ).finally(() => {
      this.loading = false
    })
  }

  addNewItem() {
    this.tableAction = !this.tableAction;
    let panelElm = document.getElementById('panelElm') as HTMLDivElement;
    if (this.tableAction) {
      panelElm.style.maxHeight = panelElm.scrollHeight + 'px';
    } else {
      panelElm.style.maxHeight = '0';
    }
  }

  checkUserLoginState() {
    this.globalService.currentLoginState.subscribe(loginState => this.loginState = loginState)

    // if(!this.loginState) {
    //   this.router.navigateByUrl('/')
    // }
  }

  getNewItem(data: any) {
    data.IsEnabled = true;
    // generat id for new item
    let generatID = parseInt(this.dataSource[this.dataSource.length - 1].Id) + 1;
    data.Id = generatID;
    //add item to the end of table
    this.dataSource.push(data);
    this.tableAction = false
  }

  deleteItem(item: any) {
    Swal.fire({
      showDenyButton: true,
      title: "Warning",
      text: 'Do you want to delete this item ?',
      icon: "warning",
      confirmButtonColor: '#3f51b5',
      denyButtonColor: '#ff4081',
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.loading = true
        let body = {
          "Id": item.Id
        }
        this.dataSourceService.deleteItem(body).then(
          res => {
            // delete from list
            let index = this.dataSource.findIndex(data => data.Id == item.Id)
            this.dataSource.splice(index, 1)
            Swal.fire({
              text: ' The item has been deleted !',
              icon: "success",
              confirmButtonText: 'OK',
              confirmButtonColor: '#3f51b5',
            });
          },
          err => {
            this.toastr.error(err.statusText)
          }
        ).finally(() => {
          this.loading = false
        })
      }
    })
  }


  editItem(item: any) {
    // open panel
    if (!this.tableAction) {
      this.addNewItem();
    } else {
      this.editMode = true
      window.scrollTo(0, 0)
    }

  }

}
