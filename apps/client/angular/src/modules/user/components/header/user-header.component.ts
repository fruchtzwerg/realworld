import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AvatarComponent } from '../../../../common/components/avatar/avatar.component';
import { FollowComponent } from '../../../../common/components/follow/follow.component';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'realworld-profile-header',
  standalone: true,
  imports: [CommonModule, RouterModule, AvatarComponent, FollowComponent],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserHeaderComponent {
  public readonly profile$ = inject(UserService).profileQuery$;
  public readonly user$ = inject(AuthService).user$;
}
