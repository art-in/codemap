import { run } from "./child-process.ts";

export async function getProfile(dir: string): Promise<string> {
  return await run("../../loc/loc", [`--target=${dir}`]);
}
