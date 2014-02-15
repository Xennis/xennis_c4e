/*
 * @author       Fabian Rosenthal
 * @website      http://xennis.de
 * @design       xennis_c4e
 * @copyright    Copyright (C) 2011 Fabian Rosenthal
 */
$(document).ready(function(){

	/* -------------------- compatibility -------------------- */
	if(navigator.appName == "Microsoft Internet Explorer") {
		$("input[name=compatibility]").attr("checked", true);
	} else {
		$("form label").hide();
	}

	$("input[name=compatibility]").click(function() {
		if($(this).is(":checked")) {
			$("form label").fadeIn();
		} else {
			$("form label").fadeOut();
		}
	});
});

/* #################### contact form #################### */
var tempContact = "";

function sendEmail() {
	var tempEmail = $("#user_email").val();
	var tempText = $("#user_text").val();
	if(tempEmail != "" && tempText != "") {
		$.post("scripts/php/send_email.php", $("#contact").serialize(),
		function(data){
			tempContact = $("#contact").html();
			if(data.mail){
				$("#contact").html("Hey " + data.name + " (" + data.email + "), thank you! Your E-mail was send successfully. <a href=\"javascript:showForm()\">Write me again</a>?");
			} else {
				$("#contact").html("Hey " + data.name + " (" + data.email + "), your E-Mail could not be sent! Please write directly to me (see above) or  <a href=\"javascript:showForm()\">try again</a>?");
			}
			// change color
			$("article a").css({"color": $("article a").css("color")});
		}, "json");
	} else {
		if(tempEmail == "") {
			$("label[for=user_email]").html("<span class='error'>E-mail is required</span");
		}
		if(tempEmail == "") {
			$("label[for=user_text]").html("<span class='error'>Message is required</span");
		}
	}
}

function showForm() {
	$("#contact").html(tempContact);
}