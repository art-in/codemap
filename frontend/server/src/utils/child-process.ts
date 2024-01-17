export async function run(
  binaryPath: string,
  args?: string[],
) {
  const commandString = `${binaryPath} ${args?.join(" ")}`;
  console.log("running command: " + commandString);

  const command = new Deno.Command(binaryPath, { args });
  const output = await command.output();

  const textDecoder = new TextDecoder();

  if (!output.success) {
    const stderr = textDecoder.decode(output.stderr);
    const errorMessage = `command failed: ${stderr}`;
    console.error(errorMessage);
    throw Error(errorMessage);
  }

  const stdout = textDecoder.decode(output.stdout);

  return stdout;
}
