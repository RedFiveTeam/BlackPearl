FROM cloudfoundry/cflinuxfs3

USER root

# setup env
ENV BLACKPEARL_DB_URL=jdbc:mysql://localhost:3306/blackpearldev?useSSL=false
ENV BLACKPEARL_DB_USERNAME=blackpearl
ENV BLACKPEARL_CI=true
#ENV DEBIAN_FRONTEND noninteractive

# create man directory
RUN mkdir -p /usr/share/man/man1

# install dependencies
RUN apt-get -qqy update &&\
    echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections &&\
    apt-get -qqy install \
        software-properties-common \
        maven \
        wget \
        unzip \
        mysql-server \
        xvfb \
        apt-transport-https fonts-freefont-ttf gconf-service libasound2 libatk1.0-0 libc6 libcairo2 \
        libcanberra-gtk-module libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 \
        libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
        libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
        ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils &&\
    rm -rf \
        /var/lib/apt/lists/* \
        /var/cache/apt/*

# setup repositories
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - &&\
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - &&\
    add-apt-repository -y ppa:webupd8team/java &&\
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list &&\
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list &&\
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

# install dependencies from new repositories
RUN apt-get -qqy update &&\
    echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections &&\
    apt-get -qqy install \
        oracle-java8-installer \
        nodejs \
        yarn \
        google-chrome-stable &&\
    rm -rf \
        /var/lib/apt/lists/* \
        /var/cache/oracle-jdk8-installer \
        /var/cache/apt/*

# setup mysql
VOLUME /var/lib/mysql

# lets do this!
ENTRYPOINT service mysql start &&\
    mysql -u root -e "create database blackpearldev;" || true &&\
    mysql -u root -e "create user 'blackpearl'@'localhost';" || true &&\
    mysql -u root -e "GRANT ALL PRIVILEGES ON blackpearldev.* TO 'blackpearl'@'localhost';" || true &&\
    /bin/bash
