import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { combineLatest } from 'rxjs';

import { Comment } from '@realworld/dto';

import { AvatarComponent } from '../../../../common/components/avatar/avatar.component';
import { AuthService } from '../../../auth/services/auth.service';
import { ArticleService } from '../../services/article.service';
import { CommentShellComponent } from '../comment-shell/comment-shell.component';

@Component({
  selector: 'realworld-comment',
  standalone: true,
  imports: [CommonModule, RouterModule, CommentShellComponent, AvatarComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommentComponent {
  @Input()
  public slug?: string | null;

  @Input()
  public comment!: Comment;

  public readonly articleService = inject(ArticleService);

  public readonly data$ = combineLatest({
    user: inject(AuthService).user$,
    slug: this.articleService.slug$,
  });
}
