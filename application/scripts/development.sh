#!/bin/bash

# Write vault pass into file
cat <<EOF > /tmp/vault
${VAULT_PASS}
EOF

# Tag - Build Number
export TAG=${BUILD_NUMBER}_dev

# Execute Playbook Deploy
ansible-playbook ansible/development.yml \
    --extra-vars=tag=$TAG \
    --vault-password-file=/tmp/vault

# Remove vault pass from file
rm -rf /tmp/vault
