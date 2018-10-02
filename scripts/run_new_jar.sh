#! /bin/bash

set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"

${BASE_DIR}/scripts/build_jar.sh

java -jar ${BASE_DIR}/target/blackpearl-[0-9\.]*-SNAPSHOT.jar

#docker run --name BlackPearl -v `pwd`:/app -p 9090:9090 -itd dgs1sdt/blackpearl
#docker exec BlackPearl /bin/bash -c "java -jar /app/artifacts/blackpearl-[0-9\.]*-SNAPSHOT.jar --server.port=9090"