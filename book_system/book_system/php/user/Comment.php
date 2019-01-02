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
        break;
    case 'query':
        query();
        break;
    case 'remove':
        remove();
        break;
}

function get(){
    global $controller;
    $id = $_SESSION['user']['id'];
    $sql = "select * from comment_table where user_id = '$id'";
    echo json_encode([
        'comment'=>$controller->get($sql)
    ]);
}

function query(){
    global $controller;
    $id = $_SESSION['user']['id'];
    $book_class = $controller->unicode2utf8($_POST['book_type']);
    $book_name = $controller->unicode2utf8($_POST['book_name']);
    $sql = "select * from comment_table where book_name like '%$book_name%' and user_id = '$id'";
    if ($book_class!=='all'){
        $sql .= "and book_type = '$book_class' ";
    }
    echo json_encode([
        'success'=>true,
        'content'=>$controller->get($sql)
    ]);
}

function remove(){
    global $controller;
    $id = $_SESSION['user']['id'];
    $aId = $_POST['aId'];
    $count = 0;
    foreach ($aId as $_id){
        if ($controller->sql("select id from comment_table where id = '$_id' and user_id = '$id' ")){
            if ($controller->sql("delete from comment_table where id = '$_id'")){
                $count++;
            }
        }
    }
    echo json_encode([
        'success'=>true,
        'content'=>'已删除' . $count . '条评论!'
    ]);
}