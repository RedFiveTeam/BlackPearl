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

    pushd ${BASE_DIR}/scripts/seed_db
        ./seed_db.sh
    popd

    java -jar ${BASE_DIR}/target/blackpearl-[0-9\.]*-SNAPSHOT.jar --server.port=9090 &> ${BASE_DIR}/tmp/acceptance.log &
    echo $! > ${BASE_DIR}/tmp/blackPearl.pid

    testConnection "http://localhost:9090" $(cat ${BASE_DIR}/tmp/blackPearl.pid)

    if [ $(ps -ef | grep -i selenium-standalone | wc -l) -le 1 ]; then
        echo "Starting selenium..."
        selenium-standalone start &> ${BASE_DIR}/tmp/selenium.log &
        sleep 1 # Allow time for selenium to fully start
    fi

    ps -ef | grep -i selenium | grep -i java | tr -s " " | cut -d " " -f3 > ${BASE_DIR}/tmp/selenium.pid

    testConnection "http://localhost:4444" $(cat ${BASE_DIR}/tmp/selenium.pid)

    pushd ${BASE_DIR}/acceptance
        codeceptjs run -o '{ "helpers": {"WebDriverIO": {"url": "http://localhost:9090"}}}'
    popd
}

function unitTests {
    showBanner "Unit Tests"

    pushd ${BASE_DIR}
        result=$(mvn test | grep -E "\[INFO\]|\[ERROR\]")
        echo "${result}"
        if [ $(echo ${result} | grep "\[ERROR\]" | wc -l) -gt 0 ]; then
            exit 1
        fi
    popd

    pushd ${BASE_DIR}/client
        CI=true yarn test
    popd
}


# Utilities

function checkDependencies {
    showBanner "Checking Dependencies"
    if [ "$(which selenium-standalone)" == "" ] && [ "$(which npm)" != "" ] ; then
        echo "selenium-standalone is not installed. Installing..."
        npm -g install selenium-standalone@latest
        selenium-standalone install
    fi

    if [ "$(which codeceptjs)" == "" ] && [ "$(which npm)" != "" ] ; then
        echo "codeceptjs is not installed. Installing..."
        npm -g install codeceptjs@latest
    fi

    if [ "$(which wdio)" == "" ] && [ "$(which npm)" != "" ] ; then
        echo "webdriverio is not installed. Installing..."
        npm -g install webdriverio@latest
    fi
}

function cleanup {
    if [ -f ${BASE_DIR}/tmp/blackPearl.pid ]; then
        cat ${BASE_DIR}/tmp/blackPearl.pid | xargs kill -9
        rm ${BASE_DIR}/tmp/blackPearl.pid
    fi
    if [ -f ${BASE_DIR}/tmp/selenium.pid ]; then
        cat ${BASE_DIR}/tmp/selenium.pid | xargs kill -9
        rm ${BASE_DIR}/tmp/selenium.pid
    fi
}
trap cleanup EXIT

function jarBuild {
    ${BASE_DIR}/scripts/build_jar.sh --no-replace
}

function setup {
    showBanner "Setup"

    BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"
    REACT_APP_HOST=http://localhost:9090

    mkdir -p ${BASE_DIR}/tmp

    checkDependencies
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
