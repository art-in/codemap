import fs from 'node:fs/promises';

import crypto from 'crypto';

import {run} from './shell-command';

export async function clone(repoUrl: string): Promise<string> {
  const repoDir = `./clonned-repos/${crypto.randomUUID()}`;
  await fs.mkdir(repoDir, {recursive: true});

  await run('git', ['clone', '--depth=1', '--single-branch', repoUrl, repoDir]);

  return repoDir;
}
