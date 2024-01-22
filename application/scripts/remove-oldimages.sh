#!/bin/bash

# Import Build Number script
source /tmp/build-number.sh

# Define the image name
image_name="registry.mpwt.gov.kh:4000/sovichea10/osr-f-angular"

# Retrieve the list of existing image tags
image_tags=$(crictl --runtime-endpoint=unix:///var/run/crio/crio.sock images | grep "$image_name" | awk '{print $2}')

# Loop through the image tags and delete the ones that don't match the tag to keep
for tag in $image_tags; do
    if [ "$tag" != "$current_tag" ]; then
        crictl --runtime-endpoint=unix:///var/run/crio/crio.sock rmi "${image_name}:${tag}"
    fi
done

# Note *** $current_tag is comming from /tmp/build-number.sh which ansible execution
