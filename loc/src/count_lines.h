#pragma once

#include <filesystem>
#include <string>

// returns number of non-empty lines in text file
auto count_lines(const std::filesystem::path& file_name) -> uint;
