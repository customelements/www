# &lt;twitter-button&gt;

Web Component wrapper for [Twitter's button](https://twitter.com/about/resources/buttons#tweet) using Polymer.

## Demo

![Twitter Button](http://zno.io/QtuS/twitter-element.png)

> [Check it live](http://zenorocha.github.io/twitter-button).

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install twitter-button --save
```

Or [download as ZIP](https://github.com/zenorocha/twitter-button/archive/master.zip).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/twitter-button/dist/twitter-button.html">
    ```

3. Start using it!

    ```html
    <twitter-button></twitter-button>
    ```

## Options

Attribute | Options       | Default                    | Description
---       | ---           | ---                        | ---
`text`    | *string*      | `Web Components rocks!`   | The text displayed on the tweet
`type`    | `share`, `follow`, `hashtag`, `mention` | `share`              | The type of button
`href`    | *string*      | `http://webcomponents.org` | The URL displayed on the tweet
`user`    | *string*      | `Web_Components`                | The user displayed on the tweet and in the @mention
`hashtag` | *string*          | `webcomponents`           | The hashtag displayed on the tweet
`height`  | *int*         | `25`                       | The height of the button
`width`   | *int*         | `115`                      | The width of the button

> See Twitter's [official documentation](https://twitter.com/about/resources/buttons).

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

For detailed changelog, check [Releases](https://github.com/zenorocha/twitter-button/releases).

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
