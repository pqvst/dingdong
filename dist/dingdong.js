!function(n){function d(d,e,i){n.post(d,e).done(function(){i()}).fail(function(){alert("Something went wrong :/"),i(!0)})}n.dingdong=function(e){var i={};e&&("object"===n.type(e)?i=e:"string"===n.type(e)?i.endpoint=e:"function"===n.type(e)?i.handler=e:console.error("dingdong argument should be object (options), string (custom endpoint), or function (custom handler) :/"));var o=i.fade!==!1,g=i.openFadeDuration||100,a=i.cancelFadeDuration||100,s=i.submitFadeDuration||1e3,t=i.buttonText="Feedback",r=i.emailPlaceholder||"Your email address",u=i.messagePlaceholder||"Send us your feedback or report an issue",c=i.submitButtonText||"Send message",p=i.submittedText||"Thanks!",l=i.subscribeButtonText||"Subscribe",m=i.fnamePlaceholder||"First name",b=i.lnamePlaceholder||"Last name",h=i.subscribeLabel||"Subscribe to newsletter",f=i.messageRows||7,w=i.escapeToCancel!==!1;i.endpoint||"/dingdong";n.dingdongShow=function(d){n("#dingdong-submit").prop("disabled",!1),n("#dingdong-submit").text(c),n("#dingdong-message").val(""),"subscribeOnly"===d?(n("#dingdong-subscribe").prop("checked",!0),n("#dingdong-name-row").show(),n("#dingdong-message-row").hide(),n("#dingdong-submit").text(l),n("#dingdong-fname").prop("required",!0),n("#dingdong-lname").prop("required",!0),n("#dingdong-message").prop("required",!1)):(n("#dingdong-subscribe").prop("checked",!1),n("#dingdong-name-row").hide(),n("#dingdong-message-row").show(),n("#dingdong-submit").text(c),n("#dingdong-fname").prop("required",!1),n("#dingdong-lname").prop("required",!1),n("#dingdong-message").prop("required",!0)),"subscribeOnly"===d||"messageOnly"===d?n("#dingdong-subscribe-row").hide():n("#dingdong-subscribe-row").show(),o?n("#dingdong").fadeIn(g):n("#dingdong").show()},n.dingdongCancel=function(){o?n("#dingdong").fadeOut(a):n("#dingdong").hide()},n.dingdongHide=function(){o?n("#dingdong").fadeOut(s):n("#dingdong").hide(),n("#dingdong-submit").text(p)};var v;i.header&&(v=[n("<div/>",{class:"dingdong-row"}).append(n("<div/>",{id:"dingdong-header",html:i.header}))]);var y=[n("<div/>",{id:"dingdong-subscribe-row",class:"dingdong-row"}).append(n("<label/>",{for:"dingdong-subscribe",text:h}).append(n("<span/>",{class:"dingdong-switch"}).append(n("<input/>",{id:"dingdong-subscribe",name:"subscribe",type:"checkbox"}),n("<div/>",{class:"dingdong-switch-slider"})))),n("<div/>",{id:"dingdong-name-row",class:"dingdong-row"}).append(n("<input/>",{id:"dingdong-fname",name:"fname",type:"text",placeholder:m,width:"50%"}),n("<input/>",{id:"dingdong-lname",name:"lname",type:"text",placeholder:b,width:"50%"}))],x=[n("<div/>",{id:"dingdong-message-row",class:"dingdong-row"}).append(n("<textarea/>",{id:"dingdong-message",name:"message",rows:f,placeholder:u,required:"required"}))],k=[n("<div/>",{class:"dingdong-row"}).append(n("<input/>",{id:"dingdong-email",name:"email",type:"email",placeholder:r,required:"required"}))],q=[n("<button/>",{id:"dingdong-submit",type:"submit",text:c})];n("#dingdong-button").remove(),n("#dingdong").remove(),n("body").append(n("<button />",{id:"dingdong-button",style:"display: none",text:t})),n("body").append(n("<div/>",{id:"dingdong",style:"display: none"}).append(n("<div/>",{id:"dingdong-box"}).append(n("<div/>",{id:"dingdong-close",text:"\xd7"}),n("<form/>",{id:"dingdong-form"}).append(v,k,x,y,q)))),w&&n(document).keydown(function(d){27==d.keyCode&&n.dingdongCancel()}),n("#dingdong-subscribe").change(function(){var d=n(this).is(":checked");d?n("#dingdong-name-row").slideDown():n("#dingdong-name-row").slideUp(),n("#dingdong-fname").prop("required",d),n("#dingdong-lname").prop("required",d)}),n("#dingdong-button").click(function(){n.dingdongShow()}),n("#dingdong, #dingdong-close").click(function(){n.dingdongCancel()}),n("#dingdong-box").click(function(n){n.stopPropagation()}),n("#dingdong-form").submit(function(e){function o(d){d?n("#dingdong-submit").prop("disabled",!1):n.dingdongHide()}e.preventDefault();var g={message:n("#dingdong-message").val(),email:n("#dingdong-email").val(),subscribe:n("#dingdong-subscribe").is(":checked"),fname:n("#dingdong-fname").val(),lname:n("#dingdong-lname").val()};return n("#dingdong-submit").prop("disabled",!0),i.handler?i.handler(g,o):d(i.endpoint,g,o),!1})}}(jQuery);