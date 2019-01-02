<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/20
 * Time: 15:51
 */
require('../pub/init.php');


switch ($_POST['method']){
    case 'get' :
        get();
        break;
        break;
    case 'query':
        query();
        break;
    case 'remove':
        remove();
        break;
    case 'update':
        update();
        break;
    case 'display':
        display();
        break;
}


function get(){
    global $controller;
    echo json_encode([
        'order'=>$controller->get('select * from order_table')
    ]);
}

function query(){
    global $controller;
    $order_id = $controller->unicode2utf8($_POST['order_id']);
    $book_name = $controller->unicode2utf8($_POST['book_name']);
    $sql = "select * from order_table where book_name like '%$book_name%' and id like '%$order_id%'";
    echo json_encode([
        'success'=>true,
        'content'=>$controller->get($sql)
    ]);
}

function remove(){
    global $controller;
    $count = $controller->remove('order_table');
    echo json_encode([
        'success'=>true,
        'content'=>'已拒绝' . $count . '个订单！'
    ]);
}

function update(){
    global $controller;
    $aId = $_POST['aId'];
    $state = $_POST['state'];
    $arr = [];
    $count = 0;
    foreach($aId as $id){
        $sql = "update order_table set state = '$state' where id = '$id'";
        if ($controller->update($sql)) $count++;
        $arr[] = $id;
    }
    echo json_encode([
        'success'=>true,
        'content'=>$state . $count . '个订单！'
    ]);
}


function display(){
    global $controller;;
    $state = $controller->unicode2utf8($_POST['state']);
    $sql = "select * from order_table where state = '$state'";
    echo json_encode([
        'success'=>true,
        'content'=>$controller->get($sql)
    ]);
}
