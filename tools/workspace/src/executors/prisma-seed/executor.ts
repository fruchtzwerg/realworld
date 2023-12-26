import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import { getExecOutput, getProjectRoot, logger } from '@nx-tools/core';

import { PrismaSeedExecutorSchema } from './schema';

export default async function run(
  options: PrismaSeedExecutorSchema,
  ctx: ExecutorContext
): Promise<{ success: true }> {
  if (!options.script) {
    throw new Error('You must specify a seed script file.');
  }

  const tsConfig = options?.tsConfig ?? joinPathFragments(getProjectRoot(ctx), 'tsconfig.json');

  const command = 'node';
  const args = getArgs(options);

  await logger.group('Seeding Database', async () => {
    await getExecOutput(command, args, {
      env: { TS_NODE_PROJECT: tsConfig },
      ignoreReturnCode: true,
    }).then((res) => {
      if (res.stderr.length > 0 && res.exitCode != 0) {
        throw new Error(`${res.stderr.trim() ?? 'unknown error'}`);
      }
    });
  });

  return { success: true };
}

const getArgs = (options: PrismaSeedExecutorSchema): string[] => {
  const args = options?.args ?? [];

  args.push('--require=ts-eager/register', '--require=tsconfig-paths/register');
  args.push(options.script);

  return args;
};
