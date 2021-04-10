#!/usr/bin/env bash

ls ./packages/chrome-driver/src/background/commands/


for file in ./packages/chrome-driver/src/background/commands/*.{re,rei}; do
  echo "$file"

  [ -f "$file" ] || break
  FILENAME=$(basename -- "$file")
  BASENAME=${FILENAME%%.*}
  DIRNAME=$(dirname $file)

  echo "$file"
  
  if [ ${file: -3} == ".re" ]; then
    npx bsc -format $file > "${DIRNAME}/${BASENAME}.res"
  elif [ ${file: -4} == ".rei" ]; then
    npx bsc -format $FILENAME > "${DIRNAME}/${BASENAME}.resi"
  fi

  rm $file
done