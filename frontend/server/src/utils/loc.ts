import {run} from './shell-command';

export async function getProfile(dir: string): Promise<string> {
  return await run('../../loc/loc', [`--target=${dir}`]);
}
