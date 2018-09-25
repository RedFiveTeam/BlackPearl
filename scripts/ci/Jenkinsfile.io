node ('') {
    stage ('Checkout') {
        git url: 'git@gitlab.devops.geointservices.io:dgs1sdt/blackpearl.git', branch: 'master', credentialsId: '0059b60b-fe05-4857-acda-41ada14d0c52', poll: true
    }

    stage ('Test and Build') {
            sh """
            docker pull dgs1sdt/blackpearl

            docker stop BlackPearl || true && docker rm BlackPearl || true

            docker run --name BlackPearl -v `pwd`:/app -itd dgs1sdt/blackpearl

            docker exec BlackPearl /bin/bash -c "/app/scripts/tests.sh"
            """
        }

        stage ('SonarQube') {
        def sonarXmx = '512m'
        def sonarHost = 'https://sonar.geointservices.io'
        def scannerHome = tool 'SonarQube Runner 2.8';
        withSonarQubeEnv('DevOps Sonar') {
                    // update env var JOB_NAME to replace all non word chars to underscores
                    def jobname = JOB_NAME.replaceAll(/[^a-zA-Z0-9\_]/, "_")
                    def jobshortname = JOB_NAME.replaceAll(/^.*\//, "")
                  withCredentials([[$class: 'StringBinding', credentialsId: 'sonarqube', variable: 'SONAR_LOGIN']]) {
                    sh "JOB_NAME=${jobname} && JOB_SHORT_NAME=${jobshortname} &&
                    set && ${scannerHome}/bin/sonar-scanner -Dsonar.host.url=${sonarHost} -Dsonar.login=${SONAR_LOGIN} -Dsonar.projectName=BlackPearl
     // -Dsonar.projectKey=narwhal:narwhal"
                  }
                }
        }
     }
}
