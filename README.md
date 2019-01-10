# The Black Pearl

The Black Pearl is a Crew Web Page created for DGS-1 to better equip analysts by reliably directing them to mission critical intelligence resources.

![The Black Pearl](resources/readme/BlackPearl-HomePage.png?raw=true "The Black Pearl")

## Stable Executables

In the [master/artifacts](https://gitlab.devops.geointservices.io/dgs1sdt/blackpearl/tree/master/artifacts) folder, you can find the latest stable builds of The Black Pearl.

### Differences

* io: Meant for deployment on geointservices.io. Uses Basic Authentication at website.com/login to sign in.
* muhj: Meant for deployment on muhj workstations. Uses Smart Card Authentication at website.com/ to sign in.

### Endpoints
* /admin: Administrator functions such as updating clocks, weather, acronyms, etc.
* /metrics: Metric information based on the usage of The Black Pearl
* /login: (IO Only) Allows the user to log in with either of the following accounts:
  * CROSS.JORDAN.MIDDLE.0123456789
  * YODA.MASTER.MIDDLE.0123456789

## Installing (Production)
### Prerequisites

* [mySQL 5.7](https://downloads.mysql.com/archives/installer/)
* [Java 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

### Instructions

Download the [latest stable jar](https://gitlab.devops.geointservices.io/dgs1sdt/blackpearl/tree/master/artifacts) for your use case.

Run the following commands in Command Prompt to create the database:

```
mysql -u root -p -e "create database blackpearldev;"
mysql -u root -p -e "create user 'blackpearl'@'localhost';"
mysql -u root -p -e "GRANT ALL PRIVILEGES ON blackpearldev.* TO 'blackpearl'@'localhost';"
```

![Windows - Create Database](resources/readme/Windows-CreateDatabase.png?raw=true "Windows - Create Database")


Create the following [Environmental Variables](https://java.com/en/download/help/path.xml):

```
BLACKPEARL_DB_URL : jdbc:mysql://localhost:3306/blackpearldev?useSSL=false
BLACKPEARL_DB_USERNAME : blackpearl
```  

![Windows Environment Variables](resources/readme/Windows-EnvironmentVariables.png?raw=true "Windows Environment Variables")

Run the following command to start the Black Pearl.

```
java -jar <path-to-executable>\blackpearl-<type>.jar
```

Access The Black Pearl at one of the following urls.
```
io: http://localhost:8080/
muhj: https://localhost:8080/
```

## Installing (Development)

If you wish to install The Black Pearl on a development computer, follow the Production commands, then follow these instructions.

### Prerequisites

* [Node](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/en/docs/install)
* [Git](https://git-scm.com/download)

### Instructions

Clone the repository

```
git clone git@gitlab.devops.geointservices.io:dgs1sdt/blackpearl.git
```

Install Dependencies & Test

```
cd <git_dir>\blackpearl\scripts
.\tests.sh
```