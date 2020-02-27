#!/usr/bin/env sh

set -e

npm run build

cd dist

echo deviltea.me > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/deviltea-site/frontend.git master:gh-pages

cd -