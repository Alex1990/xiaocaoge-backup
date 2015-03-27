<?php

$data = '{"foo": "Foo"}';

header("Content-Type: application/javascript");

echo "jsonCallback($data);";

?>