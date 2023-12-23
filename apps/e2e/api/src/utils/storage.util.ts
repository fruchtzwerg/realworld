import { mkdir, readFile, writeFile } from 'fs/promises';

import { User } from '@realworld/dto';

interface Storage {
  user: User;
  password: string;
}

export const STORAGE_PATH = '.playwright/storage.json';

export const saveStorage = async (content: Storage) => {
  await mkdir('.playwright', { recursive: true });
  await writeFile(STORAGE_PATH, JSON.stringify(content, null, 2));
};

export const loadStorage = async (): Promise<Storage> => {
  const storage = await readFile(STORAGE_PATH, 'utf-8');
  return JSON.parse(storage);
};
