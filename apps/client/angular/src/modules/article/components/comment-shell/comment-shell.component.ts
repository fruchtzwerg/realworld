import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'realworld-comment-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-shell.component.html',
  styleUrl: './comment-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentShellComponent {
  @ContentChild('slot')
  public slot?: TemplateRef<HTMLElement>;
}
