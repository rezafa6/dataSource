import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  hasError: boolean = false
  isAdmin: boolean = false
  form!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.form = new FormGroup({
      username: new FormControl('' , [Validators.required , Validators.minLength(3)]),
      password: new FormControl('' , [Validators.required]),
    })
  }
}
