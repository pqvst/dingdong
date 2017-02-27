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
		var fade = !!opts.fade;
		var fadeOpen = opts.openFadeDuration || 100;
		var fadeCancel = opts.cancelFadeDuration || 100;
		var fadeSubmit = opts.submitFadeDuration || 1000;

		// custom text options
		var buttonText = opts.buttonText = "Feedback";
		var emailPlaceholder = opts.emailPlaceholder || "Your email address";
		var messagePlaceholder = opts.messagePlaceholder || "Send us your feedback or report an issue";
		var submitButtonText = opts.submitButtonText || "Send message";
		var submittedText = opts.submittedText || "Thanks!";

		// misc
		var messageRows = opts.messageRows || 7;
		var disableEscapeToCancel = !!opts.disableEscapeToCancel;
		var endpoint = opts.endpoint || "/dingdong";

		// helper function for showing
		$.dingdongShow = function () {
			$("#dingdong-submit").prop("disabled", false);
			$("#dingdong-submit").text(submitButtonText);
			$("#dingdong-message").val("");
			// intentionally dont clear email (reuse if submitting more than one issue)

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
			$("#dingdong-submit").text(submittedText).prop("disabled", true);
		}

		var header;
		if (opts.header) {
			header = $("<div/>", { "class": "dingdong-row" }).append(
						$("<div/>", { id: "dingdong-header", html: opts.header })
			);
		}

		// remove existing if $.dingdong has already been called
		$("#dingdong-button").remove();
		$("#dingdong").remove();

		$("body").append(
			$("<button />", { id: "dingdong-button", style: "display: none", text: buttonText })
		);

		$("body").append(
			$("<div/>", { id: "dingdong", style: "display: none" }).append(
				$("<div/>", { id: "dingdong-box" }).append(
					$("<div/>", { id: "dingdong-close", text: "\u00D7" }),
					$("<form/>", { id: "dingdong-form" }).append(
						header,
						$("<div/>", { "class": "dingdong-row" }).append(
							$("<input/>", { id: "dingdong-email", name: "email", type: "email", placeholder: emailPlaceholder, required: "required" })
						),
						$("<div/>", { "class": "dingdong-row" }).append(
							$("<textarea/>", { id: "dingdong-message", name: "message", rows: messageRows, placeholder: messagePlaceholder, required: "required" })
						),
						/*$("<div/>", { "class": "dingdong-row" }).append(
							$("<label/>", { for: "dingdong-subscribe", text: "Subscribe to newsletter" }).append(
								$("<input/>", { id: "dingdong-subscribe", name: "subscribe", type: "checkbox" })
							)
						),*/
						$("<button/>", { id: "dingdong-submit", type: "submit", text: submitButtonText })
					)
				)
			)
		);

		// maybe listen for esc to cancel
		if (!disableEscapeToCancel) {
			$(document).keydown(function(e) {
		    if (e.keyCode == 27) {
		        $.dingdongCancel();
		    }
			});
		}

		$("#dingdong-button").click(function () {
			$("#dingdong").show();
		});

		$("#dingdong, #dingdong-close").click(function () {
			$("#dingdong").hide();
		});

		$("#dingdong-box").click(function (e) {
			e.stopPropagation();
		});

		$("#dingdong-form").submit(function (e) {
			e.preventDefault();
			var data = {
				message: $("#dingdong-message").val(),
				email: $("#dingdong-email").val(),
				//subscribe: $("#dingdong-subscribe").is(":checked")
			};
			function callback(err) {
				if (!err) {
					$("#dingdong").hide();
					$("#dingdong-message").val("");
				}
			}
			if (opts.handler) {
				opts.handler(data, callback);
			} else if (opts.endpoint) {
				defaultHandler(opts.endpoint, data, callback);
			} else { 
				defaultHandler("/dingdong", data, callback);
			}
			return false;
		});

	}

}(jQuery));
