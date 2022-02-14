import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { GlobalService } from '../services/global-service';
import { DateSourceService } from '../services/http-service';
import { TableActionsComponent } from './table-actions/table-actions.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DateSourceService]
})
export class HomeComponent implements OnInit {
  @ViewChild('actionRef')  actionTableMethods !: TableActionsComponent 
  loginState: boolean = false;
  tableAction: boolean = false;
  dataSource: any[] = [];
  loading: boolean = false;
  editMode: boolean = false;
  itemToEdit: any;
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
      },
      err => { this.toastr.error('falid to get data') }
    ).finally(() => {
      this.loading = false
    })
  }

  toggleActionPanel() {
    this.tableAction = !this.tableAction;
    let panelElm = document.getElementById('panelElm') as HTMLDivElement;
    if (this.tableAction) {
      panelElm.style.maxHeight = panelElm.scrollHeight + 100 + 'px';
    } else {
      this.editMode = false
      panelElm.style.maxHeight = '0';
    }
  }

  checkUserLoginState() {
    this.globalService.currentLoginState.subscribe(loginState => this.loginState = loginState)
    if(!this.loginState) {
      this.router.navigateByUrl('/')
    }
  }
  // data comes from table-action-component.ts by an EventEmitter
  getNewItem(data: any) {
    data.IsEnabled = true;
    // generat id for new item
    let generatID = parseInt(this.dataSource[this.dataSource.length - 1].Id) + 1;
    data.Id = generatID;
    //add item to the end of table
    this.dataSource.push(data);
   this.toggleActionPanel()
  }
  // data comes from table-action-component.ts by an EventEmitter
  getEditedItem(data: any) {
    this.dataSource.forEach((item => {
      if(item.Id == data.Id) {
        item.Id = data.Id ;
        item.Description =data.Description ;
        item.IsEnabled = data.IsEnabled;
        item.Method =data.Method ;
        item.Route = data.Route;
      }
    }))
    this.toggleActionPanel()
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
    if (!this.tableAction) {
      this.editMode = true
      this.toggleActionPanel();
    } 
      this.editMode = true
      window.scrollTo(0, 0);
      this.actionTableMethods.turnToEditMode()
      setTimeout(() => {
        this.actionTableMethods.initForms()
      },);
      this.itemToEdit = item;
  }

}
