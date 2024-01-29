import crypto from 'crypto';
import fs from 'node:fs/promises';

import {run} from './child-process';

export async function clone(repoUrl: string): Promise<string> {
  const repoDir = `./clonned-repos/${crypto.randomUUID()}`;
  await fs.mkdir(repoDir, {recursive: true});

  await run('git', ['clone', '--depth=1', '--single-branch', repoUrl, repoDir]);

  return repoDir;
}
