!function(n){function d(d,e){n.post("/dingdong",d).done(function(){e()}).fail(function(){alert("Something went wrong :/"),e(!0)})}n.dingdong=function(e){n("body").append(n("<button />",{id:"dingdong-button",style:"display: none",text:"Feedback"})),n("body").append(n("<div/>",{id:"dingdong",style:"display: none"}).append(n("<div/>",{id:"dingdong-box"}).append(n("<div/>",{id:"dingdong-close",text:"\xd7"}),n("<form/>",{id:"dingdong-form"}).append(n("<div/>",{class:"dingdong-row"}).append(n("<input/>",{id:"dingdong-email",name:"email",type:"email",placeholder:"Your email address",required:"required"})),n("<div/>",{class:"dingdong-row"}).append(n("<textarea/>",{id:"dingdong-message",name:"message",rows:"7",placeholder:"Send us your feedback or report an issue",required:"required"})),n("<div/>",{class:"dingdong-row"}).append(n("<label/>",{for:"dingdong-subscribe",text:"Subscribe to newsletter"}).append(n("<input/>",{id:"dingdong-subscribe",name:"subscribe",type:"checkbox"}))),n("<button/>",{id:"dingdong-submit",type:"submit",text:"Send Message"}))))),n("#dingdong-button").click(function(){n("#dingdong").show()}),n("#dingdong, #dingdong-close").click(function(){n("#dingdong").hide()}),n("#dingdong-box").click(function(n){n.stopPropagation()}),n("#dingdong-form").submit(function(i){i.preventDefault();var o={message:n("#dingdong-message").val(),email:n("#dingdong-email").val(),subscribe:n("#dingdong-subscribe").is(":checked")};return(e||d)(o,function(d){d||(n("#dingdong").hide(),n("#dingdong-message").val(""))}),!1})}}(jQuery);