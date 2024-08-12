import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { User, UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm = this.form_builder.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  showLoader = false;

  constructor(
    private form_builder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.signUpForm.reset();
  }

  saveUserInfo(userData: User) {
    this.userService.saveUserData(userData).subscribe((res) => {
      this.showLoader = false;
      this.notificationService.success(
        'Account created successfully, please use your credentials to login'
      );
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const userData = {
        email: this.signUpForm.value.email!,
        password: this.signUpForm.value.password!,
        name: this.signUpForm.value.name!,
      };
      this.showLoader = true;
      this.saveUserInfo(userData);
    }
  }
}
