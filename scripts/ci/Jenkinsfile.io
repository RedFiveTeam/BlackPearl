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
                   withCredentials([[$class: 'StringBinding', credentialsId: 'sonarQube', variable: 'SONAR_LOGIN']]) {
                     sh "JOB_NAME=${jobname} && JOB_SHORT_NAME=${jobshortname} && set && ${scannerHome}/bin/sonar-scanner -Dsonar.host.url=${sonarHost} -Dsonar.login=${SONAR_LOGIN} -Dsonar.projectName=BlackPearl -Dsonar.projectKey=narwhal:BlackPearl"
           }
        }
    }
    stage ('FortifyScan') {
            sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} -clean'
            sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} "**/*" -exclude "client/node_modules/**/*" -exclude "client/build/**/*" -exclude "build/**/*" -exclude "acceptance/**/*" -exclude "client/src/stories/**/*" -exclude "src/main/resources/static/**/*" -exclude "client/public/**/*"'
            sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} -scan -f fortifyResults-${BUILD_NUMBER}.fpr'
        }
            stage ('PostFortifyResultsToThreadFix') {
                withCredentials([string(credentialsId: 'fc10b28d-d9df-44c7-b282-251816ca5602', variable: 'THREADFIX_VARIABLE')]) {
                sh "/bin/curl -v --insecure -H 'Accept: application/json' -X POST --form file=@fortifyResults-${BUILD_NUMBER}.fpr\
                    https://threadfix.devops.geointservices.io/rest/applications/222/upload?apiKey=${THREADFIX_VARIABLE}"
                }
            }
}
