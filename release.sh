#!/usr/bin/env bash

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed() {
    gsed "$@"
  }
  date() {
    gdate "$@"
  }
fi

new_version="${1}"

if [[ -z "${new_version}" ]]; then
  echo "Missing argument: version"
  exit 1
fi

current_version="$(node -p "require('./package.json').version")"

echo "$current_version"

echo "Current version is: ${current_version}"
echo "New version will be: ${new_version}"
echo
read -p "Are you sure? [y/N] " -r

if [[ $REPLY =~ ^[Yy]$ ]]; then
  # package.json
  npm pkg set version=${new_version}
  # package-lock.json
  npm i
  # meta.html
  sed -i 's/\(generator" content="[^"]*\)'"${current_version}"'/\1'"${new_version}"'/' layouts/partials/meta.html
  # first blog post
  sed -i 's/\(title: "[^"]*'"\)${current_version}"'/\1'"${new_version}"'/' exampleSite/content/posts/Welcome-to-the-new-Tranquilpeak.md
  sed -i 's/\(- \*\*Version\*\*: \)'"${current_version}"'/\1'"${new_version}"'/' exampleSite/content/posts/Welcome-to-the-new-Tranquilpeak.md
  # config.toml
  sed -i 's/\([#] Version : \)'"${current_version}"'/\1'"${new_version}"'/' exampleSite/config.toml
  # user.md
  sed -i 's/\(- \*\*Version\*\*: \)'"${current_version}"'/\1'"${new_version}"'/' docs/user.md
  # developer.md
  sed -i 's/\(- \*\*Version\*\*: \)'"${current_version}"'/\1'"${new_version}"'/' docs/developer.md
  # README.md
  sed -i 's/\(- \*\*Version\*\*: \)'"${current_version}"'/\1'"${new_version}"'/' README.md

  npm run lint

  echo "Do not forget to fill CHANGELOG.md"
fi