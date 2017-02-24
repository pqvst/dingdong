(function($) {

	function defaultHandler(data, callback) {
		$.post("/dingdong", data)
			.done(function () {
				callback();
			})
			.fail(function () {
				alert("Something went wrong :/");
				callback("error");
			});
	}
	
	$.dingdong = function(handler) {

		$("body").append(
			$("<button />", { id: "dingdong-button", style: "display: none", text: "Feedback" })
		);
		
		$("body").append(
			$("<div/>", { id: "dingdong", style: "display: none" }).append(
				$("<div/>", { id: "dingdong-overlay" }),
				$("<div/>", { id: "dingdong-box" }).append(
					$("<div/>", { id: "dingdong-close", text: "\u00D7" }),
					$("<form/>", { id: "dingdong-form" }).append(
						$("<textarea/>", { name: "message", rows: "5", placeholder: "Send us your feedback or report an issue", required: "required" }),
						$("<input/>", { name: "email", type: "email", placeholder: "Your email address", required: "required" }),
						$("<button/>", { id: "dingdong-submit", type: "submit", text: "Send Message" })
					)
				)
			)
		);
			
		$("#dingdong-button").click(function () { 
			$("#dingdong").show(); 
		});
		
		$("#dingdong-overlay, #dingdong-close").click(function () {
			$("#dingdong").hide();
		});
		
		$("#dingdong-form").submit(function (e) {
			e.preventDefault();
			var data = { 
				message: $("#dingdong-form textarea").val(),
				email: $("#dingdong-form input").val()
			};
			(handler || defaultHandler)(data, function (err) {
				if (!err) {
					$("#dingdong").hide(); 
					$("#dingdong-form")[0].reset();
				}
			});
			return false;
		});
		
	}
	
}(jQuery));