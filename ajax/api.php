<?php
$login = "bergdaria@gmail.com";
$pwd = "fa8Gova";

function post_result ($url, $postdata){
 $ch = curl_init();
 curl_setopt($ch, CURLOPT_URL, $url);
 curl_setopt($ch, CURLOPT_POST, 1);
 curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // отключение сертификата
 curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); // отключение сертификата
 curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 $result = curl_exec($ch);
 curl_close($ch);
 return $result;
}

function api($postdata){
	$result = post_result("https://api.sendsay.ru", $postdata);
	$res = json_decode($result,true);
	if ($res['REDIRECT']){
		$result = post_result("https://api.sendsay.ru".$res['REDIRECT'], $postdata);
		return $result;
	}else{
		return $result;
	}
}




$params='{
	"one_time_auth":{
		"login":"'.$login.'",
		"passwd":"'.$pwd.'"
	},
	  "action": "member.set",
	  "email":"'.$email.'",
	  "addr_type": "email",
	  "source": "'.$_SERVER['REMOTE_ADDR'].'",
	  "newbie.confirm":"0",
	  "newbie.letter.confirm":"",
	  "newbie.letter.no-confirm":"",
	  "datakey":[
		  ["-group.p740", "set", "1", ""]
	  ]
	  
}';

$postdata = "apiversion=100&json=1&request=" . urlencode($params);
api($postdata);
?>