import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = this.form_builder.group({
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  showLoader = false;

  constructor(
    private form_builder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loginForm.reset();
  }

  verifyUser() {
    const loginInput = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.userService.verifyUser(loginInput).subscribe(
      (res) => {
        this.showLoader = false;
        console.log(res);
        this.router.navigate(['/list']);
      },
      (error) => {
        console.log(error);
        this.showLoader = false;
        this.notificationService.error(error.error.message);
      }
    );
  }

  onSubmit(): void {
    console.log('Submitted Form', this.loginForm.value, this.loginForm.invalid);
    if (this.loginForm.valid) {
      this.showLoader = true;
      this.verifyUser();
    }
    // this.router.navigate(['/list']);
  }
}
