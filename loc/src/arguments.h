#pragma once

#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

class Arguments {
 public:
  struct Argument {
    std::string_view name;
    std::string* value;
  };

 public:
  void AddArgument(Argument arg) { ArgumentsByName[arg.name] = std::move(arg); }
  void Parse(int argc, char** argv);

 private:
  std::unordered_map<std::string_view, Argument> ArgumentsByName;
};
