<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/21
 * Time: 13:06
 */
header("Content-type: text/html; charset=utf-8");
require('../pub/Controller.php');
$controller = new Controller();
if (!$controller->isAjax()){
    exit();
}