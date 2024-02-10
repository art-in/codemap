import fs from 'node:fs/promises';

import express from 'express';

import * as git from './utils/git';
import * as loc from './utils/loc';

const app = express();
const api = express.Router();

api.get('/loc-profile', async (request, response) => {
  const gitRepoUrl = request.query['git-repo-url'];

  if (typeof gitRepoUrl !== 'string') {
    response.status(404).send('no git-repo-url query param in request');
    return;
  }

  const repoDir = await git.clone(gitRepoUrl);
  const locProfile = await loc.getProfile(repoDir);
  await fs.rm(repoDir, {recursive: true});

  response.status(200).contentType('json').send(locProfile);
});

app.use('/api', api);

app.listen(4000);
