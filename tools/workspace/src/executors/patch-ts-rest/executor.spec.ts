import { PatchTsRestExecutorSchema } from './schema';
import executor from './executor';

const options: PatchTsRestExecutorSchema = {};

describe('PatchTsRest Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
