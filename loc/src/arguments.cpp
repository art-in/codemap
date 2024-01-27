#include "arguments.h"

void Arguments::Parse(int argc, char** argv) {
  for (int i = 1; i < argc; ++i) {
    std::string_view arg_full{argv[i]};

    if (arg_full.starts_with("--")) {
      auto arg_full_unprefixed = arg_full.substr(2);
      auto delimiter_pos = arg_full_unprefixed.find('=');

      if (delimiter_pos != std::string::npos &&
          delimiter_pos != arg_full_unprefixed.size() - 1) {
        auto arg_name = arg_full_unprefixed.substr(0, delimiter_pos);
        auto arg_value = arg_full_unprefixed.substr(delimiter_pos + 1);

        auto arg_it = ArgumentsByName.find(arg_name);
        if (arg_it != ArgumentsByName.end()) {
          auto& arg = arg_it->second;
          arg.value->assign(arg_value);
        }
      }
    }
  }
}