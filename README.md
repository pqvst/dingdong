# dingdong
A simple feedback popup (client-side only). [Give it a try here!](https://rawgit.com/pqvst/dingdong/master/demo/demo.html)

![Demo](https://cdn.rawgit.com/pqvst/dingdong/b58ab698/demo/demo.gif)

## Quick Start

### 1. Include files (and jQuery)
```html
<!-- (1) Include dingdong.css -->
<link type="text/css" rel="stylesheet" href="dingdong.css" />
	
<!-- (2) Include jQuery -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	
<!-- (3) Include dingdong.js -->
<script type="text/javascript" src="dingdong.js"></script>
```

### 2. Initialize dingdong
```html
<script type="text/javascript">		
  $.dingdong();
</script>
```

## Usage

When initializing dingdong you can pass an optional custom handler.

```js
$.dingdong([handler]);
```

The default handler will perform an AJAX POST to /dingdong with the message and email address.

```js
$.dingdong();
```

A custom handler lets you perform whatever action you'd like. 
- `data` is an object containing `message` and `email`.
- `callback` is a function that you should once you're done.

```js
$.dingdong(function (data, callback) {
  alert(["Email:", data.email, "", "Message:", data.message, ""].join("\n"));
  callback();
});
```

For example, you could perform a custom POST like this:

```js
$.dingdong(function (data, callback) {
  $.ajax({
    type: "POST",
    url: "/my-dingdong-handler",
    data: JSON.stringify(data),
    dataType: "json"
  }).done(function () {
    callback();
  })
  .fail(function () {
    alert("Something went wrong :/");
    callback(true);
  });
});
```

Note that you should pass `true` to the callback if an error occurred.
