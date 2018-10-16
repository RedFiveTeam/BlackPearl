node ('') {
    stage ('Deploy Staging') {
        steps {
            catchError {
                timeout(time: 15, unit: 'SECONDS') {
                    input 'Push to staging?'
                    echo "It pushed!"
                }
            }
            echo currentBuild.result
        }
    }
}
