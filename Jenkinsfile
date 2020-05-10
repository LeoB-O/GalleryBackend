pipeline {
    agent { docker 'node:6.3' }
    stages {
        stage('build') {
            steps {
                sh 'npm install'
            }
        }
        stage('deliver') {
            steps {
                sh 'npm start'
            }
        }
    }
}