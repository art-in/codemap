#include <fstream>
#include <iostream>
#include <string>

#include "arguments.h"
#include "count_lines.h"
#include "directory_iterator.h"

int main(int argc, char** argv) {
  std::string target_dir_path{"."};
  std::string output_file_path;

  Arguments args;

  args.AddArgument({"target", &target_dir_path});
  args.AddArgument({"out", &output_file_path});

  args.Parse(argc, argv);

  const auto& [loc, tree_json] =
      iterate_directories_recursively(target_dir_path);

  if (!output_file_path.empty()) {
    std::ofstream output{output_file_path};
    output << tree_json.dump(2) << std::endl;
  } else {
    std::cout << tree_json.dump() << std::endl;
  }

  return 0;
}