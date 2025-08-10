import { jwt as honoJwt, JwtVariables as HonoJwtVariables } from 'hono/jwt';

import { ResolvedPayload } from '@realworld/dto';

import { environment } from '../../environment/environment';

export type JwtVariables = HonoJwtVariables<ResolvedPayload>;

/** Hono Auth middlewar */
export const jwt = () => honoJwt({ secret: environment.jwt.secret, alg: environment.jwt.alg });

/** OpenAPI auth definition */
export const security = [{ Token: [] }];
