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
    if [ "${1}" != "--no-replace" ]; then
      rm ${BASE_DIR}/artifacts/blackpearl-[0-9\.]*-SNAPSHOT.jar || true
      cp ${BASE_DIR}/target/blackpearl-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/artifacts/
    fi
popd
