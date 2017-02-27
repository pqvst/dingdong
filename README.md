# dingdong 🛎
A simple feedback popup (client-side only). [Give it a try here!](https://rawgit.com/pqvst/dingdong/master/demo.html)

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

```js
// initialize with default handler (POST to /dingdong)
$.dingdong();

// initialize with custom endpoint
$.dingdong("/my-dingdong");

// initialize with custom handler
$.dingdong(function (data, callback) {
	alert(JSON.stringify(data));
	callback();
});

$.dingdong(function (data, callback) {
	// note: return a non-null value if an error occurred
	callback("error!!!");
})

// initialize with custom options
$.dingdong({
	header: "<b>Yoooooooooo!</b>", 
	fade: true,
	openFadeDuration: 1000,
	cancelFadeDuration: 200,
	submitFadeDuration: 1000,
	buttonText: "Heeeeelp!",
	emailPlaceholder: "foo@bar.com",
	messagePlaceholder: "What do you want?",
	submitButtonText: "Goooo!",
	submittedText: "Danke!",
	messageRows: 2,
	disableEscapeToCancel: false,
	endpoint: "/yo-mama",
	handler: function (data, callback) {
		// note: handler takes precedence over endpoint
		console.log(data);
		callback();
	}
});

// default options:
$.dingdong({
	header: null
	fade: false,
	openFadeDuration: 100,
	cancelFadeDuration: 100,
	submitFadeDuration: 1000,
	buttonText: "Feedback",
	emailPlaceholder: "Your email address",
	messagePlaceholder: "Send us your feedback or report an issue",
	submitButtonText: "Send message",
	submittedText: "Thanks!",
	messageRows: 7,
	endpoint: "/dingdong",
	handler: null
});
```

## Custom Handler
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
