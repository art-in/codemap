FROM ubuntu:23.10

# install common packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    # for vscode and clonning repos in frontend/server
    git \
    # for local endpoint testing
    curl

# install clang (list from https://apt.llvm.org/)
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    clang-17 clang-tools-17 clang-17-doc libclang-common-17-dev libclang-17-dev \
    libclang1-17 clang-format-17 python3-clang-17 clangd-17 clang-tidy-17

# make clang default c++ compiler for cmake
# (it will choose clang instead of gcc when generating build scripts)
ENV CC=/bin/clang-17
ENV CXX=/bin/clang++-17

# allow to use "clang" command without version
RUN ln -s /bin/clang++-17 /bin/clang++

# install nodejs (for frontend/client)
RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash -
RUN apt-get install -y nodejs npm

# additional packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    # for canvas npm package
    build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
