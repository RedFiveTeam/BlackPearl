#! /bin/bash

set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"
IO_HOST="blackpearl-staging.dev.dev.east.paas.geointservices.io"

pushd ${BASE_DIR}/client
    yarn install
    yarn build
popd

pushd ${BASE_DIR}
    if [[ "${@}" == *"--replace"* ]]; then
        sed -i "" "s/localhost:8080/${IO_HOST}/g" src/main/resources/static/searchEngine.xml
        mvn -Dflyway.user=${BLACKPEARL_DB_USERNAME} -Dflyway.password= -Dflyway.url=${BLACKPEARL_DB_URL} clean flyway:migrate package -DskipTests -Pio
        rm ${BASE_DIR}/artifacts/blackpearl-io.jar || true
        cp ${BASE_DIR}/target/blackpearl-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/artifacts/blackpearl-io.jar
    else
        if [ "$(lsb_release -a | grep -i Ubuntu)" != "" ]; then
            sed -i "s/localhost:8080/${IO_HOST}/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
        else
            sed -i "" "s/localhost:8080/${IO_HOST}/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
        fi

        mvn -Dflyway.user=${BLACKPEARL_DB_USERNAME} -Dflyway.password= -Dflyway.url=${BLACKPEARL_DB_URL} clean flyway:migrate package -DskipTests

        if [ "$(lsb_release -a | grep -i Ubuntu)" != "" ]; then
            sed -i "s/${IO_HOST}/localhost:8080/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
        else
            sed -i "" "s/${IO_HOST}/localhost:8080/g" ${BASE_DIR}/src/main/resources/static/searchEngine.xml
        fi
    fi
popd