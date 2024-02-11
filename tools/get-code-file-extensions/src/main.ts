import fetch from 'node-fetch';
import yaml from 'yaml';

const LANGUAGES_YAML_URL =
  'https://raw.githubusercontent.com/github-linguist/linguist/master/lib/linguist/languages.yml';

const EXTENSIONS_BLACK_LIST = new Set([
  // file extension of "GCC Machine Description" programming language,
  // blacklist to not confuse with Markdown
  '.md',
]);

async function main() {
  const response = await fetch(LANGUAGES_YAML_URL);
  const text = await response.text();

  const parsed = yaml.parse(text);

  for (const langName in parsed) {
    const lang = parsed[langName];

    if (lang.type == 'programming' && lang.extensions) {
      console.log(`// ${langName}`);

      for (const extension of lang.extensions) {
        if (!EXTENSIONS_BLACK_LIST.has(extension)) {
          console.log(`"${extension}",`);
        }
      }

      console.log();
    }
  }
}

main();
