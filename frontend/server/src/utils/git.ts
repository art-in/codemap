import usid from "npm:usid@2.0.0";
import { run } from "./child-process.ts";

export async function clone(repoUrl: string): Promise<string> {
  const repoDir = `./clonned-repos/${usid.uid()}`;
  await Deno.mkdir(repoDir, { recursive: true });

  await run("git", [
    "clone",
    "--depth=1",
    "--single-branch",
    repoUrl,
    repoDir,
  ]);

  return repoDir;
}
