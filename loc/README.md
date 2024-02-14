Lines Of Code (LOC) counting tool

---

Recursively reads code files in target directory, counts lines in them, and
generates LOC-profile.

Code files are detected by whitelist of file extensions. See
[code_file_extensions.h](./src/code_file_extensions.h)

LOC-profile is a json tree structure, that reflects file system tree of target
directory:

- leaf nodes represent files, with LOC count in them
- non-leaf nodes represent directories, with sum of LOC for each files inside

---

Usage:

```sh
loc --target=my/dir/ --out=my.profile
```
