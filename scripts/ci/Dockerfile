FROM cloudfoundry/cflinuxfs2

# install mysql
RUN apt-get update &&\
    apt-get -y install mysql-server-5.6

# install java
RUN apt-get -y update &&\
    apt-get -y install software-properties-common
RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
RUN add-apt-repository -y ppa:webupd8team/java &&\
    apt-get -y update &&\
    apt-get install -y oracle-java8-installer
RUN rm -rf /var/lib/apt/lists/*
RUN rm -rf /var/cache/oracle-jdk8-installer

# install node
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - &&\
    apt-get -y install nodejs

# install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - &&\
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list &&\
    apt-get -y update &&\
    apt-get -y install yarn

# install gems
RUN gem install selenium-webdriver chromedriver-helper

# install chrome
ARG CHROME_VERSION="google-chrome-stable"

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update -yqq &&\
    apt-get install -fyqq wget unzip

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - &&\
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list &&\
  apt-get update -qqy &&\
  apt-get -qqy install \
    ${CHROME_VERSION:-google-chrome-stable} &&\
  rm /etc/apt/sources.list.d/google-chrome.list &&\
  rm -rf /var/lib/apt/lists/* /var/cache/apt/* &&\
  google-chrome --version

# setup env
ENV BLACKPEARL_DB_URL=jdbc:mysql://localhost:3306/blackpearldev?useSSL=false
ENV BLACKPEARL_DB_USERNAME=blackpearl
ENV BLACKPEARL_CI=true

# setup mysql
VOLUME /var/lib/mysql

# lets do this!
ENTRYPOINT service mysql start &&\
    mysql -u root -e "create database blackpearldev;" &&\
    mysql -u root -e "create user 'blackpearl'@'localhost';" &&\
    mysql -u root -e "GRANT ALL PRIVILEGES ON blackpearldev.* TO 'blackpearl'@'localhost';" &&\
    /bin/bash
