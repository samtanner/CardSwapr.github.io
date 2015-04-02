#!/bin/bash

cd build
rm -rf .git
git init
git config --local --add user.name=$GIT_NAME
git config --local --add user.email=$GIT_EMAIL

git config --local --add github.token=$GIT_TOKEN

git remote add origin https://github.com/cardswapr/cardswapr.github.io.git
git add -A
git commit -m "Update blog."
git push -f origin master
