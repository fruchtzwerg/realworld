import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import classNames from 'classnames';

import { Profile } from '@realworld/dto';

import { AuthService } from '../../../modules/auth/services/auth.service';
import { UserService } from '../../../modules/user/services/user.service';

@Component({
  selector: 'realworld-follow',
  imports: [CommonModule],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FollowComponent {
  public readonly classNames = classNames;

  @Input()
  public contrast = false;

  @Input()
  public profile?: Profile | null = null;

  public readonly authService = inject(AuthService);
  public readonly userService = inject(UserService);
}
