import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/service/error-handler.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.login();
  }

}
