#pragma once

#include <set>
#include <string>

// TODO: get code file extensions (with "type: programming") from
// https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml
static std::set<std::string> CODE_FILE_EXTENSIONS{
    ".cpp", ".h", ".hpp", ".rs", ".ts", ".tsx", ".js", ".jsx"};