#pragma once

#include <filesystem>
#include <string>
#include <tuple>

#include "../libs/json.hpp"

auto iterate_directories_recursively(
    const std::filesystem::path& directory_path)
    -> std::pair<uint64_t, nlohmann::ordered_json>;
