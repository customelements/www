# &lt;facebook-button&gt;

Web Component wrapper for [Facebook's button](https://developers.facebook.com/docs/reference/plugins/like/) using Polymer.

## Demo

![Facebook Element](http://zno.io/Quih/facebook-element.png)

> [Check it live](http://zenorocha.github.io/facebook-button).

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install facebook-button --save
```

Or [download as ZIP](https://github.com/zenorocha/facebook-button/archive/master.zip).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/facebook-button/dist/facebook-button.html">
    ```

3. Start using it!

    ```html
    <facebook-button></facebook-button>
    ```

## Options

Attribute     | Options             | Default        | Description
---           | ---                 | ---            | ---
`action`      | `like`, `recommend` | `like` | The verb to display in the button
`colorscheme` | `light`, `dark` | `light` | The color scheme for the like button
`font`        | `arial`, `lucida grande`, `segoe ui`, `tahoma`, `trebuchet ms`, `verdana` | `arial` | The font to display in the button
`href`        | *string* | `http://customelements.io` | The URL to like/recommend
`layout`      | `standard`, `button_count`, `box_count` | `button_count` | Determines the size and amount of social context next to the button
`showfaces`   | `true`, `false` | `false` | Specifies whether to display profile photos below the button (standard layout only)
`height`       | *int* | `20` | The height of the button
`width`       | *int* | `120` | The width of the button

> See Facebook's [official documentation](https://developers.facebook.com/docs/reference/plugins/like/).

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

For detailed changelog, check [Releases](https://github.com/zenorocha/facebook-button/releases).

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
