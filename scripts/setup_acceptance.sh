#! /bin/bash

set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"
PROGRAM_NAME="BlackPearlAcceptance"

echo "Stopping Docker Container"
docker stop ${PROGRAM_NAME} || true
#docker rm ${PROGRAM_NAME} || true

${BASE_DIR}/scripts/build_jar.sh --no-replace

rm ${BASE_DIR}/acceptance/blackpearl-[0-9\.]*-SNAPSHOT.jar
cp ${BASE_DIR}/target/blackpearl-[0-9\.]*-SNAPSHOT.jar ${BASE_DIR}/acceptance/

if [ $(docker container list -a | grep -i ${PROGRAM_NAME} | wc -l) -eq 0 ]; then
  docker run --name ${PROGRAM_NAME} -v ${BASE_DIR}:/app -p 7070:7070 -itd dgs1sdt/blackpearl
else
  docker start ${PROGRAM_NAME}
fi

docker exec -d ${PROGRAM_NAME} /bin/bash -c "java -jar /app/acceptance/blackpearl-[0-9\.]*-SNAPSHOT.jar --server.port=7070"

printf "Would you like to seed the database [Y/N]:"
read seedDatabase

if [ "${seedDatabase}" == "Y" ] || [ "${seedDatabase}" == "y" ]; then
  docker exec -d ${PROGRAM_NAME} /bin/bash -c "/app/scripts/seed_db/seed_db.sh"
  echo "Database Reseeded"
else
  echo "Database Not Reseeded"
fi