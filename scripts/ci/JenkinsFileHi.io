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

node ('') {
    stage ('Checkout') {
            git url: 'git@gitlab.devops.geointservices.io:dgs1sdt/blackpearl.git', branch: 'master', credentialsId: '0059b60b-fe05-4857-acda-41ada14d0c52', poll: true
        }

    stage ('Test & Build') {
        sh """
        docker pull dgs1sdt/blackpearl

        docker stop BlackPearl || true && docker rm BlackPearl || true

        docker run --name BlackPearl -v `pwd`:/app -itd dgs1sdt/blackpearl

        docker exec BlackPearl /bin/bash -c "/app/scripts/tests.sh"
        """
    }
        stage ('Deploy Staging') {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: '67a37428-4424-4d73-9af4-03c4f53e4610', passwordVariable: 'PCFPass', usernameVariable: 'PCFUser']]) {
                withEnv(["CF_HOME=${pwd()}"]) {
                    sh "cf login -a api.system.dev.east.paas.geointservices.io -u $PCFUser -p $PCFPass -o BlackPearl -s 'The_Black_Pearl_dev'"
                    sh "cf push -n blackpearl"
                    }
                 }
            }
        }