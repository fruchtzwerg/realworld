import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LoginUserSchema } from '@realworld/dto';

import { AuthModule } from '../../auth.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'realworld-login',
  standalone: true,
  imports: [CommonModule, AuthModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  public authService = inject(AuthService);

  public submit(e: SubmitEvent) {
    e.preventDefault();

    if (!e.target) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const credentials = LoginUserSchema.parse({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    this.authService.loginMut.mutate(credentials);
  }
}
