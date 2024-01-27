Lines Of Code (LOC) counting tool

---

Recursively reads code files in specified folder, counts lines in them, and
generates LOC-profile.

Code files are detected by whitelist of code file extensions. See
[code_file_extensions.h](./src/code_file_extensions.h)

LOC-profile is a json tree structure, which reflects file system tree of target
folder, where each node represents:

- either directory with a sum of LOC counts of all child directories and files
  inside
- or LOC count for particular file

---

Usage:

```sh
loc --target=my/dir/ --output=my.profile
```
