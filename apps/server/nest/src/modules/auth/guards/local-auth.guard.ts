import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LOCAL_STRATEGY } from '../constants/strategy.const';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_STRATEGY) {}
