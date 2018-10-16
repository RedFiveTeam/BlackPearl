node ('') {
    stage ('Deploy Staging') {
        catchError {
            timeout(time: 15, unit: 'SECONDS') {
                input 'Push to staging?'
                echo "It pushed!"
            }
        }
        echo currentBuild.result
    }
}
