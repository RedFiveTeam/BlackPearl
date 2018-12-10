#! /bin/bash

set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"
IO_HOST="blackpearl-staging.dev.dev.east.paas.geointservices.io"
MUHJ_HOST="muhjw3-100myp:9090"

pushd ${BASE_DIR}/client
    yarn install
    yarn build
popd

pushd ${BASE_DIR}
    if [[ "${@}" == *"--replace"* ]]; then
        sed -i "" "s/localhost:8080/${IO_HOST}/g" src/main/resources/static/searchEngine.xml
        mvn package -DskipTests -Pio
        rm ${BASE_DIR}/artifacts/blackpearl-io.jar || true
        cp ${BASE_DIR}/target/blackpearl-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/artifacts/blackpearl-io.jar

        sed -i "" "s/${IO_HOST}/${MUHJ_HOST}/g" src/main/resources/static/searchEngine.xml
        mvn package -DskipTests -Pmuhj
        rm ${BASE_DIR}/artifacts/blackpearl-muhj.jar || true
        cp ${BASE_DIR}/target/blackpearl-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/artifacts/blackpearl-muhj.jar
        sed -i "" "s/${MUHJ_HOST}/localhost:8080/g" src/main/resources/static/searchEngine.xml
    else
        if [ "${BLACKPEARL_CI}" ]; then
            if [ "$(lsb_release -a | grep -i Ubuntu)" != "" ]; then
                sed -i "s/localhost:8080/${IO_HOST}/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
            else
                sed -i "" "s/localhost:8080/${IO_HOST}/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
            fi
            TARGET="io"
        else
            if [ "$(lsb_release -a | grep -i Ubuntu)" != "" ]; then
                sed -i "s/localhost:8080/${MUHJ_HOST}/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
            else
                sed -i "" "s/localhost:8080/${MUHJ_HOST}/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
            fi
            TARGET="muhj"
        fi

        echo "======================================================"
        echo "JAR Target: ${TARGET} ($(date))"
        echo "======================================================"

        mvn package -DskipTests -P${TARGET}

        if [ "${BLACKPEARL_CI}" ]; then
            if [ "$(lsb_release -a | grep -i Ubuntu)" != "" ]; then
                sed -i "s/${IO_HOST}/localhost:8080/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
            else
                sed -i "" "s/${IO_HOST}/localhost:8080/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
            fi
        else
            if [ "$(lsb_release -a | grep -i Ubuntu)" != "" ]; then
                sed -i "s/${MUHJ_HOST}/localhost:8080/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
            else
                sed -i "" "s/${MUHJ_HOST}/localhost:8080/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
            fi
        fi
    fi
popd