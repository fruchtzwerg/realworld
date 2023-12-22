import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';

import { Article } from '@realworld/dto';

import { AuthorComponent } from '../../../../common/components/author/author.component';
import { FollowComponent } from '../../../../common/components/follow/follow.component';
import { LikeComponent } from '../../../../common/components/like/like.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'realworld-impression',
  standalone: true,
  imports: [CommonModule, LikeComponent, FollowComponent, AuthorComponent],
  templateUrl: './impression.component.html',
  styleUrl: './impression.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImpressionComponent {
  @Input()
  public article: Article | null | undefined = null;

  public readonly userQuery$ = inject(AuthService).userQuery$;
}
