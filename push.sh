#!/bin/bash

cd build
rm -rf .git
git init
git remote add origin https://github.com/cardswapr/cardswapr.github.io.git
git add -A
git commit -m "Update blog."
git push -f origin master
