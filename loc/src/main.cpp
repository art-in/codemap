#include <iostream>
#include <string>

#include "count_lines.h"
#include "directory_iterator.h"

int main(int argc, char** argv) {
  std::string dir_path;

  if (argc >= 2) {
    dir_path = argv[1];
  } else {
    dir_path = ".";
  }

  const auto& [loc, tree_json] = iterate_directories_recursively(dir_path);

  std::cout << tree_json.dump() << std::endl;

  return 0;
}