#!/bin/bash

line="---------------------------------------------------------------"

# bold text
bold=$(tput bold)

# normal text
normal=$(tput sgr0)

# outputEmail=$(printf "\n%s" "${email[@]}")


emailCommitter=$(git log -n 1 --pretty=format:%cE)
userCommitter=$(git log -n 1 --pretty=format:%aN)

# use Mappings between email and telegram username
# --------------------------------------------------------------
declare -A email_to_username

email_to_username["vicheasokan6@gmail.com"]="@sovichea10"
email_to_username["vituyoeun1603@gmail.com"]="@yoeunvitu"
email_to_username["kaybriyel@gmail.com"]="@kaybriyel"
email_to_username["kim.sonen.2022@gmail.com"]="@kim_sonen"
email_to_username["yimklok.kh@gmail.com"]="@yim_klok"
email_to_username["kimhong@gmail.com"]="@kimhongvuthy"
email_to_username["layy.isme@gmail.com"]="@lay_ly"
email_to_username["kungchantha49@gmail.com"]="@Kung_Chantha"
email_to_username["sophalchen82@gmail.com"]="@sophalchen"
email_to_username["bopisey1@gmail.com"]="@bopisey"
email_to_username["khouch.koeun@gmail.com"]="@KOEUNKhouch"
email_to_username["yoeunsathya4@gmail.com"]="@SathyaYoeun"
email_to_username["sotearithkhan013@gmail.com"]="@KhanNarith"
email_to_username["chhrathana@gmail.com"]="@chhan_rathana"
email_to_username["hkimhan@gmail.com"]="@HounKimhan"
# ---------------------------------------------------------------

# use Mappings between user and telegram username
# --------------------------------------------------------------
declare -A user_to_username
user_to_username["kungchantha"]="@Kung_Chantha"
# --------------------------------------------------------------

# matching user and telegram username
telegram_username_with_user=${user_to_username[$userCommitter]}

# matching email and telegram username
telegram_username_with_email=${email_to_username[$emailCommitter]}
