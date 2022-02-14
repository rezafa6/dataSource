import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private globalService: GlobalService,
    private dateSourceService: DateSourceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkUserLoginState()
    this.getData()
  }


  getData() {
    this.dateSourceService.getData().then(
      res => {

        let _data: any = res;
        this.dataSource = _data.result;
        console.log(this.dataSource);
        // set isSelected property for all items : in order to use for multiple delete
        this.dataSource.forEach(items => items.isSelected = false)
      },
      err => { console.log(err) }
    )
  }

  addNewItem() {
    this.tableAction = !this.tableAction
  }

  checkUserLoginState() {
    this.globalService.currentLoginState.subscribe(loginState => this.loginState = loginState)

    // if(!this.loginState) {
    //   this.router.navigateByUrl('/')
    // }
  }
}
