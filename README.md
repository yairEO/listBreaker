List Breaker - split HTML lists into lists chunks
========

Using the CSS [columns](https://developer.mozilla.org/en-US/docs/Web/CSS/columns) wouldn't work well in some situations
when the list is a bit more visually complex. Webkit is especiialy susceptible to visual bugs due to poor support on this
CSS feautre. it also lacks the power to define the maximum number of items per column. It also has overflow bugs and
giving hard times when list items are multiline or being trimmeed with CSS elipsis.

Supports `<ol>` `<ul>` & `<dl>`. For `<ol>`, it automatically keep track of the order.


##[Demo page](http://codepen.io/vsync/pen/ORrJgz?editors=0010)

### Basic usage

```html
<ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    <li>item 4</li>
    <li>item 5</li>
    <li>item 6</li>
    <li>item 7</li>
    <li>item 8</li>
    <li>item 9</li>
    <li>item 10</li>
</ul>
```

Break the above HTML list into lists like so:

```javascript
var someList = document.querySelector('ul'),
    listBreaker = new ListBreaker(someList, "n-items", 4); // "n-lists" or "n-items"
```

Now markup be like:

```html
<ul id='pcpi3ilmcr658ds5x9a4i'>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    <li>item 4</li>
</ul>
<ul id='pcpi3ilmcr658ds5x9a4i'>
    <li>item 5</li>
    <li>item 6</li>
    <li>item 7</li>
    <li>item 8</li>
</ul>
<ul id='pcpi3ilmcr658ds5x9a4i'>
    <li>item 9</li>
    <li>item 10</li>
</ul>
```

To when adding or removing any item to any of the lists, the `update` method should be fired right after:

    listBreaker.update()


