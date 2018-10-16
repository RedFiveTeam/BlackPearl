node ('') {
    stage ('Deploy Staging') {
        timeout(time: 15, unit: 'SECONDS') {
            input 'Push to staging?'
            echo "It pushed!"
        }
        echo "It didn't push!"
    }
}
