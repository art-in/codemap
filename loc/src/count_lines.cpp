#include "count_lines.h"

#include <fstream>

auto count_lines(const std::filesystem::path& file_path) -> uint {
  std::ifstream file{file_path};

  // do not skip new-line chars
  file.unsetf(std::ios_base::skipws);

  uint counter = 0;
  bool is_empty_line = true;

  while (!file.eof()) {
    char c;
    file >> c;

    if (c == '\n') {
      if (!is_empty_line) {
        ++counter;
      }
      is_empty_line = true;
    } else if (
        // ignore carriage return in CRLF line endings
        c != '\r' &&
        // ignore non-char in empty file. i.e. EOF flag is not raised on fstream
        // until we read first character, and that character is '\0'
        c != '\0') {
      is_empty_line = false;
    }
  }

  if (!is_empty_line) {
    ++counter;
  }

  return counter;
}
