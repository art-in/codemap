import util from 'node:util';
import childProcess from 'node:child_process';

const exec = util.promisify(childProcess.exec);

export async function run(binaryPath: string, args?: string[]) {
  const commandString = `${binaryPath} ${args?.join(' ')}`;
  console.log('running command: ' + commandString);

  const {stdout} = await exec(commandString);

  return stdout;
}
