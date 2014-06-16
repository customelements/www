# &lt;github-button&gt;

Web Component wrapper for [@mdo's GitHub button](https://github.com/mdo/github-buttons) using Polymer.

## Demo

![GitHub Element](http://zno.io/QtpO/github-element.png)

> [Check it live](http://zenorocha.github.io/github-button).

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install github-button --save
```

Or [download as ZIP](https://github.com/zenorocha/github-button/archive/master.zip).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/github-button/dist/github-button.html">
    ```

3. Start using it!

    ```html
    <github-button></github-button>
    ```

## Options

Attribute  | Options                   | Default             | Description
---        | ---                       | ---                 | ---
`user`     | *string*                  | `customelements`    | GitHub username that owns the repo
`repo`     | *string*                  | `github-button`     | GitHub repository to pull the watchers/forks counts
`type`     | `follow`, `fork`, `watch` | `watch`             | Type of button to show
`count`    | `true`, `false`           | `true`              | Show the number of watchers/forks
`height`   | *int*                     | `25`                | The height of the button
`width`    | *int*                     | `100`               | The width of the button
`size`     | `large`, `regular`        | `regular`           | Indicates the button size

> See GitHub Buttons' [official documentation](https://github.com/mdo/github-buttons).

## Development

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

* Install [Bower](http://bower.io/) & [Grunt](http://gruntjs.com/):

    ```sh
    $ [sudo] npm install -g bower grunt-cli
    ```

* Install local dependencies:

    ```sh
    $ bower install && npm install
    ```

* To test your project, start the development server and open `http://localhost:8000`.

    ```sh
    $ grunt server
    ```

* To build the distribution files before releasing a new version.

    ```sh
    $ grunt build
    ```

* To provide a live demo, send everything to `gh-pages` branch.

    ```sh
    $ grunt deploy
    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/zenorocha/github-button/releases).

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
