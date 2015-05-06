# &lt;love-heart&gt; v0.3.0

Pulsing love heart web component

![love](https://raw.github.com/janantala/love-heart/master/img/love.gif)
```html
Made with <love-heart></love-heart> by me
```

#### Demo
Check out http://janantala.github.io/love-heart/ or http://customelements.io/

##### Our partners 
<a href="http://customelements.io/"><img src="http://customelements.io/img/profile-200.jpg" height="50px"/></a>
&nbsp;<a href="http://customelements.io/">customelements.io</a>

# Usage

1. Install love heart component:

  ```
  ❯ bower install love-heart
  ```

2. Import Web Components' polyfill:

	```html
	<script src="//cdnjs.cloudflare.com/ajax/libs/polymer/0.3.1/platform.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/polymer/0.3.1/polymer.js"></script>
	```

3. Import Custom Element:

	```html
	<link rel="import" href="bower_components/love-heart/love-heart.html">
	```

4. Start using it!

	```html
	<love-heart></love-heart>
	```

### Apply your own CSS:

```css
.blue { color: blue; }
.big { font-size: 3.4em; }
```

```html
Made with <love-heart class="blue"></love-heart> by me
Made with <love-heart class="big"></love-heart> by me
```

## Fallback

You can add love-heart component fallback which is visible before page load is complete:

```html
Made with <love-heart>love</love-heart> by Jan Antala
```

# License

The MIT License

Copyright (c) 2014 [Jan Antala](http://www.janantala.com)
