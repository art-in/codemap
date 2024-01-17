// @deno-types="npm:@types/express@4.17.21"
import express from "npm:express@5.0.0-beta.1";

import * as git from "./utils/git.ts";
import * as loc from "./utils/loc.ts";

const app = express();
const api = express.Router();

api.get("/loc-profile", async (request, response) => {
  const repoUrl = request.query["git-repo-url"];

  if (typeof repoUrl !== "string") {
    response.status(404).send("no git-repo-url query param in request");
    return;
  }

  const repoDir = await git.clone(repoUrl);
  const locProfile = await loc.getProfile(repoDir);
  await Deno.remove(repoDir, { recursive: true });

  response.status(200).contentType("json").send(locProfile);
});

app.use("/api", api);

app.listen(4000);
