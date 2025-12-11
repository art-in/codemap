import exec from './exec';

export async function getProfile(dir: string): Promise<string> {
  return await exec('../../loc/loc', [`--target=${dir}`]);
}
