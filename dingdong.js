(function($) {

	function defaultHandler(endpoint, data, callback) {
		$.post(endpoint, data)
			.done(function () {
		    callback();
		  })
		  .fail(function () {
		    alert("Something went wrong :/");
		    callback(true);
		  });
	}

	$.dingdong = function(options) {

		// parse options
		var opts = {};
		if (options) {
			if ($.type(options) === "object") {
				opts = options;
			} else if ($.type(options) === "string") {
				opts.endpoint = options;
			} else if ($.type(options) === "function") {
				opts.handler = options;
			} else {
				console.error("dingdong argument should be object (options), string (custom endpoint), or function (custom handler) :/");
			}
		}

		// fade options
		var fade = opts.fade !== false;
		var fadeOpen = opts.openFadeDuration || 100;
		var fadeCancel = opts.cancelFadeDuration || 100;
		var fadeSubmit = opts.submitFadeDuration || 1000;

		// custom text options
		var buttonText = opts.buttonText = "Feedback";
		var emailPlaceholder = opts.emailPlaceholder || "Your email address";
		var messagePlaceholder = opts.messagePlaceholder || "Send us your feedback or report an issue";
		var submitButtonText = opts.submitButtonText || "Send message";
		var submittedText = opts.submittedText || "Thanks!";
		var subscribeButtonText = opts.subscribeButtonText || "Subscribe";
		var fnamePlaceholder = opts.fnamePlaceholder || "First name";
		var lnamePlaceholder = opts.lnamePlaceholder || "Last name";
		var subscribeLabel = opts.subscribeLabel || "Subscribe to newsletter";

		// misc
		var messageRows = opts.messageRows || 7;
		var escapeToCancel = opts.escapeToCancel !== false;
		var endpoint = opts.endpoint || "/dingdong";

		// helper function for showing
		$.dingdongShow = function (mode) {
			$("#dingdong-submit").prop("disabled", false);
			$("#dingdong-submit").text(submitButtonText);
			$("#dingdong-message").val("");
			// intentionally dont clear email, fname, lname

			if (mode === "subscribeOnly") {
				$("#dingdong-subscribe").prop("checked", true);
				$("#dingdong-name-row").show();
				$("#dingdong-message-row").hide();
				$("#dingdong-submit").text(subscribeButtonText);
				$("#dingdong-message").prop("required", false);
			} else {
				$("#dingdong-subscribe").prop("checked", false);
				$("#dingdong-name-row").hide();
				$("#dingdong-message-row").show();
				$("#dingdong-submit").text(submitButtonText);
				$("#dingdong-message").prop("required", true);
			}

			if (mode === "subscribeOnly" || mode === "messageOnly") {
				$("#dingdong-subscribe-row").hide();
			} else {
				$("#dingdong-subscribe-row").show();
			}

			if (fade) {
				$("#dingdong").fadeIn(fadeOpen);
			} else {
				$("#dingdong").show();
			}
		}

		// helper function for canceling
		$.dingdongCancel = function () {
			if (fade) {
				$("#dingdong").fadeOut(fadeCancel);
			} else {
				$("#dingdong").hide();
			}
		}

		// helper function for hiding (aka after submit)
		$.dingdongHide = function () {
			if (fade) {
				$("#dingdong").fadeOut(fadeSubmit);
			} else {
				$("#dingdong").hide();
			}
			$("#dingdong-submit").text(submittedText);
		}

		// maybe build header option
		var header;
		if (opts.header) {
			header = [
				$("<div/>", { "class": "dingdong-row" }).append(
					$("<div/>", { id: "dingdong-header", html: opts.header })
				)
			];
		}

		// maybe build subscribe section
		var subscribe = [
			$("<div/>", { id: "dingdong-subscribe-row", "class": "dingdong-row" }).append(
				$("<label/>", { for: "dingdong-subscribe", text: subscribeLabel }).append(
					$("<span/>", { "class": "dingdong-switch" }).append(
						$("<input/>", { id: "dingdong-subscribe", name: "subscribe", type: "checkbox" }),
						$("<div/>", { "class": "dingdong-switch-slider" })
					)
				)
			),
			$("<div/>", { id: "dingdong-name-row", "class": "dingdong-row" }).append(
				$("<input/>", { id: "dingdong-fname", name: "fname", type: "text", placeholder: fnamePlaceholder, width: "50%" }),
				$("<input/>", { id: "dingdong-lname", name: "lname", type: "text", placeholder: lnamePlaceholder, width: "50%" })
			)
		];

		var message = [
			$("<div/>", { id: "dingdong-message-row", "class": "dingdong-row" }).append(
				$("<textarea/>", { id: "dingdong-message", name: "message", rows: messageRows, placeholder: messagePlaceholder, required: "required" })
			)
		];

		var email = [
			$("<div/>", { "class": "dingdong-row" }).append(
				$("<input/>", { id: "dingdong-email", name: "email", type: "email", placeholder: emailPlaceholder, required: "required" })
			)
		];

		var submit = [
			$("<button/>", { id: "dingdong-submit", type: "submit", text: submitButtonText })
		];

		// remove existing if $.dingdong has already been called
		$("#dingdong-button").remove();
		$("#dingdong").remove();

		// add dingdong button
		$("body").append(
			$("<button />", { id: "dingdong-button", style: "display: none", text: buttonText })
		);

		// add dingdong modal
		$("body").append(
			$("<div/>", { id: "dingdong", style: "display: none" }).append(
				$("<div/>", { id: "dingdong-box" }).append(
					$("<div/>", { id: "dingdong-close", text: "\u00D7" }),
					$("<form/>", { id: "dingdong-form" }).append(
						header,
						email,
						message,
						subscribe,
						submit
					)
				)
			)
		);

		// maybe listen for esc to cancel
		if (escapeToCancel) {
			$(document).keydown(function(e) {
		    if (e.keyCode == 27) {
		        $.dingdongCancel();
		    }
			});
		}

		// toggle name fields when subscribe checkbox changes
		$("#dingdong-subscribe").change(function () {
			var checked = $(this).is(":checked");
			if (checked) {
				$("#dingdong-name-row").slideDown();
			} else {
				$("#dingdong-name-row").slideUp();
			}
			$("#dingdong-fname").prop("required", checked);
			$("#dingdong-lname").prop("required", checked);
		});

		// show dingdong when button is clicked
		$("#dingdong-button").click(function () {
			$.dingdongShow();
		});

		// cancel dingdong when backdrop or close is clicked
		$("#dingdong, #dingdong-close").click(function () {
			$.dingdongCancel();
		});

		// prevent clicks inside the box from propagating
		// (otherwise any click inside will trigger above cancel)
		$("#dingdong-box").click(function (e) {
			e.stopPropagation();
		});

		// handle form submission (prevent default behavior since ajax)
		$("#dingdong-form").submit(function (e) {
			e.preventDefault();
			var data = {
				message: $("#dingdong-message").val(),
				email: $("#dingdong-email").val(),
				subscribe: $("#dingdong-subscribe").is(":checked"),
				fname: $("#dingdong-fname").val(),
				lname: $("#dingdong-lname").val()
			};
			function callback(err) {
				if (err) {
					$("#dingdong-submit").prop("disabled", false);
				} else {
					$.dingdongHide();
				}
			}
			$("#dingdong-submit").prop("disabled", true);
			if (opts.handler) {
				opts.handler(data, callback);
			} else {
				defaultHandler(opts.endpoint, data, callback);
			}
			return false;
		});

	}

}(jQuery));
