#include "count_lines.h"

#include <fstream>

uint count_lines(const std::string& file_name) {
  std::ifstream file{file_name};

  uint number_of_lines = 0;

  // do not skip new-line chars
  file.unsetf(std::ios_base::skipws);

  bool is_empty_line = true;

  while (!file.eof()) {
    char c;
    file >> c;

    if (c == '\n') {
      if (!is_empty_line) {
        ++number_of_lines;
      }
      is_empty_line = true;
    } else if (
        // ignore carriage return in CRLF line endings
        c != '\r' &&
        // ignore non-char in empty file.
        // ie. EOF flag is not raised until we read first character, and that
        // character is '\0'
        c != '\0') {
      is_empty_line = false;
    }
  }

  if (!is_empty_line) {
    ++number_of_lines;
  }

  return number_of_lines;
}