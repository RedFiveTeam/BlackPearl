#! /bin/bash

set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"
echo ${BASE_DIR}

pushd ${BASE_DIR}/client
    yarn install
    yarn build
popd

pushd ${BASE_DIR}
    mvn package -DskipTests
    rm ${BASE_DIR}/artifacts/crewwebpage-*.jar
    cp ${BASE_DIR}/target/crewwebpage-*.jar ${BASE_DIR}/artifacts/
popd
