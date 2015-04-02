#!/bin/bash
echo "Starting push..."
cd build
rm -rf .git

echo "Creating repository..."
echo $GIT_NAME;
echo $GIT_EMAIL;
git init
git config --local --add user.name=$GIT_NAME
git config --local --add user.email=$GIT_EMAIL
git remote add origin "https://nickclaw:$GIT_TOKEN@github.com/cardswapr/cardswapr.github.io.git"

echo "Commiting changes..."
git add -A
git commit -m "Update blog."

echo "Pushing to master..."
git push -f origin master

echo "Push completed."
