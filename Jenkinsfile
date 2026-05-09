pipeline {
    agent any

    environment {
        DOCKER_USER = "mrkalapala7"
        CLIENT_IMAGE = "mrkalapala7/jenkins-client"
        SERVER_IMAGE = "mrkalapala7/jenkins-server"
        EC2_IP = "3.16.75.242"
    }

    stages {

        stage('Build Server Image') {
            steps {
                dir('server') {
                    sh 'docker build -t $SERVER_IMAGE .'
                }
            }
        }

        stage('Build Client Image') {
            steps {
                dir('client') {
                    sh '''
                    docker build \
                    --build-arg VITE_API_URL=http://$EC2_IP:3000 \
                    -t $CLIENT_IMAGE .
                    '''
                }
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $SERVER_IMAGE
                    docker push $CLIENT_IMAGE
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop server || true
                docker rm server || true
                docker stop client || true
                docker rm client || true

                docker run -d -p 3000:3000 --name server $SERVER_IMAGE
                docker run -d -p 80:80 --name client $CLIENT_IMAGE
                '''
            }
        }
    }
}
