
// 输出控制台

var log = console.log.bind(console);

var error = "被除数不能为0！";  // 错误文本

// 字典 用于公式中替换运算符 如 × => *

var symbls = {
    "+" : "+",
    "-" : "-",
    "×" : "*",
    "÷" : "/",
    "%" : "%",
};

// 获得所有按钮的父元素 用于 为所有按钮以事件委托方式绑定事件

var table = document.getElementById('table');

// 显示文本框 是一个类数组集合

var input = document.getElementsByClassName('input');

// 当前显示的文本

var str = "0";

// 是一个数组 用户保存输入

var result = [str];

// 为父元素绑定点击事件 click

table.addEventListener('click',function(e){  // 在回调函数中函数e参数 得到事件对象

    var target = e.target;  // 获得触发事件的元素

    // 判断目标元素是否 为 “ td ” 不是则返回（即退出函数，不再执行下面的代码）
    if (target.nodeName !== "TD") return;

    var text = target.innerHTML; // 得到目标元素的文本值
    // 判断值

    if (isSymbol(text)){
        symbl(text);
    }
    if (parseInt(text) >= 0 && parseInt(text) <= 9){
        num(text);
    }

    switch(text){
        case "←":
             back(); // 退格
             break;  // 跳出循环
        case "AC":
            clear(); // 清空
            break;
        case ".":    // 小数点
            dot();
            break;
        case "=":  // 等于符号
            calc();
            break;
    }

});

// 添加键盘按键功能

window.addEventListener('keydown',function(e){
    var key = Math.abs( 96 - e.keyCode );
    if (key >= 0 && key <= 9){
      num(""+key);
    }
    switch (""+e.keyCode) {
      case "106":
        symbl("×");
        break;
      case "107":
        symbl("+");
        break;
      case "109":
        symbl("-");
        break;
      case "111":
        symbl("÷");
        break;
      case "50":
        symbl("%");
        break;
      case "110":  // 小数点
      case "190":
        dot();
        break;
      case "8":
        back();
        break;
      case "27":
        clear();
        break;
      case "13":
        calc();
        break;
    }
});

 // 数字

function num(n){

    testSymbol();

    str = str === "0" ? n : str + n;

    result[result.length-1] = str;

    updateText(result.join(""));
}

function symbl(sym){

    var s = getLast(result);

    if (s[s.length-1] === ".") return;

    if (isSymbol(s[s.length-1])){
        result.pop();
    }

    result[result.length] = sym;

    str = "";

    updateText(result.join(""));
}

// 清空

function clear(){

    str = "0";
    result = [str];
    updateText("0",0);
    updateText("",1);
}

// 小数点

function dot(){
    testSymbol();
    var s = result[result.length-1];
    if (s.indexOf(".") !== -1) return;
    if (s === "") str = "0";
    str += ".";
    result[result.length-1] = str;
    updateText(result.join(""));
}

function back(){
    if (result[0] === error){
        result[0] = "";
    }
    var last = result[result.length-1];
    var s = last.substr(0,last.length-1);
    str = s;
    if (s === ""){
        if (result.length > 1){
            result.pop();
        }else{
            s = "0";
            str = s;
            result = [str];
            updateText("",1);
        }
    }else{
        result[result.length-1] = str;
    }
    updateText(result.join(""));
}

function formatSymbl(array){
    var arr = array.concat();
    arr.forEach(function(el,index){
        if (el.length !== 1) return;
        for (var k in symbls){
            if (el === k){
                arr[index] = symbls[k];
            }
        }
    });
    return arr;
}

function calc(){
    result = formatSymbl(result);
    if (result[0] === error){
        result[0] = "";
    }
    if (result[result.length-1] === "0" && result[result.length-2] === "/"){
        result = [error];
        updateText(error);
        return;
    }
    if (result[result.length-1] === "") result[result.length-1]="0";
    var s = result.join("");
    str = "" + eval(s);
    result = [str];
    updateText(str,1);
}

// 更新显示函数
// str = 将要显示的文本
// index = 第几个文本框

function updateText(str,index){
    index = index || 0;
    input[index].value = str;
}

// 获得数组最后一个 如果最后一个是空 返回倒数第二个

function getLast(arr){
    var len = arr.length;
    return arr[len-1] === "" ?
        arr[len-2] :
        arr[len-1];
}

function testSymbol(){
    var last = result[result.length-1];
    if (isSymbol(last)){
        result[result.length] = "";
    }
}

function isSymbol(t){
    for (var k in symbls){
        if (t === k) return true;
    }
    return false;
}
