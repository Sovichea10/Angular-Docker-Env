#!/bin/bash

# include files
source scripts/array.sh

# Format Date & Time
DATE=$(date "+%d-%m-%Y : %T") # mm-dd-yyyy : H:M:S

L="------------------------------------------------------"
Log=$(git log -n 1 --pretty=format:"<b>COMMITER</b>: %cN %n<b>DATE</b>: $DATE %n<b>MESSAGE</b>: %s")
Server="<b>Server</b>: DevAP-UAT02%0A<b>Local IP</b>: 172.19.16.22%0A<b>Sub Domain</b>: uat-web-osr.mpwt.gov.kh"

CLICKLINK=$(git log -n 1 --pretty=format:"<i>LINK TO SEE CODE HERE</i>: http://gitlab.mpwt.gov.kh/ossr/ossr-web-angular/-/commit/%h")

if [ "$telegram_username_with_email" ]; then
    MSG="${L}%0A<b>PROJECT</b>: ONE STOP SERVICE REPORT%0A<b>APPLICATION</b>: ANGULAR WEB%0A<b>STATUS</b>:  $1%0A<b>VERSION</b>: ${BUILD_NUMBER}%0A${L}%0A${Log}%0A<b>TELEGRAM</b>: ${telegram_username_with_email}%0A${L}%0A${Server}%0A%0A${CLICKLINK}%0A${L}"
    curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text="${MSG}" -d parse_mode="HTML"

elif [ "$telegram_username_with_user" ]; then
    MSG="${L}%0A<b>PROJECT</b>: ONE STOP SERVICE REPORT%0A<b>APPLICATION</b>: ANGULAR WEB%0A<b>STATUS</b>:  $1%0A<b>VERSION</b>: ${BUILD_NUMBER}%0A${L}%0A${Log}%0A<b>TELEGRAM</b>: ${telegram_username_with_user}%0A${L}%0A${Server}%0A%0A${CLICKLINK}%0A${L}"
    curl -s -X POST https://api.telegram.org/bot${BOT_TOKEN}/sendMessage -d chat_id=${CHAT_ID} -d text="${MSG}" -d parse_mode="HTML"
else
    echo "No username exists"
fi