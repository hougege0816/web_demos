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
        'book'=>$controller->get('select * from book')
    ]);
}

function add(){
    global $controller;
    $book_name = $_POST['book_name'];
    $author = $_POST['author'];
    $publishing_time = $_POST['publishing_time'];
    $press = $_POST['press'];
    $book_type = $_POST['book_type'];
    $price = $_POST['price'];
    $stock = $_POST['stock'];
    $message = $_POST['message'];
    $created_at = time();
    $sql = "insert into book (book_name,author,publishing_time,press,book_type,price,stock,message,created_at) 
        values('$book_name','$author','$publishing_time','$press','$book_type','$price','$stock','$message','$created_at'); ";
    if ($controller->add($sql)){
        echo json_encode([
            'success'=>true,
            'content'=>'添加图书成功！'
        ]);
        exit();
    }else{
        echo json_encode([
            'success'=>false,
            'content'=>'添加图书失败！'
        ]);
    }
}

function remove(){
    global $controller;
    $count = $controller->remove('book');
    echo json_encode([
        'success'=>true,
        'content'=>'已删除' . $count . '本图书！'
    ]);
}

function update(){
    global $controller;
    $id = $_POST['id'];
    $book_name = $_POST['book_name'];
    $author = $_POST['author'];
    $publishing_time = $_POST['publishing_time'];
    $press = $_POST['press'];
    $book_type = $_POST['book_type'];
    $price = $_POST['price'];
    $stock = $_POST['stock'];
    $message = $_POST['message'];
    $update_at = time();
    $sql = "update book set book_name='$book_name',author='$author',publishing_time='$publishing_time',press='$press',
            book_type='$book_type', price='$price',stock='$stock',message='$message',updated_at='$update_at' where id='$id'";
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
    $book_class = $controller->unicode2utf8($_POST['book_class']);
    $book_name = $controller->unicode2utf8($_POST['book_name']);
    $author = $controller->unicode2utf8($_POST['author']);
    $sql = "select * from book where book_name like '%$book_name%' and author like '%$author%'";
    if ($book_class!=='all'){
        $sql .= "and book_type = '$book_class' ";
    }
    echo json_encode([
        'success'=>true,
        'content'=>$controller->get($sql)
    ]);
}