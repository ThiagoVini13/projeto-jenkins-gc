pipeline {
    agent any 

    triggers {
        cron('H/2 * * * *')
    }

    stages {
        stage('Build in Container') {
            steps {
                echo 'Criando a imagem de build e executando a compilação dentro do container...'
                sh 'docker build -t atividade-build:latest -f Dockerfile .'
            }
        }

        stage('Test in Container') {
            steps {
                echo 'Criando a imagem de teste e executando os testes em um novo container...'
                
                sh 'docker build -t atividade-test:latest -f Dockerfile.test .'
                
                catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
                    sh 'docker run --rm --name container-testes-${BUILD_NUMBER} atividade-test:latest'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Limpando as imagens e containers temporários...'
            sh 'docker rmi atividade-build:latest atividade-test:test || true'
        }
    }
}
