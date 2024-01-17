#pragma once

#include <filesystem>
#include <functional>
#include <set>
#include <string>
#include <tuple>

#include "../libs/json.hpp"

std::pair<uint64_t, nlohmann::ordered_json> iterate_directories_recursively(
    const std::filesystem::path& directory_path);

// iterates over source code files inside directory,
// calling callback on each found file
void iterate_files(const std::filesystem::path& directory_path,
                   std::function<void(std::filesystem::path)> cb);