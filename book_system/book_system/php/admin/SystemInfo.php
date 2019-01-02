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
        'system_info'=>$controller->get('select * from system_info')
    ]);
}

function add(){
    global $controller;
    $type = $_POST['info_type'];
    $content = $_POST['info_content'];
    $created_at = time();
    $sql = "insert into system_info (type,content,created_at,updated_at) values ('$type','$content','$created_at','$created_at') ";
    if ($controller->add($sql)){
        echo json_encode([
            'success'=>true,
            'content'=>'发布系统信息成功！'
        ]);
        exit();
    }else{
        echo json_encode([
            'success'=>false,
            'content'=>'发布系统信息失败！'
        ]);
    }
}

function remove(){
    global $controller;
    $count = $controller->remove('system_info');
    echo json_encode([
        'success'=>true,
        'content'=>'已删除' . $count . '条系统信息！'
    ]);
}

function update(){
    global $controller;
    $id = $_POST['id'];
    $type = $_POST['type'];
    $content = $_POST['content'];
    $updated_at = time();
    $sql = "update system_info set type='$type',content='$content',updated_at='$updated_at' where id='$id'";
    if ($controller->update($sql)){
        $result = true;
        $content = '更新系统信息成功！';
    }else{
        $result = false;
        $content = '更新系统信息失败！';
    }
    echo json_encode([
        'success'=>$result,
        'content'=>$content
    ]);
}

function query(){
    global $controller;
    $type = $controller->unicode2utf8($_POST['type']);
    $content = $_POST['content'];
    if ($type==='all'){
        $sql = "select * from system_info where content like '%$content%'";
    }else{
        $sql = "select * from system_info where content like '%$content%' and type = '$type'";
    }
    echo json_encode([
        'success'=>true,
        'content'=>$controller->get($sql)
    ]);
}