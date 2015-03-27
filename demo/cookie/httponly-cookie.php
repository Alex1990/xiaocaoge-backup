<?php

setcookie('httponly', 'hello world', time() + 3600, '/demo/cookie/', 'www.xiaocaoge.com', false, true);

var_dump($_COOKIE);

?>
<script>
    alert(document.cookie);
</script>