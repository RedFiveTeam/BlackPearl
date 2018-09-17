#! /bin/bash

set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"

${BASE_DIR}/scripts/build_jar.sh

java -jar ${BASE_DIR}/target/crewwebpage*.jar
