pipeline {
    agent { docker 'node:12.16.3' }
    stages {
        stage('build') {
            steps {
                sh 'npm install'
            }
        }
        stage('deliver') {
            steps {
                sh 'npm start'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }
    }
}