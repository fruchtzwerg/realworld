import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthModule } from '../../../modules/auth/auth.module';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { AvatarComponent } from '../avatar/avatar.component';

import { Menu, MenuItem } from './navbar.const';

@Component({
  selector: 'realworld-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AuthModule, AvatarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarComponent {
  #authService = inject(AuthService);

  public readonly menuItems$: Observable<MenuItem[]> = this.#authService.user$.pipe(
    map((user) => (user ? Menu.private(user) : Menu.public()))
  );
}
