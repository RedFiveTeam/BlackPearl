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
    sh echo "Jobs done"
        }

}
