#!/bin/bash

## Paramaters
USER_ID=$1
SLIDE_ID=$2

echo "START: /slide/${USER_ID}/${SLIDE_ID}"

## Generate HTML
echo "START: BUILD"
gsutil cp gs://stg-slide4vr.nklab.dev/ssg-pages.json ssg/ssg-pages.json
node ssg/add_page.js "/slide/${USER_ID}/${SLIDE_ID}"
cat ssg/ssg-pages.json
API_BASE_URL=https://slide4vr-api-dnb6froqha-uc.a.run.app yarn generate
cat ssg/ssg-pages.json
gsutil cp ssg/ssg-pages.json gs://stg-slide4vr.nklab.dev/ssg-pages.json 
echo "END: BUILD"

## Upload
echo "START: UPLOAD"
find dist/ -type f|sed 's/dist//g'|grep -v .png|grep -v .svg |grep -v .jpg|grep -v .ico| xargs -n1 -I {} echo gs://stg-slide4vr.nklab.dev{} > dist.list
gsutil -m setmeta -h "Cache-Control: no-cache" $(cat dist.list)
gsutil -m cp -R dist/* gs://stg-slide4vr.nklab.dev/
gsutil -m setmeta -h "Cache-Control: no-cache" $(cat dist.list)
echo "END: UPLOAD"

echo "END: /slide/${USER_ID}/${SLIDE_ID}"