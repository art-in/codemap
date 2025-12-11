import childProcess from 'node:child_process';
import util from 'node:util';

const execFile = util.promisify(childProcess.execFile);

export default async function exec(binaryPath: string, args?: string[]) {
  console.log(`execute: ${binaryPath} ${args?.join(' ')}`);

  // use `execFile()` to spawn process directly with binary, without a shell,
  // and thus avoid command injection risks, that can arise with `exec()`
  const {stdout} = await execFile(binaryPath, args, {maxBuffer: Infinity});

  return stdout;
}
