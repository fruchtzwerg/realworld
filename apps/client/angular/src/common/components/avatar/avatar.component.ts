import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Profile, User } from '@realworld/dto';

@Component({
  selector: 'realworld-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input()
  public user!: Profile | User;

  @Input()
  public size: keyof typeof this.sizes = 'md';

  public readonly sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24',
  } as const;
}
