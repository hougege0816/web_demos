<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/20
 * Time: 15:51
 */
require('../pub/init.php');


switch ($_POST['method']){
    case 'add':
        add();
        break;
    case 'get' :
        get();
        break;
        break;
    case 'query':
        query();
        break;
}

function add(){
    global $controller;
    $user_id = $_SESSION['user']['id'];
    $login_name = $_SESSION['user']['user_name'];
    $orders = $_POST['order'];
    $result = 0;
    foreach ($orders as $order){
        $user_name = $order['user_name'];
        $phone = $order['phone'];
        $receiving_address = $order['receiving_address'];
        $content = $order['content'];
        $book_id = $order['book_id'];
        $books = $controller->get("select * from book where id = '$book_id'");
        $book_name = $books[0]['book_name'];
        $book_type = $books[0]['book_type'];
        $author = $books[0]['author'];
        $price = floatval($books[0]['price']);
        $order_count = floatval($order['order_count']);
        $total = $price * $order_count;
        $created_at = time();
        $sql = "insert into order_table (user_id,user_name,login_name,phone,book_id,book_name,book_type,author,order_count,total,receiving_address,message,created_at,updated_at)
        values('$user_id','$user_name','$login_name','$phone','$book_id','$book_name','$book_type','$author','$order_count','$total','$receiving_address','$content','$created_at','$created_at'); ";
        if ($controller->add($sql)){
            $result++;
        }
    }
    if ($result === count($_POST['order'])){
        echo json_encode([
            'success'=>true,
            'content'=>'订购成功，待管理员发货！'
        ]);
    }else{
        echo json_encode([
            'success'=>false,
            'content'=>'订购失败，请稍后！'
        ]);

    }
}

function get(){
    global $controller;
    $id = $_SESSION['user']['id'];
    echo json_encode([
        'order'=>$controller->get("select * from order_table where user_id = '$id'")
    ]);
}

function query(){
    global $controller;
    $user_id = $_SESSION['user']['id'];
    $order_id = $controller->unicode2utf8($_POST['order_id']);
    $book_name = $controller->unicode2utf8($_POST['book_name']);
    $sql = "select * from order_table where book_name like '%$book_name%' and id like '%$order_id%' and user_id = '$user_id'";
    echo json_encode([
        'success'=>true,
        'content'=>$controller->get($sql)
    ]);
}
