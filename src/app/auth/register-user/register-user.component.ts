import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {



  myFormRegister: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.myFormRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordConfirming });

  }
  ngOnInit(): void {
  }

  register() {
    if (this.myFormRegister.valid) {
      const { email, password } = this.myFormRegister.value;
      this.authService.SignUp(email, password);
    }
  }

  passwordConfirming(c: AbstractControl): { noMatchPassword: boolean; } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { noMatchPassword: true };
    }
  }

}
