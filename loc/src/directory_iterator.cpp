#include "directory_iterator.h"

#include "code_file_extensions.h"
#include "count_lines.h"

auto iterate_directories_recursively(
    const std::filesystem::path& directory_path)
    -> std::pair<uint64_t, nlohmann::ordered_json> {
  nlohmann::ordered_json dir_json;
  dir_json["name"] = directory_path.filename();

  uint64_t dir_loc = 0;

  std::filesystem::directory_iterator dir_it{directory_path};

  for (const auto& dir_item : dir_it) {
    if (dir_item.is_directory()) {
      auto subdir = iterate_directories_recursively(dir_item.path());

      uint64_t subdir_loc = subdir.first;
      nlohmann::ordered_json subdir_json = std::move(subdir.second);

      if (subdir_loc > 0) {
        dir_loc += subdir_loc;

        dir_json["children"].push_back(std::move(subdir_json));
      }
    } else if (dir_item.is_regular_file() &&
               CODE_FILE_EXTENSIONS.contains(
                   dir_item.path().extension().string())) {
      const auto& file_path = dir_item.path();

      uint file_loc = count_lines(file_path);
      dir_loc += file_loc;

      nlohmann::ordered_json file_json;
      file_json["name"] = file_path.filename();
      file_json["weight"] = file_loc;

      dir_json["children"].push_back(std::move(file_json));
    }
  }

  dir_json["weight"] = dir_loc;

  return std::make_pair(dir_loc, std::move(dir_json));
}
