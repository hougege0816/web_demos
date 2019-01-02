<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017\12\17 0017
 * Time: 14:15
 */
function isAjax(){
    if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
        return true;
    }else{
        return false;
    }
}