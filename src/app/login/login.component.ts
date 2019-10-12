import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted = false;
  get formControls() {
    return this.loginForm.controls;
  }

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder,
    private elementRef: ElementRef, private location: Location) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.location.back;
    }
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#76b852'; //background color
    this.createFormControls();
    this.createForm();
  }
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;

  createFormControls() {
    this.username = new FormControl("", Validators.required);
    this.password = new FormControl("", [Validators.required]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        console.log(res)
        if (res.token) {
          localStorage.setItem('ACCESS_TOKEN', res.token)
          this.router.navigateByUrl('/reservation');
        } else {
          alert(res.Message);
        }
      }
    );
  }

  ngAfterViewInit() {

  }
}
