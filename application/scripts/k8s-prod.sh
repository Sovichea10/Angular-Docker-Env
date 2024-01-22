#!/bin/bash

# Import Build Number script
source scripts/build-number.sh

# -----------------------------------------------------------Apply K8s
# Output Env substitution and write into new file
envsubst < k8s/production.yml > k8s/new-production.yml

# Remove build number script
sudo rm -rf build-number.sh

# # Apply K8s cluster
# sudo kubectl apply -f k8s/new-production.yml

# # Remove file
# sudo rm -rf k8s/new-production.yml