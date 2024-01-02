import { logger } from '@nx-tools/core';
import { readFile, writeFile } from 'fs/promises';

import { PatchTsRestExecutorSchema } from './schema';

const searchQuery = '(queryKey, dataFn, options)';
const replaceQuery = '({queryKey, queryFn: dataFn, ...options })';

const searchMutation = '(mutationFunction, options)';
const replaceMutation = '({mutationFn: mutationFunction, ...options})';

export default async function runExecutor({ files }: PatchTsRestExecutorSchema) {
  await logger.group('Patching @ts-rest/react-query', async () => {
    const patches = files.map(async (file) => {
      logger.info(`Patching ${file}`);

      const content = await readFile(file, 'utf-8');
      const res = content
        .replaceAll(searchQuery, replaceQuery)
        .replaceAll(searchMutation, replaceMutation);

      await writeFile(file, res, 'utf-8');
    });

    await Promise.all(patches);
  });

  return { success: true };
}
