import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';

import { createModuleCoreGenerator } from './generator';
import { CreateModuleCoreGeneratorSchema } from './schema';

describe('create-module-core generator', () => {
  let tree: Tree;
  const options: CreateModuleCoreGeneratorSchema = { name: 'foo', path: 'bar' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should create module files and update barrel', async () => {
    // Seed core barrel
    tree.write('libs/core/src/index.ts', `export * from './common';\n`);

    await createModuleCoreGenerator(tree, options);

    const base = 'libs/core/src/bar/foo';
    expect(tree.exists(`${base}/foo.repo.ts`)).toBeTruthy();
    expect(tree.exists(`${base}/foo.service.ts`)).toBeTruthy();
    expect(tree.exists(`${base}/foo.validator.ts`)).toBeTruthy();
    expect(tree.exists(`${base}/index.ts`)).toBeTruthy();

    const barrel = tree.read('libs/core/src/index.ts', 'utf-8') as string;
    expect(barrel).toContain("export * from './bar/foo';");
  });
});
