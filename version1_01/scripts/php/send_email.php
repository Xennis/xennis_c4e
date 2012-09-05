<?php
$mail = false;
$return_arr = array();

// post
$user_name = $_POST["user_name"];
$user_email = $_POST["user_email"];
$user_url = $_POST["user_url"];
$user_text = $_POST["user_text"];

if($user_name == "") {
	$user_name = "Unknown";
}

// send email
if($user_email != "" && $user_text != "")  {

	$subject = "E-Mail from $user_name";

	$mailtext = $user_text;
		if($user_url != "") {
			$mailtext .= "<br><br>".$user_url;
		}
	
	$mail = mail("contact@xennis.de", $subject, $mailtext, "From: $user_email\n" . "Content-Type: text/html; charset=UTF-8\n");
}

// return
$return_arr["mail"] = $mail;
$return_arr["name"] = $user_name;
$return_arr["email"] = $user_email;

echo json_encode($return_arr);
 ?>