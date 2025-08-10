import { ClsStore } from 'nestjs-cls';

import { ResolvedPayload } from './models/auth.dto';

export * from './contracts';

export * from './models/article.dto';
export * from './models/comment.dto';
export * from './models/profile.dto';
export * from './models/tag.dto';
export * from './models/user.dto';
export * from './models/auth.dto';
export * from './models/error.dto';

export interface Store extends ClsStore {
  user: ResolvedPayload;
  token: string;
}
