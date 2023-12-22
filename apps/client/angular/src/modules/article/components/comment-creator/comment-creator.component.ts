import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { intersectResults$ } from '@ngneat/query';
import { combineLatest, firstValueFrom } from 'rxjs';

import { CreateCommentSchema } from '@realworld/dto';

import { AvatarComponent } from '../../../../common/components/avatar/avatar.component';
import { AuthService } from '../../../auth/services/auth.service';
import { ArticleService } from '../../services/article.service';
import { CommentComponent } from '../comment/comment.component';
import { CommentShellComponent } from '../comment-shell/comment-shell.component';

@Component({
  selector: 'realworld-comment-creator',
  standalone: true,
  imports: [CommonModule, AvatarComponent, CommentShellComponent, CommentComponent],
  templateUrl: './comment-creator.component.html',
  styleUrl: './comment-creator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentCreatorComponent {
  public readonly articleService = inject(ArticleService);

  public readonly data$ = combineLatest({
    user: inject(AuthService).userQuery$,
    comments: this.articleService.commentsQuery$,
  }).pipe(intersectResults$((data) => ({ ...data, user: data.user.user })));

  public async submitComment(e: SubmitEvent) {
    e.preventDefault();

    const slug = await firstValueFrom(this.articleService.slug$);
    if (!slug) return;

    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    const formData = new FormData(form);
    const comment = CreateCommentSchema.parse({
      body: formData.get('body') || undefined,
    });

    await this.articleService.createCommentMut.mutateAsync({ slug, comment });

    form.reset();
  }
}
