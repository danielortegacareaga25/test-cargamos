import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  myFormLogin: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.myFormLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }


  public OpenGoogle() {
    this.authService.GoogleAuth();
  }

  public login() {
    if (this.myFormLogin.valid) {
      const { email, password } = this.myFormLogin.value;
      this.authService.SignIn(email, password);
    }
  }


}
