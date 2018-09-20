node ('') {
    stage ('Checkout') {
        git url: 'git@gitlab.devops.geointservices.io:dgs1sdt/blackpearl.git', branch: 'master', credentialsId: '0059b60b-fe05-4857-acda-41ada14d0c52', poll: true
    }

    stage ('Test and Build') {
            sh """
            if [[ \"\$(docker images -q dgs1sdt/blackpearl 2> /dev/null)\" == \"\" ]]; then
                docker pull dgs1sdt/blackpearl
            fi

            docker stop blackpearl || true && docker rm blackpearl || true

            docker run --name BlackPearl --rm -v `pwd`:/app -v $HOME/.gradle:/root/.gradle -itd  dgs1sdt/blackpearl

            docker exec BlackPearl /bin/bash -c "/app/scripts/tests.sh"
            """
        }
}
