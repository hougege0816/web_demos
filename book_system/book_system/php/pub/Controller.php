<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/21
 * Time: 12:39
 */
class Controller{
    private $mysql;
    function __construct(){
        session_start();
        require('mysql.php');
        $this->mysql = new Mysql();
    }

    public function isAjax(){
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
            return true;
        }else{
            return false;
        }
    }

    public function isLogin($table){

        if (!isset($_SESSION['user'])){
            header("location: login.php");
            exit;
        }



        $userName = $_SESSION['user']['user_name'];
        $userPassword = $_SESSION['user']['password'];


        $sql = "select * from {$table} where user_name ='$userName' and password = '$userPassword'";
        $result = $this->mysql->query($sql);
        $num = $result->num_rows;
        if (!$num){
            header("location: login.php");
            exit;
        }
    }

    public function login($table){
        $user_name = $_POST['user_name'];
        $password = md5($_POST['user_password']);
        
      
        $sql = "select * from {$table} where user_name ='$user_name' and password = '$password'";
        $result = $this->mysql->query($sql);
        $num = $result->num_rows;
        $user = $this->mysql->AllArray($result);
        if ($num){
            $_SESSION['user'] = $user[0];
            echo json_encode([
                'success'=>'success'
            ]);
        }else{
            echo json_encode([
                'success'=>'用户名或密码不正确！'
            ]);
        }

    }

    public function unicode2utf8($str){
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

    public function sql($sql){
        return $this->mysql->query($sql);
    }

    public function get($sql){
        return $this->mysql->AllArray($this->mysql->query($sql));
    }

    public function add($sql){
        return $this->sql($sql);
    }

    public function remove($table){
        $aId = $_POST['aId'];
        $count = 0;
        foreach($aId as $id){
            $sql = "delete from {$table} where id='{$id}'";
            if ($this->sql($sql)) $count++;
            $arr[] = $id;
        }
        return $count;
    }

    public function update($sql){
        return $this->sql($sql);
    }

    public function resetPassword($table){
        $id = $_SESSION['user']['id'];
        $old_password = $this->unicode2utf8($_POST['user']['old_password']);
        $password = md5($this->unicode2utf8($_POST['user']['password']));
        $user = $this->get("select * from {$table} where id ='$id'");
        if (md5($old_password) !== $user[0]['password']){
            echo json_encode([
                'success'=>false,
                'content'=>'旧密码不正确！'
            ]);
            exit();
        }
        $sql = "update {$table} set password = '$password'";
        if ($this->sql($sql)){
            $result=[
                'success'=>true,
                'content'=>'重置成功！'
            ];
        }else{
            $result=[
                'success'=>false,
                'content'=>'重置失败！'
            ];
        }
        return $result;
    }

    public function personalGetInfo($table){
        $user_id = $_SESSION['user']['id'];
        $user = $this->get("select * from {$table} where id = '$user_id'");
        if ($user[0]['password'] !== $_SESSION['user']['password']){
            $result = [
                'user'=>'error'
            ];
        }else{
            $result = [
                'user'=>$user
            ];
        }

        return $result;
    }

    public function personalUpdateInfo($table){
        $id = $_SESSION['user']['id'];
        $name = $this->unicode2utf8($_POST['user']['name']);
        $user_name = $this->unicode2utf8($_POST['user']['user_name']);
        $age = $this->unicode2utf8($_POST['user']['age']);
        $sex = $this->unicode2utf8($_POST['user']['sex']);
        $phone = $this->unicode2utf8($_POST['user']['phone']);
        $email = $this->unicode2utf8($_POST['user']['email']);
        $updated_at = time();
        if ($table === 'user'){
            $receiving_address = $this->unicode2utf8($_POST['user']['receiving_address']);
            $sql = "update {$table} set name = '$name',user_name = '$user_name',sex='$sex',age='$age',
                    phone='$phone',email='$email',receiving_address='$receiving_address' ,updated_at='$updated_at' where id='$id'";
        }else{
            $sql = $sql = "update {$table} set name = '$name',user_name = '$user_name',sex='$sex',age='$age',
                    phone='$phone',email='$email',updated_at='$updated_at' where id='$id'";
        }
        if ($this->sql($sql)){
            $result = [
                "result" => true,
                "content" => '更新成功'
            ];
            $user = $this->get("select * from {$table} where id ={$id}");
            $_SESSION['user'] = $user[0];
        }else{
            $result = [
                "result" => false,
                "content" => '更新失败'
            ];
        }
        return $result;
    }

    public function shutdown(){
        unset($_SESSION['user']);
    }


}