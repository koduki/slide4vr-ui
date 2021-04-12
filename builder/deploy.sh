#!/bin/bash

echo $?
echo "START: UPLOAD"
find dist/ -type f|sed 's/dist//g'|grep -v .png|grep -v .svg |grep -v .jpg|grep -v .ico|grep -v .nojekyll| xargs -n1 -I {} echo gs://stg-slide4vr.nklab.dev{} > dist.list
gsutil -m setmeta -h "Cache-Control: no-cache" $(cat dist.list)
gsutil -m cp -R dist/* gs://stg-slide4vr.nklab.dev/
gsutil -m setmeta -h "Cache-Control: no-cache" $(cat dist.list)
echo "END: UPLOAD"