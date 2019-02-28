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
            git url: 'git@sc.appdev.proj.coe.ic.gov:af7ss5k-usaf/blackpearl.git', branch: 'master', credentialsId: '06b63c7f-e89e-485a-bf6a-8d4de5d93d4b', poll: true
    }

    stage ('Deploy') {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'paas-tc-dev-BLACK_PEARL_service', passwordVariable: 'PCFPass', usernameVariable: 'PCFUser']]) {
            withEnv(["CF_HOME=${pwd()}"]) {
                sh "cf login -a api.system.dev.east.paas.nga.ic.gov -u $PCFUser -p $PCFPass -o Black_Pearl -s 'The_Black_Pearl_dev'"
                sh "cf push -f ./manifest-high.yml -n blackpearl"
            }
        }
    }
}