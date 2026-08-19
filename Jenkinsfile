pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build & Deploy') {
            steps {
                bat 'docker compose up -d --build'
            }
        }

        stage('Verify') {
            steps {
                bat 'docker ps'
            }
        }
    }
}