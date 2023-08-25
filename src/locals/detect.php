<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require get_languages_file();
function get_languages_file () {
    $_SESSION['lang'] = $_SESSION['lang'] ?? 'en';
    $_SESSION['lang'] = $_GET['lang'] ?? $_SESSION['lang'];

    return $_SESSION['lang'].".php";
}

function __($str) {
    global $lang;
    if(!empty($lang[$str])) {
        return $lang[$str];
    }
    return $str;
}
