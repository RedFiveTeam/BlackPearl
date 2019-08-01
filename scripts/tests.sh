#! /bin/bash

set -e

# FMV_Main
function main {
    setup

    case "${1}" in
        acc|acceptance)
            jarBuild
            acceptanceTests ${@}
        ;;
        unit)
            yarnBuild
            unitTests
        ;;
        *)
            jarBuild
            unitTests
            acceptanceTests
        ;;
    esac
}

# Tests
function acceptanceTests {
    showBanner "Acceptance Tests"

    echo ${BLACKPEARL_DB_URL}

    SPECIFIC_TESTS=""

    if [[ "${2}" == "./tests/"*".test.ts" ]]; then
        SPECIFIC_TESTS=${2}
    fi

    pushd ${BASE_DIR}/scripts/seed_db
        ./seed_db.sh
    popd

    java -DCLASSIFIED=UNCLASSIFIED -jar ${BASE_DIR}/target/blackpearl-[0-9\.]*-SNAPSHOT.jar --server.port=9090 &> ${BASE_DIR}/tmp/acceptance.log &
    echo $! > ${BASE_DIR}/tmp/blackPearl.pid

    testConnection ${REACT_APP_HOST} $(cat ${BASE_DIR}/tmp/blackPearl.pid)

    pushd ${BASE_DIR}/acceptance
        yarn install
        if [[ "${BLACKPEARL_CI}" && "$(lsb_release -crid | grep -i 'Ubuntu')" ]]; then
            xvfb-run yarn codeceptjs run -o "{ \"helpers\": {\"Nightmare\": {\"url\": \"${REACT_APP_HOST}\"}}}" ${SPECIFIC_TESTS} --verbose
        else
            yarn codeceptjs run -o "{ \"helpers\": {\"Nightmare\": {\"url\": \"${REACT_APP_HOST}\"}}}" ${SPECIFIC_TESTS}
        fi

        if [[ "${?}" == "1" ]]; then
            echo "Acceptance Tests Failed... Exiting"
            exit 1
        fi
    popd
}

function unitTests {
    showBanner "Unit Tests"
    pushd ${BASE_DIR}
        if [[ $(mvn -DCLASSIFIED=UNCLASSIFIED test | grep "\[ERROR\]" | wc -l) -gt 0 ]]; then
            exit 1
        fi
    popd

    pushd ${BASE_DIR}/client
        CI=true yarn test
    popd
}


# Utilities

function cleanup {
    showBanner "Cleanup"
    if [ -f ${BASE_DIR}/tmp/blackPearl.pid ]; then
        cat ${BASE_DIR}/tmp/blackPearl.pid | xargs kill -9
        rm ${BASE_DIR}/tmp/blackPearl.pid
    fi

    pushd ${BASE_DIR}/scripts/seed_db
        ./seed_db.sh
    popd
}
trap cleanup EXIT

function jarBuild {
    showBanner "Build JAR"
    ${BASE_DIR}/scripts/build_jar.sh --no-replace
}

function setup {
    showBanner "Setup"

    BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"

    REACT_APP_HOST=http://localhost:9090

    mkdir -p ${BASE_DIR}/tmp
}

function showBanner {
    echo "======================================================"
    echo "  ${1} ($(date))"
    echo "======================================================"
}

function testConnection {
    COUNTER=0
    echo "Attempting to connect to ${1} (PID: ${2})..."
    until curl --insecure $1 &>/dev/null; do
        sleep 1
        let COUNTER+=1

        if [[ "$COUNTER" -gt 40 ]]
        then
            cat ${BASE_DIR}/tmp/acceptance.log
            echo "Could not connect to ${1} (PID: ${2}) after 40 seconds. Exiting..."
            exit 1
        fi

        if [[ $(( $COUNTER % 5 )) -eq 0 ]]
        then
            echo "Attempting to connect to the app server..."
        fi
    done
}

function yarnBuild {
    pushd ${BASE_DIR}/client
        yarn install
        yarn build
    popd
}

main ${@}
