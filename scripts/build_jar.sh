#! /bin/bash

set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"
echo ${BASE_DIR}

pushd ${BASE_DIR}/client
    yarn install
    yarn build
popd

pushd ${BASE_DIR}
    if [[ "${@}" == *"--replace"* ]]; then
      mvn package -DskipTests -Pio
      rm ${BASE_DIR}/artifacts/blackpearl-io.jar || true
      cp ${BASE_DIR}/target/blackpearl-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/artifacts/blackpearl-io.jar

      mvn package -DskipTests -Pmuhj
      rm ${BASE_DIR}/artifacts/blackpearl-muhj.jar || true
      cp ${BASE_DIR}/target/blackpearl-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/artifacts/blackpearl-muhj.jar
    else
        if [ "${BLACKPEARL_CI}" ]; then
            TARGET="io"
        else
            TARGET="muhj"
        fi

        echo "====================="
        echo "JAR Target: ${TARGET}"
        echo "====================="

        mvn package -DskipTests -P${TARGET}
    fi
popd
