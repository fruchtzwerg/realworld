import { oc } from '@orpc/contract';

import { TagsDtoSchema } from '../models/tag.dto';

export const tagsContract = {
  getTags: oc
    .route({
      method: 'GET',
      path: '/tags',
      tags: ['Tags'],
      inputStructure: 'detailed',
    })
    .output(TagsDtoSchema)
    .errors({ UNPROCESSABLE_CONTENT: {} }),
};
