import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UpdateUserSchema } from '@realworld/dto';
import { shallowSparse } from '@realworld/utils';

import { AuthModule } from '../../../auth/auth.module';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'realworld-settings',
  standalone: true,
  imports: [CommonModule, AuthModule],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {
  public authService = inject(AuthService);

  public submit(e: SubmitEvent) {
    e.preventDefault();

    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    const formData = new FormData(form);
    const user = shallowSparse(
      UpdateUserSchema.parse({
        username: formData.get('username') || undefined,
        email: formData.get('email') || undefined,
        password: formData.get('password') || undefined,
        image: formData.get('image') || undefined,
        bio: formData.get('bio') || undefined,
      })
    );

    this.authService.updateUserMut.mutate(user);
  }
}
