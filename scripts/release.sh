npm install
npm version "$1"
git push origin master --force

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

git tag -a "v${PACKAGE_VERSION}" -m "Version ${PACKAGE_VERSION}"
git push origin "v${PACKAGE_VERSION}"