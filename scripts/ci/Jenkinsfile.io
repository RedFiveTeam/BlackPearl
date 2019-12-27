properties(
    [
        buildDiscarder(
            logRotator(
                numToKeepStr: '10'
            )
        ),
        disableConcurrentBuilds()
    ]
)

node ('legacy') {
    stage ('Checkout') {
        if(env.BRANCH_NAME == 'acceptance') {
            git url: 'git@gitlab.devops.geointservices.io:dgs1sdt/blackpearl.git', branch: 'acceptance', credentialsId: '0059b60b-fe05-4857-acda-41ada14d0c52', poll: true
        } else if (env.BRANCH_NAME == 'master') {
            git url: 'git@gitlab.devops.geointservices.io:dgs1sdt/blackpearl.git', branch: 'master', credentialsId: '0059b60b-fe05-4857-acda-41ada14d0c52', poll: true
        }
    }

    stage ('Test & Build') {
        sh """
        docker pull dgs1sdt/blackpearl:cfs3linux
        docker stop BlackPearl || true && docker rm BlackPearl || true
        docker run --name BlackPearl -v `pwd`:/app -itd dgs1sdt/blackpearl:cfs3linux
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
            withCredentials([[$class: 'StringBinding', credentialsId: 'd5ddf49e-60e6-4816-b668-406eddd250af', variable: 'SONAR_LOGIN']]) {
                sh "JOB_NAME=${jobname} && JOB_SHORT_NAME=${jobshortname} && set && ${scannerHome}/bin/sonar-scanner -Dsonar.host.url=${sonarHost} -Dsonar.login=${SONAR_LOGIN} -Dsonar.projectName=BlackPearl -Dsonar.projectKey=narwhal:BlackPearl"
            }
        }
    }

    stage ('Fortify') {
        sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} -clean'
        sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} "**/*" -exclude "client/node_modules/**/*" -exclude "client/build/**/*" -exclude "build/**/*" -exclude "acceptance/**/*" -exclude "client/src/stories/**/*" -exclude "src/main/resources/static/**/*" -exclude "client/public/**/*"'
        sh '/opt/hp_fortify_sca/bin/sourceanalyzer -64 -verbose -Xms2G -Xmx10G -b ${BUILD_NUMBER} -scan -f fortifyResults-${BUILD_NUMBER}.fpr'
    }

    stage ('ThreadFix') {
        withCredentials([string(credentialsId: 'fc10b28d-d9df-44c7-b282-251816ca5602', variable: 'THREADFIX_VARIABLE')]) {
            sh "/bin/curl -v --insecure -H 'Accept: application/json' -X POST --form file=@fortifyResults-${BUILD_NUMBER}.fpr\
            https://threadfix.devops.geointservices.io/rest/applications/222/upload?apiKey=${THREADFIX_VARIABLE}"
        }
    }

    if(env.BRANCH_NAME == 'acceptance') {
        stage ('Deploy Acceptance') {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '67a37428-4424-4d73-9af4-03c4f53e4610', passwordVariable: 'PCFPass', usernameVariable: 'PCFUser']]) {
                withEnv(["CF_HOME=${pwd()}"]) {
                    sh "cf login -a api.system.dev.east.paas.geointservices.io -u $PCFUser -p $PCFPass -o DGS1SDT -s 'Black_Pearl_Development'"
                    sh "cf push -s cflinuxfs3"
                }
            }
        }
    } else if(env.BRANCH_NAME == 'master') {
        stage ('Deploy Staging') {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '67a37428-4424-4d73-9af4-03c4f53e4610', passwordVariable: 'PCFPass', usernameVariable: 'PCFUser']]) {
                withEnv(["CF_HOME=${pwd()}"]) {
                    sh "cf login -a api.system.dev.east.paas.geointservices.io -u $PCFUser -p $PCFPass -o DGS1SDT -s 'Black_Pearl_Staging'"
                    sh "cf push -n blackpearl-staging"
                }
            }
        }
    }
}
