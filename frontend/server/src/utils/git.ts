import fs from 'node:fs/promises';

import {run} from './shell-command';

export async function clone(repoUrl: string, repoDir: string): Promise<void> {
  await fs.mkdir(repoDir, {recursive: true});
  await run('git', ['clone', '--depth=1', '--single-branch', repoUrl, repoDir]);
}
