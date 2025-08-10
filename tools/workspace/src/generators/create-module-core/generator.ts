import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import * as path from 'path';
import { CreateModuleCoreGeneratorSchema } from './schema';

export async function createModuleCoreGenerator(
  tree: Tree,
  options: CreateModuleCoreGeneratorSchema
) {
  const name = options.name ?? options.path.split('/').pop();
  const fileNames = names(name);
  let destPath = (options.path ?? '').replace(/^\/+|\/+$/g, '');
  if (!destPath) {
    throw new Error('Option "path" is required and should be relative to libs/core/src');
  }
  if (destPath.endsWith(name)) destPath = destPath.slice(0, -name.length);

  // Target directory for the new core module: libs/core/src/<path>/<name>
  const targetDirPosix = path.posix.join('libs/core/src', destPath, fileNames.fileName);

  // Ensure the folder structure exists and generate files from templates
  generateFiles(tree, path.join(__dirname, 'files', 'module'), targetDirPosix, {
    ...fileNames,
    tmpl: '',
    name: fileNames.fileName,
    idField: options.idField,
    repositoryClassName: `${fileNames.className}Repository`,
    serviceClassName: `${fileNames.className}Service`,
    validatorClassName: `${fileNames.className}Validator`,
    createDtoInterfaceName: `Create${fileNames.className}Dto`,
    updateDtoInterfaceName: `Update${fileNames.className}Dto`,
    importCommonPath: toPosixRelative(
      path.relative(
        path.join(process.cwd(), targetDirPosix),
        path.join(process.cwd(), 'libs/core/src/common')
      )
    ),
  });

  // Update libs/core/src/index.ts barrel export
  const coreBarrelPath = 'libs/core/src/index.ts';
  if (!tree.exists(coreBarrelPath)) {
    throw new Error(`Core barrel file not found at ${coreBarrelPath}`);
  }

  const exportPath = `./${path.posix.join(destPath, fileNames.fileName)}`;
  const exportLine = `export * from '${exportPath}';`;
  const barrelContent = tree.read(coreBarrelPath, 'utf-8') as string;
  if (!barrelContent.includes(exportLine)) {
    const updated = `${barrelContent.trim()}\n${exportLine}\n`;
    tree.write(coreBarrelPath, updated);
  }

  await formatFiles(tree);
}

export default createModuleCoreGenerator;

function toPosixRelative(p: string): string {
  let rel = p.replace(/\\/g, '/');
  if (!rel.startsWith('.')) {
    rel = `./${rel}`;
  }
  return rel;
}
