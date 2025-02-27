import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CreateUserSchema } from '@realworld/dto';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'realworld-signup',
  imports: [CommonModule],
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPage {
  public readonly authService = inject(AuthService);

  public submit(e: SubmitEvent) {
    e.preventDefault();
    if (!e.target) return;

    const formData = new FormData(e.target as HTMLFormElement);

    const credentials = CreateUserSchema.parse({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      username: formData.get('username') as string,
    });

    this.authService.registerMut.mutate(credentials);
  }
}
