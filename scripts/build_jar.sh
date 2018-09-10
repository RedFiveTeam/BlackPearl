#! /bin/bash

basedir="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"
echo $basedir

pushd $basedir/client
yarn build
popd

pushd $basedir
mvn package
popd
