import { implement } from '@orpc/server';

import { contract } from '@realworld/dto';

import type { RouterContext } from './context';

export const os = implement(contract).$context<RouterContext>();
