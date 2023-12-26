export interface PrismaSeedExecutorSchema {
  /** The path to the seeding script */
  script: string;
  /** TypeScript config to use for seeding */
  tsConfig?: string;
  /** Arguments to pass to the seeding script */
  args?: string[];
}
