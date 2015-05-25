## Contributing

There are two ways to submit your elements to this list. Both require you to have a GitHub repository, so make sure you write a good repository name and description for better discoverability.

### Using [Bower](http://bower.io/)

1. Make sure your `bower.json` file contains an array of keywords which includes `web-components`.

    ```js
    {
        "name": "sample",
        "version": "0.0.0",
        "description": "Lorem ipsum dolor sit amet",
        "keywords": [
            "web-components"
        ]
    }
    ```

2. Register your package using CLI.

    ```sh
$ bower register <my-package-name> <git-endpoint>
    ```

3. Wait for it to show up! Shouldn't take longer than an hour.

### Using [npm](https://www.npmjs.com/)

1. Make sure your `package.json` file contains an array of keywords which includes `web-components`.

    ```js
    {
        "name": "sample",
        "version": "0.0.0",
        "description": "Lorem ipsum dolor sit amet",
        "keywords": [
            "web-components"
        ]
    }
    ```

2. Register your package using CLI.

    ```sh
$ npm publish
    ```

3. Wait for it to show up! Shouldn't take longer than an hour.

### Manual Submission

Fork this project and include your repository info in the [data/repos.json](https://github.com/customelements/customelements.io/blob/gh-pages/data/repos.json) file.
