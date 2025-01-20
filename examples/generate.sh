#!/bin/bash

set -e

cd "$(dirname "$0")/.."

format_rdf() {
  rapper -i turtle -o turtle -q $1 >temp.ttl
  mv -f temp.ttl $1
  echo "formatted $1"
}

#format_rdf $PWD/examples/forms/forms.shaclmate.ttl
#./packages/cli/cli.sh generate $PWD/examples/forms/forms.shaclmate.ttl >examples/forms/src/generated.ts

# Kitchen sink
format_rdf $PWD/examples/kitchen-sink/kitchen-sink.shaclmate.ttl
./packages/cli/cli.sh show-ast-json $PWD/examples/kitchen-sink/kitchen-sink.shaclmate.ttl >examples/kitchen-sink/ast.json
./packages/cli/cli.sh generate $PWD/examples/kitchen-sink/kitchen-sink.shaclmate.ttl >examples/kitchen-sink/generated.ts

# SKOS
SKOS_SHAPES_TTL_ORIGINAL_FILE_PATH="../kos-kit/skos-shacl/shapes/skos-shaclmate.shacl.ttl"
if [ -f "$SKOS_SHAPES_TTL_ORIGINAL_FILE_PATH" ] ; then
  # format_rdf $SKOS_SHAPES_TTL_ORIGINAL_FILE_PATH
  cp $SKOS_SHAPES_TTL_ORIGINAL_FILE_PATH $PWD/examples/skos/skos.shaclmate.ttl
  echo "copied SKOS shapes from original file $SKOS_SHAPES_TTL_ORIGINAL_FILE_PATH"
else
  echo "SKOS shapes original file $SKOS_SHAPES_TTL_ORIGINAL_FILE_PATH not found, using copy"
fi
./packages/cli/cli.sh show-ast-json $PWD/examples/skos/skos.shaclmate.ttl >examples/skos/ast.json
./packages/cli/cli.sh generate $PWD/examples/skos/skos.shaclmate.ttl >examples/skos/generated.ts

npm exec biome -- check --write --unsafe $PWD/examples
