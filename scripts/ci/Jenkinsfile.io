node ('') {
    stage ('Deploy Staging') {
        catchError {
            timeout(time: 15, unit: 'SECONDS') {
                input 'Push to staging?'
                echo "It pushed!"
                currentBuild.result = 'SUCCESS'
            }
        }
        currentBuild.result = 'SUCCESS'
    }
}
