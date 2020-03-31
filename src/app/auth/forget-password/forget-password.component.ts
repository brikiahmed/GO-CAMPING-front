import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentification.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  errorFound = false;
  returnUrl: string;
  emailSentMessage = '';
  sent = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/new-password';


    this.resetPasswordForm = this.fb.group({

      email: ['', [Validators.required, Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }

  get controls() {
    return this.resetPasswordForm.controls;
  }

  onSubmit() {
    this.errorFound = false;
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.authenticationService.sendEmail(this.controls.email.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(this.controls.email.value);
          this.emailSentMessage = data.message;
          console.log(data.message);
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.error = error;
          this.errorFound = true;
          this.loading = false;
        }, () => {
          this.sent = true;
          this.submitted = true;
        });
  }

  resend() {
    this.sent = false;
    this.onSubmit();
  }

}
