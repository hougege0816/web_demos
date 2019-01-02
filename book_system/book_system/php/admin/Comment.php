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
    case 'add' :
        add();
        break;
    case 'remove':
        remove();
        break;
    case 'update':
        update();
        break;
    case 'query':
        query();
        break;
    case 'display':
        display();
        break;
    case 'getBookComment':
        getBookComment();
        break;
}

function get(){
    global $controller;
    echo json_encode([
        'comment'=>$controller->get("select * from comment_table")
    ]);
}


function add(){
    global $controller;
    $user_id = $_SESSION['user']['id'];
    $user_name = $_SESSION['user']['user_name'];
    $book_id = $_POST['book_id'];
    $books = $controller->get("select * from book where id ='$book_id'")[0];
    $book_name = $books['book_name'];
    $book_type = $books['book_type'];
    $content = $_POST['content'];
    $created_at = time();
    $sql = "insert into comment_table (user_id,user_name,book_id,book_name,book_type,content,state,created_at)
        values('$user_id','$user_name','$book_id','$book_name','$book_type','$content','待审核','$created_at'); ";
    if ($controller->add($sql)){
        echo json_encode([
            'success'=>true,
            'content'=>'评论成功，待管理员审核！'
        ]);
        exit();
    }else{
        echo json_encode([
            'success'=>false,
            'content'=>'评论失败！'
        ]);
    }
}

function remove(){
    global $controller;
    $count = $controller->remove('comment_table');
    echo json_encode([
        'success'=>true,
        'content'=>'已屏蔽' . $count . '条评论！'
    ]);
}

function update(){
    global $controller;
    $aId = $_POST['aId'];
    $state = $_POST['state'];
    $count = 0;
    foreach($aId as $id){
        $sql = "update comment_table set state = '$state' where id='{$id}'";
        if ($controller->sql($sql)) $count++;
    }
    echo json_encode([
        'success'=>true,
        'content'=>$state . $count . '条评论！'
    ]);
}

function query(){
    global $controller;
    $book_class = $controller->unicode2utf8($_POST['book_type']);
    $book_name = $controller->unicode2utf8($_POST['book_name']);
    $sql = "select * from comment_table where book_name like '%$book_name%'";
    if ($book_class!=='all'){
        $sql .= "and book_type = '$book_class' ";
    }
    echo json_encode([
        'success'=>true,
        'content'=>$controller->get($sql)
    ]);
}

function getBookComment(){
    global $controller;
    $book_id = $controller->unicode2utf8($_POST['book_id']);
    $sql = "select * from comment_table where book_id = '$book_id' and state = '已通过'";
    echo json_encode([
        'success'=>true,
        'content'=>$controller->get($sql)
    ]);
}

function display(){
    global $controller;
    $state = $controller->unicode2utf8($_POST['state']);
    $sql = "select * from comment_table where state = '$state'";
    echo json_encode([
        'success'=>true,
        'content'=>$controller->get($sql)
    ]);
}