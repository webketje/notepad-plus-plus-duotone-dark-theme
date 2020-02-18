#!/bin/sh

composer install
npm install
bower install
npm run build

cat << EOF
The current working directory is: $PWD
You are logged in as: $(whoami)
EOF

appsdir="/test"
target="$appsdir/$1"

if [ $1 != "proj" ] && [ $1 != "proj-test" ]
then
  echo "Invalid target directory $target"
  exit 1
fi

if [ $1 == "proj" ]
then
  [ ! -d ~/backup ] && mkdir ~/backup
  mv $target/* ~/backup
fi

if [ $1 == "proj" ]
then
  cp ~/env.t2 $target/.env
else
  cp ~/env.t1 $target/.env
fi

echo "Deploying..."

cp -r -u -t $target test
cp -u -t $target file1 file2
cp -r -u -t $target folder folder2

echo "Done.."