#! /bin/bash

basedir="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"

$basedir/scripts/build_jar.sh

java -jar $basedir/target/crewwebpage*.jar
