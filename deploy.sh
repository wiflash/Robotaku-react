# build docker image
sudo docker build -f "Dockerfile" -t wiflash/robotaku-container:fe-$TRAVIS_BUILD_ID --label "Maintaner Wildan Fidaus <firdaus@alterra.id>" .
# push apps image to docker hub
sudo docker push wiflash/robotaku-container:fe-$TRAVIS_BUILD_ID
sudo docker tag wiflash/robotaku-container:fe-$TRAVIS_BUILD_ID wiflash/robotaku-container:fe-latest
sudo docker push wiflash/robotaku-container:fe-latest

# go inside kubernetes Server
sed -i -e 's|KUBE_STAGING_CA_CERT|'"${KUBE_STAGING_CA_CERT}"'|g' kubeconfig
sed -i -e 's|KUBE_STAGING_ENDPOINT|'"${KUBE_STAGING_ENDPOINT}"'|g' kubeconfig

# set config for aws kredential
sed -i -e 's|AWS_STAGING_ACCESS_KEY|'"${AWS_STAGING_ACCESS_KEY}"'|g' ~/.aws/credentials
sed -i -e 's|AWS_STAGING_SECRET_KEY|'"${AWS_STAGING_SECRET_KEY}"'|g' ~/.aws/credentials

# update apps deployment
kubectl -n alta18 --kubeconfig kubeconfig set image deployment/${APP_K8S_DEPLOYMENT_NAME} ${APP_K8S_CONTAINER_NAME}=wiflash/robotaku-container:fe-latest
