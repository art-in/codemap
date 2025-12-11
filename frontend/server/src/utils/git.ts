import fs from 'node:fs/promises';

import exec from './exec';

export async function clone(repoUrl: string, repoDir: string): Promise<void> {
  await fs.mkdir(repoDir, {recursive: true});
  await exec('git', [
    'clone',
    '--depth=1',
    '--single-branch',
    repoUrl,
    repoDir,
  ]);
}
