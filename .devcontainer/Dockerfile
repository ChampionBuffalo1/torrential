# A development container with what `nix develop` gives: CMake, Ninja, Boost, static OpenSSL,
# a C++ compiler, Rust, and bun.
FROM mcr.microsoft.com/devcontainers/base:trixie

# Debian's libssl-dev ships libssl.a and libcrypto.a, which crates/engine/build.rs links. Debian
# builds libcrypto with zlib and zstd compression, so RUSTFLAGS below links those as well.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential cmake ninja-build pkg-config libboost-dev libssl-dev zlib1g-dev libzstd-dev unzip \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s "/usr/lib/$(gcc -dumpmachine)" /usr/lib/openssl-multiarch

USER vscode

# Rust, stable, as in CI.
RUN curl -sSf https://sh.rustup.rs | sh -s -- -y --profile minimal --component rustfmt,clippy
# The bun version CI uses.
ARG BUN_VERSION=1.4.2
RUN curl -fsSL https://bun.sh/install | bash -s "bun-v${BUN_VERSION}"

ENV PATH="/home/vscode/.cargo/bin:/home/vscode/.bun/bin:${PATH}" \
    BOOST_ROOT=/usr \
    OPENSSL_INCLUDE_DIR=/usr/include \
    OPENSSL_LIB_DIR=/usr/lib/openssl-multiarch \
    RUSTFLAGS="-C link-arg=-lz -C link-arg=-lzstd" \
    LANG=C.UTF-8
