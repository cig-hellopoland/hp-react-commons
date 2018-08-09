# Hello Poland React Commons

## Publishing package
Remember to publish stable packages only from a tagged master branch.

To properly publish package to Nexus repository do the following:

1. Make sure package.json version matched tag version
2. Login to Nexus:
    ```bash
    $ npm login --registry=https://packages.fream.pl/repository/npm-fream/
    ```
3. Publish package
    ```bash
    $ npm run package
    $ npm run distribute
    ```
