#!/bin/bash

set -e

cd "$(dirname "$0")"

format_rdf() {
  rapper -i turtle -o turtle -q $1 >temp.ttl
  mv -f temp.ttl $1
  echo "formatted $1"
}

format_rdf $PWD/shacl-ast.shaclmate.ttl
../cli/cli.sh generate $PWD/shacl-ast.shaclmate.ttl >$PWD/generated.ts
npm exec biome -- check --write --unsafe $PWD/generated.ts
