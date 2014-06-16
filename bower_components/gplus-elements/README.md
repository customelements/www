# &lt;gplus-elements&gt;

Web Component wrapper for [Google Plus' buttons](https://developers.google.com/+/web/+1button/) using Polymer.


## Demo

![GPlus Element](http://zno.io/Qvag/gplus-element.png)

> [Check it live](http://zenorocha.github.io/gplus-elements).

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install gplus-elements --save
```

Or [download as ZIP](https://github.com/zenorocha/gplus-elements/archive/master.zip).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/gplus-elements/dist/gplus-one.html">
    <link rel="import" href="bower_components/gplus-elements/dist/gplus-follow.html">
    ```

3. Start using it!

    ```html
    <gplus-one></gplus-one>
    <gplus-follow></gplus-follow>
    ```

## &lt;gplus-one&gt;

Attribute    | Options                               | Default                    | Description
---          | ---                                   | ---                        | ---
`annotation` | `bubble`,`inline`,`none`              | `bubble`                   | Sets the annotation to display next to the button
`height`     | `15`,`20`,`24`                        | `20`                       | The pixel height of the button to render
`href`       | *string*                              | `http://webcomponents.org` | The URL to +1
`size`       | `small`, `medium`, `standard`, `tall` | `standard`                 | Sets the +1 button size to render
`width`      | *int*                                 | `300`                      | The width of the button


## &lt;gplus-follow&gt;

Attribute    | Options                               | Default                                     | Description
---          | ---                                   | ---                                         | ---
`annotation` | `bubble`, `vertical-bubble`, `none`   | `bubble`                                    | Sets the annotation to display next to the button
`height`     | `15`,`20`,`24`                        | `20`                                        | The pixel height of the button to render
`href`       | *string*                              | `https://plus.google.com/+WebcomponentsOrg` | URL to the Google+ page or user profile
`rel`        | `author or publisher`                 |                                             | Describes the relationship of the entity defined at the href location to the page the badge is embedded.
`width`      | *int*                                 | `300`                                       | The width of the button

> See Google Plus' [official documentation](https://developers.google.com/+/web/+1button/).

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

For detailed changelog, check [Releases](https://github.com/zenorocha/gplus-elements/releases).

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
