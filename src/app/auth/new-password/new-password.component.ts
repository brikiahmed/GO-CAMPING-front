import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentification.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorOnInit = false;
  validToken = false;
  errorMessage = '';
  token: string;
  email: string;
  successMessage: string;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {


    this.token = this.route.snapshot.paramMap.get('token');
    this.authenticationService.verifToken(this.token).subscribe(
      (data) => {

        this.email = data.token.email;
      },
      (error) => {
        console.log(error);
        this.errorOnInit = true;
        this.errorMessage = error;
      },
      () => {
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.newPasswordForm.controls;
  }

  ngOnInit() {

    this.newPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, ]],
      repeatPassword: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newPasswordForm.invalid) {
      return;
    }

    console.log(this.email + ' ' + this.f.newPassword.value + ' ' + this.f.repeatPassword.value + ' ' + this.token);

    this.loading = false;
    this.authenticationService.reset(this.email, this.f.newPassword.value, this.f.repeatPassword.value, this.token)
      .pipe(first()).subscribe(
      (data) => {
        this.successMessage = data.message;
        this.errorOnInit = false;
        this.error = false;
      },
      (error) => {
        this.validToken = false;
        this.error = true;
        this.errorMessage = error;
      },
      () => {
        this.validToken = true;
        setTimeout(
          () => {
            this.router.navigate(['/']);
          },
          5000);
      });
  }
}
