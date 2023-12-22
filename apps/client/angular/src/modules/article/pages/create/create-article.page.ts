import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CreateArticleSchema } from '@realworld/dto';

import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'realworld-create-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-article.page.html',
  styleUrl: './create-article.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArticlePage {
  public readonly articleService = inject(ArticleService);

  public async submit(e: SubmitEvent) {
    e.preventDefault();

    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    const formData = new FormData(form);
    const article = CreateArticleSchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
      body: formData.get('body'),
      tagList:
        formData
          .get('tagList')
          ?.toString()
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean) ?? [],
    });

    await this.articleService.createArticleMut.mutateAsync(article);

    form.reset();
  }
}
