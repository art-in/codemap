import childProcess from 'node:child_process';
import util from 'node:util';

const exec = util.promisify(childProcess.exec);

export async function run(binaryPath: string, args?: string[]) {
  const commandString = `${binaryPath} ${args?.join(' ')}`;
  console.log('running command: ' + commandString);

  const {stdout} = await exec(commandString);

  return stdout;
}
