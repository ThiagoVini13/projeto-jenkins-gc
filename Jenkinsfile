pipeline {
    agent none

    // Cenário 4: Configuração para execução automática agendada (ex: todos os dias às 2h da manhã)
    triggers {
        cron('H 2 * * *') 
    }

    stages {
        // Cenário 1 e Cenário 2: Build dos fontes em um container Docker
        stage('Install & Build') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                echo 'Iniciando o build no container de Build (node:20-alpine)...'
                // Se algum comando falhar aqui (ex: erro de compilação do TypeScript no tsc),
                // o pipeline falha imediatamente com status FAILURE (Cenário 2)
                sh 'npm ci'
                sh 'npm run build'
            }
        }

        // Cenário 3: Execução de testes em outro container Docker gerando status "instável" em caso de falha
        stage('Test') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                echo 'Iniciando a execução de testes em outro container (node:20-alpine)...'
                
                // catchError intercepta a falha dos testes e define o resultado do build como UNSTABLE
                // sem interromper ou quebrar totalmente o pipeline com FAILURE
                catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
                    sh 'npm run test:coverage'
                }
            }
        }
    }
}
