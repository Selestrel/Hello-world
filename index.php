<?php
	$view = (string)@$_GET['view'];
	if (strcmp($view, "portfolio") == 0){
			include("views/portfolio.php");
	}
	else if (strcmp($view, "contacts") == 0){
			include("views/contacts.php");
		}	
		else {	
			include("views/portfolio.php");
		}

		
?>