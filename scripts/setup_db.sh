#!/usr/bin/env bash
mysql -u root -e "create database blackpearldev;"
mysql -u root -e "create user 'blackpearl'@'localhost';"
mysql -u root -e "GRANT ALL PRIVILEGES ON blackpearldev.* TO 'blackpearl'@'localhost';"