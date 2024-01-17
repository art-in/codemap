#include "directory_iterator.h"

#include "code_file_extensions.h"
#include "count_lines.h"

std::pair<uint64_t, nlohmann::ordered_json> iterate_directories_recursively(
    const std::filesystem::path& directory_path) {
  nlohmann::ordered_json dir_json;
  dir_json["name"] = directory_path.filename();

  uint64_t dir_loc = 0;

  iterate_files(directory_path, [&](std::filesystem::path file_path) {
    uint loc = count_lines(file_path.string());
    dir_loc += loc;

    nlohmann::ordered_json file_json;
    file_json["name"] = file_path.filename();
    file_json["weight"] = loc;

    dir_json["children"].push_back(file_json);
  });

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
    }
  }

  dir_json["weight"] = dir_loc;

  return std::make_pair(dir_loc, std::move(dir_json));
}

void iterate_files(const std::filesystem::path& directory_path,
                   std::function<void(std::filesystem::path)> cb) {
  std::filesystem::directory_iterator dir_it{directory_path};

  for (const auto& dir_item : dir_it) {
    if (dir_item.is_regular_file() &&
        CODE_FILE_EXTENSIONS.contains(dir_item.path().extension().string())) {
      cb(dir_item.path());
    }
  }
}
