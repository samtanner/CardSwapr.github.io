#!/bin/bash
echo "Starting push..."

git clone "https://$USER:$TOKEN@github.com/cardswapr/cardswapr.github.io.git" build
cd build
git checkout master
cd ..

node build.js

cd build
git config --local --add user.name "$NAME"
git config --local --add user.email "$EMAIL"

git add -A
git commit -m "Update blog."
git push origin master

echo "Push completed."
