pipeline {
    agent { docker 'node:6.3' }
    stages {
        stage('build') {
            steps {
                sh 'sudo npm install --unsafe-perm=true --allow-root'
            }
        }
        stage('deliver') {
            steps {
                sh 'npm start'
            }
        }
    }
}