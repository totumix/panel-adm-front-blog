import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, iif, of, switchMap, tap, throwError } from 'rxjs';
import { AuthResponse } from 'src/app/core/models/auth-response.class';
import { BUSINESS_DATA, Storage, USER_DATA } from 'src/app/core/storage';
import { AuthVm } from 'src/app/core/view-model/auth.vm';
import { LoadingService } from 'src/app/services/loading.service';
import { MessagesService } from 'src/app/services/messages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    MessagesService
  ],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(
    private _fb: UntypedFormBuilder,
    private _vm: AuthVm,
    private _router: Router,
    private _loadingService: LoadingService,
    private _messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      gettoken: [true]
      // country: [environment.indicator, [Validators.required]]
    });
  }

  submitForm(): void {
    const val = this.loginForm.value;
    if (!this.loginForm.invalid) {
      this.login(val);
    } else {
      this.showFormError();
    }
  }

  login(formValue) {
    this._loadingService.loadingOn()
    this._vm.login(formValue)
      .pipe(
        finalize(() => this._loadingService.loadingOff()),
        catchError(err => {
          let { error: { message } } = err;
          this._messagesService.showErrors(message);
          return throwError(() => err);
        }),
      )
      .subscribe((business) => {
        if (business) {
          this._router.navigateByUrl("/dashboard/start-view")
        }
      });

  }

  showFormError() {
    Object.values(this.loginForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  register() {
    this._router.navigateByUrl("/authentication/register")
  }
}
