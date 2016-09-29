import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../shared/testbirds/security/auth.service';
import {UserService} from '../+user/shared/user.service';

@Component({
  moduleId: module.id,
  selector: 'tb-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  error: boolean = false;

  constructor(protected router: Router, protected userService: UserService, protected authService: AuthService,
              protected  fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      'username':  ['', Validators.required],
      'password':  ['', Validators.required],
    });
  }

  onSubmit(): boolean {
    this.userService.login(this.loginForm.value.username, this.loginForm.value.username).subscribe({
      'next': (token: any) => {
        this.authService.setToken(token);
        this.router.navigate(['dashboard']);
      },
      'error': () => {
        this.loginForm.reset();
        this.error = true;
      }
    });

    return false;
  }
}
