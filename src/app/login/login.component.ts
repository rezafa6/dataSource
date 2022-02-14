import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../services/global-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  // properties
  hasError: boolean = false;
  checkAdminName: boolean = false;
  checkPassword: boolean = false;
  form!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.changeLoginState(false)
    this.initForm()
  }
  initForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required]),
    })
  }


  submit() {
    if (!this.isUsernameAndPassTrue() || this.form.invalid) {
      this.hasError = true;
      return
    }

    else {
      this.toastr.success('You entered', 'Successfull ', { timeOut: 2000 });
      setTimeout(() => {
        this.globalService.changeLoginState(true)
        this.router.navigateByUrl('home')
      }, 500);
    }
  }

  isUsernameAndPassTrue() {
    if (this.form.get('username')?.value != 'admin1') { this.checkAdminName = true } else { this.checkAdminName = false }
    if (this.form.get('password')?.value != '12345') { this.checkPassword = true } else { this.checkPassword = false }
    return (this.form.get('username')?.value == 'admin1') && (this.form.get('password')?.value == '12345')
  }
}
