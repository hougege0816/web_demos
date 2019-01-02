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
        'user'=>$controller->get('select * from user')
    ]);
}

function add(){
    global $controller;
    $name = $_POST['user']['name'];
    $user_name = $_POST['user']['user_name'];
    $password = md5($_POST['user']['password']);
    $age = $_POST['user']['age'];
    $sex = $_POST['user']['sex'];
    $phone = $_POST['user']['phone'];
    $email = $_POST['user']['email'];
    $created_at = time();
    $sql = "select user_name from user where user_name = '$user_name'";
    $num = $controller->sql($sql)->num_rows;
    if ($num){
        echo json_encode([
            'success'=>false,
            'content'=>'用户名已存在'
        ]);
        exit();
    }
    $sql = "insert into user (name,user_name,password,sex,age,email,phone,created_at,updated_at)
        values('$name','$user_name','$password','$sex','$age','$email','$phone','$created_at','$created_at')";
    if ($controller->add($sql)){
        echo json_encode([
            'success'=>true,
            'content'=>'添加用户成功！'
        ]);
        exit();
    }else{
        echo json_encode([
            'success'=>false,
            'content'=>'添加用户失败！'
        ]);
    }
}

function remove(){
    global $controller;
    $count = $controller->remove('user');
    echo json_encode([
        'success'=>true,
        'content'=>'已删除' . $count . '个用户！'
    ]);
}

function update(){
    global $controller;
    $id = $_POST['id'];
    $name = $_POST['user']['name'];
    $user_name = $_POST['user']['user_name'];
    $age = $_POST['user']['age'];
    $sex = $_POST['user']['sex'];
    $phone = $_POST['user']['phone'];
    $email = $_POST['user']['email'];
    $receiving_address = $_POST['user']['receiving_address'];
    $updated_at = time();
    $sql = "select * from user where user_name = '$user_name' and id <> '$id'";
    $num = $controller->get($sql);
    if ($num){
        echo json_encode([
            'success'=>false,
            'content'=>'用户名已存在！'
        ]);
        exit();
    }
    $sql = "update user set name = '$name',user_name='$user_name',age='$age',sex='$sex',phone='$phone',email='$email',
          receiving_address = '$receiving_address'  ,updated_at='$updated_at' where id='$id'";
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
    $user_id = $controller->unicode2utf8($_POST['user_id']);
    $user_name = $controller->unicode2utf8($_POST['user_name']);
    $sql = "select * from user where user_name like '%$user_name%' and id like '%$user_id%'";
    echo json_encode([
        'success'=>true,
        'content'=>$controller->get($sql)
    ]);
}