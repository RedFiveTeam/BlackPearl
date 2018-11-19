#! /bin/bash

# This is for local acceptance and is no longer used.

set -e

if [[ "${@}" == *"--help"* ]]; then
    echo "./setup_acceptance [--build] [--reseed]"
    exit 0
fi

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"
PROGRAM_NAME="BlackPearlAcceptance"

echo "Stopping Docker Container"
docker stop ${PROGRAM_NAME} || true
#docker rm ${PROGRAM_NAME} || true

if [[ "${@}" == *"--build"* ]]; then
    ${BASE_DIR}/scripts/build_jar.sh --no-replace
    rm ${BASE_DIR}/acceptance/blackpearl-[0-9\.]*-SNAPSHOT.jar
    cp ${BASE_DIR}/target/blackpearl-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/acceptance/
fi

if [ $(docker container list -a | grep -i ${PROGRAM_NAME} | wc -l) -eq 0 ]; then
  docker run --name ${PROGRAM_NAME} -v ${BASE_DIR}:/app -p 7070:7070 -itd dgs1sdt/blackpearl
else
  docker start ${PROGRAM_NAME}
fi

docker exec -d ${PROGRAM_NAME} /bin/bash -c "java -jar /app/acceptance/blackpearl-[0-9\.]*-SNAPSHOT.jar --server.port=7070"

if [[ "${@}" == "--reseed" ]]; then
  docker exec -d ${PROGRAM_NAME} /bin/bash -c "/app/scripts/seed_db/seed_db.sh"
fi