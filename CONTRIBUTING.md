## Contributing

There are three ways to submit your custom element to this gallery. They all require you to have a GitHub repository, so make sure to write the appropriate repository name and description.

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

3. Wait for it to show up! Shouldn't take longer than few hours.

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

3. Wait for it to show up! Shouldn't take longer than few hours.

### Manual Submission

Fork this project and include your repository info in the [data/repos.json](https://github.com/customelements/customelements.io/blob/gh-pages/data/repos.json) file.
