<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017\12\17 0017
 * Time: 14:13
 */
require('../pub/init.php');


switch ($_POST['method']){
    case 'get' :
        get();
        break;
    case 'update':
        update();
        break;
    case 'reset_password':
        resetPassword();
        break;
}

function get(){
    global $controller;
    echo json_encode($controller->personalGetInfo('admin'));
}


function update(){
    global $controller;
    echo json_encode($controller->personalUpdateInfo('admin'));
}

function resetPassword(){
    global $controller;
    echo json_encode($controller->resetPassword('admin'));
}