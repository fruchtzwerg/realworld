export interface CreateModuleCoreGeneratorSchema {
  name: string;
  /**
   * Destination path under libs/core/src (e.g., "article", "ports", "user/profile").
   * The module will be created at libs/core/src/<path>/<name>.
   */
  path: string;
  idField: string;
}
