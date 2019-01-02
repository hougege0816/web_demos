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
}

function get(){
    global $controller;
    echo json_encode([
        'book_class'=>$controller->get('select * from book_class')
    ]);
}

function add(){
    global $controller;
    $book_class_name = $_POST['class_name'];
    $remarks = $_POST['class_message'];
    $created_at = time();
    $sql = "insert into book_class (book_class_name,remarks,created_at,updated_at) values ('$book_class_name','$remarks','$created_at','$created_at') ";
    if ($controller->add($sql)){
        echo json_encode([
            'success'=>true,
            'content'=>'添加分类成功！'
        ]);
        exit();
    }else{
        echo json_encode([
            'success'=>false,
            'content'=>'添加分类失败！'
        ]);
    }
}

function remove(){
    global $controller;
    $count = $controller->remove('book_class');
    echo json_encode([
        'success'=>true,
        'content'=>'已删除' . $count . '个图书分类！'
    ]);
}

function update(){
    global $controller;
    $id = $_POST['id'];
    $class_name = $_POST['class_name'];
    $message = $_POST['class_message'];
    $updated_at = time();
    $sql = "update book_class set book_class_name='$class_name',remarks='$message',updated_at='$updated_at' where id='$id'";
    if ($controller->update($sql)){
        $result = true;
        $content = '更新成功！';
    }else{
        $result = false;
        $content = '更新失败！';
    }
    echo json_encode([
        'success'=>$result,
        'content'=>$content
    ]);
}

function query(){
    global $controller;
    $class_id = $controller->unicode2utf8($_POST['class_id']);
    $class_name =  $controller->unicode2utf8($_POST['class_name']);
    $sql = "select * from book_class where id like '%$class_id%' and book_class_name like '%$class_name%'";
    echo json_encode([
        'success'=>true,
        'content'=>$controller->get($sql)
    ]);
}