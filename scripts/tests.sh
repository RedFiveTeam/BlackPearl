#! /bin/bash

set -e

# Main
function main {
    setup

    case "${1}" in
        acc|acceptance)
            jarBuild
            acceptanceTests
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

    java -jar ${BASE_DIR}/artifacts/crewwebpage*.jar --server.port=9090 &> ${BASE_DIR}/tmp/acceptance.log &
    echo $! > ${BASE_DIR}/tmp/crewWebpage.pid

    testConnection "http://localhost:9090" $(cat ${BASE_DIR}/tmp/crewWebpage.pid)

    if [ $(ps -ef | grep -i selenium-standalone | wc -l) -eq 1 ]; then
        selenium-standalone start &> ${BASE_DIR}/tmp/selenium.log &
        sleep 1 # Allow time for selenium to fully start
        ps -ef | grep -i selenium | grep -i java | tr -s " " | cut -d " " -f3 > ${BASE_DIR}/tmp/selenium.pid
    fi

    testConnection "http://localhost:4444" $(cat ${BASE_DIR}/tmp/selenium.pid)

    pushd ${BASE_DIR}/acceptance
        codeceptjs run -o '{ "helpers": {"WebDriverIO": {"url": "http://localhost:9090"}}}'
    popd
}

function unitTests {
    showBanner "Unit Tests"

    pushd ${BASE_DIR}/client
        CI=true yarn test
    popd
}


# Utilities
function cleanup {
    if [ -f ${BASE_DIR}/tmp/crewWebpage.pid ]; then
        cat ${BASE_DIR}/tmp/crewWebpage.pid | xargs kill -9
        rm ${BASE_DIR}/tmp/crewWebpage.pid
    fi
    if [ -f ${BASE_DIR}/tmp/selenium.pid ]; then
        cat ${BASE_DIR}/tmp/selenium.pid | xargs kill -9
        rm ${BASE_DIR}/tmp/selenium.pid
    fi
}
trap cleanup EXIT

function jarBuild {
    ${BASE_DIR}/scripts/build_jar.sh
}

function setup {
    showBanner "Setup"

    BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"
    REACT_APP_HOST=http://localhost:9090

    mkdir -p ${BASE_DIR}/tmp
}

function showBanner {
    echo "============================="
    echo "  ${1}"
    echo "============================="
}

function testConnection {
    COUNTER=0
    echo "Attempting to connect to ${1} (PID: ${2})..."
    until curl $1 &>/dev/null; do
        sleep 1
        let COUNTER+=1

        if [[ "$COUNTER" -gt 40 ]]
        then
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

main ${1}