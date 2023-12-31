import { FormEventHandler } from 'react';

import { useArticleCreate } from '../../../common/api/hooks/article.create';

/* eslint-disable-next-line */
export interface CreateArticleProps {}

export function CreateArticle(props: CreateArticleProps) {
  const { isPending, mutate } = useArticleCreate();

  const submit: FormEventHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const title = (formData.get('title') as string) || undefined;
    const description = (formData.get('description') as string) || undefined;
    const body = (formData.get('body') as string) || undefined;
    const tagList = (formData.get('tagList') as string) || undefined;

    if (!title || !description || !body || !tagList) return;

    const article = { title, description, body, tagList: tagList.split(',') };

    mutate({ body: { article } });
  };

  return (
    <form onSubmit={submit} className="flex flex-col w-full max-w-4xl gap-4 mx-auto mt-8">
      <input
        name="title"
        type="text"
        className="input input-bordered input-lg"
        placeholder="Article title"
        disabled={isPending}
      />
      <input
        name="description"
        type="text"
        className="input input-bordered"
        placeholder="What's this article about?"
        disabled={isPending}
      />
      <textarea
        name="body"
        rows={8}
        className="textarea textarea-bordered"
        placeholder="Write your article (in markdown)"
        disabled={isPending}
      />
      <input
        name="tagList"
        type="text"
        className="input input-bordered"
        placeholder="Enter tags"
        disabled={isPending}
      />

      <button className="btn btn-primary btn-lg place-self-end" disabled={isPending}>
        {isPending && <div className="loading loading-spinner"></div>}
        <span>Publish Article</span>
      </button>
    </form>
  );
}

export default CreateArticle;
