<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017\12\17 0017
 * Time: 10:13
 */

class Mysql{
    private $host;
    private $root;
    private $pass;
    private $db;
    private $conn;

    function __construct(){
        $this->host = 'localhost';
        $this->root = 'root';
        $this->pass = 'admin';
        $this->db = 'book_system';
        $this->connect();
    }

    function connect(){
        $this->conn = new mysqli($this->host,$this->root,$this->pass,$this->db);
        mysqli_query($this->conn , "set names utf8");
        if ($this->conn->connect_errno){
            die ('连接数据库失败' . $this->conn->connect_errno);
        }
    }

    function Close(){
        $this->conn->close();
    }

    function query($sql){
        return $this->conn->query($sql);
    }

    function AllArray($result){
        $list = [];
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $row['created_at'] = date("Y-m-d H:i:s",$row['created_at']);
            $row['updated_at'] = date("Y-m-d H:i:s",$row['updated_at']);
            $list[] = $row;
        }
        return $list;
    }

    function insert($data){
        return $this->conn->insert($data);
    }

    function unicode2utf8($str){
        if(!$str) return $str;
        $decode = json_decode($str);
        if($decode) return $decode;
        $str = '["' . $str . '"]';
        $decode = json_decode($str);
        if(count($decode) == 1){
            return $decode[0];
        }
        return $str;
    }


}
