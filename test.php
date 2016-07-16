<?php
		$files = scandir($dir);
		for ($i = 0; $i < count($files); $i++) {
			if (($files[$i] != ".") && ($files[$i] != "..")&& substr($files[$i], -4, 1) == '.'){
				$path = $dir.$files[$i]; 
				$file_name = substr($files[$i], 0, -4);
				$dir_new = $dir.$file_name."/"; ?>
				<div class="image">
					<a href="index.php?dir=<?=$dir_new?>"><?=$file_name?><br>
					<img src='<?=$path?>'></a>
				</div>
<?php
		}	
		} 


?>