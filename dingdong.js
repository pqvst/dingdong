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

	$.dingdongShow = function () {
		$("#dingdong").show();
	}

	$.dingdong = function(endpointOrHandler) {

		$("body").append(
			$("<button />", { id: "dingdong-button", style: "display: none", text: "Feedback" })
		);

		$("body").append(
			$("<div/>", { id: "dingdong", style: "display: none" }).append(
				$("<div/>", { id: "dingdong-box" }).append(
					$("<div/>", { id: "dingdong-close", text: "\u00D7" }),
					$("<form/>", { id: "dingdong-form" }).append(
						$("<div/>", { "class": "dingdong-row" }).append(
							$("<input/>", { id: "dingdong-email", name: "email", type: "email", placeholder: "Your email address", required: "required" })
						),
						$("<div/>", { "class": "dingdong-row" }).append(
							$("<textarea/>", { id: "dingdong-message", name: "message", rows: "7", placeholder: "Send us your feedback or report an issue", required: "required" })
						),
						/*$("<div/>", { "class": "dingdong-row" }).append(
							$("<label/>", { for: "dingdong-subscribe", text: "Subscribe to newsletter" }).append(
								$("<input/>", { id: "dingdong-subscribe", name: "subscribe", type: "checkbox" })
							)
						),*/
						$("<button/>", { id: "dingdong-submit", type: "submit", text: "Send Message" })
					)
				)
			)
		);

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
			if (endpointOrHandler) {
				if ($.type(endpointOrHandler) === "string") {
					defaultHandler(endpointOrHandler, data, callback);
				} else if ($.type(endpointOrHandler) === "function") {
					endpointOrHandler(data, callback);
				} else {
					console.error("dingdong argument should be null (default handler), string (custom endpoint), or function (custom handler) :/");
				}
			} else {
				defaultHandler("/dingdong", data, callback);
			}
			return false;
		});

	}

}(jQuery));
