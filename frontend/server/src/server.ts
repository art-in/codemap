import fs from 'node:fs/promises';

import crypto from 'crypto';
import express from 'express';
import morgan from 'morgan';

import * as git from './utils/git';
import * as loc from './utils/loc';

const LISTEN_PORT = 4000;
const CLONNED_REPOS_DIR = './clonned-repos';

const app = express();
app.use(morgan('tiny'));

const api = express.Router();

api.get('/loc-profile', async (request, response) => {
  const gitRepoUrl = request.query['git-repo-url'];

  if (typeof gitRepoUrl !== 'string') {
    response.status(404).send('no git-repo-url query param in request');
    return;
  }

  const repoDir = `${CLONNED_REPOS_DIR}/${crypto.randomUUID()}`;

  await git.clone(gitRepoUrl, repoDir);
  const locProfile = await loc.getProfile(repoDir);
  await fs.rm(repoDir, {recursive: true});

  response.status(200).contentType('json').send(locProfile);
});

app.use('/api', api);

(async () => {
  // delete all failed clones of previous launch
  await fs.rm(CLONNED_REPOS_DIR, {recursive: true, force: true});

  app.listen(LISTEN_PORT);

  console.log('Listening at port ' + LISTEN_PORT);
  console.log();
})();
