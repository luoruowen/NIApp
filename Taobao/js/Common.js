
/**
 * 获取html的url参数
 */
function getHtmlParameter(parameter){
    var urlStr=window.location.href;
    var returnStr="";
    //字符串截取
    if(urlStr.indexOf("?")>=0 && urlStr.indexOf(parameter)>=0){
        if(urlStr.length>urlStr.indexOf(parameter+"=")+parameter.length+1){
            var p1=urlStr.substring(urlStr.indexOf(parameter+"=")+parameter.length+1,urlStr.length);
            if(p1.length>0){
                if(p1.indexOf("&")>=0){
                    p1=p1.substring(0,p1.indexOf("&"));
                }
                if(p1.length>0){
                    returnStr=p1;
                }
            }
        }
    }
    return returnStr;
}

/**
 * 获取文本的第一张图片 uediter
 * @param textInfo  文本内容
 * @returns
 */
function getTextFirstImg(textInfo){
    var imgReg = /<img.*?(?:>|\/>)/gi;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = textInfo.match(imgReg);
    if (arr != null) {
        var arrImgSrc = new Array();
        for (var i = 0; i < arr.length; i++) {
            var src = arr[i].match(srcReg);
            if (src[1]) {
                arrImgSrc.push(src[1]);
            }
        }
        if (arrImgSrc.length > 0) {
            return arrImgSrc[0];
        } else {
            return "";
        }
    } else {
        return "";
    }
}

/**
 * 显示加载框
 */
var spinner;// 加载框
function showLoading() {
    if ($("#preview").length) {

    } else {
        $("body").prepend("<section id=\"preview\"></section>");
    }
    spinner = new Spinner().spin(document.getElementById('preview'));
    $("#preview").width($(".contentbox").width());
    //$("#preview").height($("body").height());
    $("#preview").show();
}

/**
 * 隐藏加载框
 */
function hideLoading() {
    if (spinner) {
        spinner.stop();
    }
    if ($("#preview").length) {
        $("#preview").hide();
    }
}

function NILog(msg){
    console.log(msg);
}

/**
 * 根据id控制div的显示和隐藏
 * @param id
 * @param dStr:  block | none
 */
function div_display(id,dStr) {
    document.getElementById(id).style.display = dStr;
}

/**
 * 历史返回
 */
function goBack(){
	window.history.back();
}

/**
 * 跳转url
 * @param url
 */
function toHref(url) {
    window.location.href = "" + url;
}

/**
 * 异步请求,没有返回结果
 * @param url
 */
function asynUrl(url,data,fun){
    loadingStar();
	if(data==null){
		data={};
	}
	$.ajax({
        type: "post",
        url: url,
        dataType : 'json',
        contentType : 'application/json',
        data: JSON.stringify(data),
        //data: data,
        error: function (e) {
            loadingStop();
            if(e && e.status && e.status==401){
                log0ut();
            }
        	if(fun){
        		fun();
        	}
        },
        success: function (data) {
            loadingStop();
            //NILog(data);
        	if(fun){
        		fun(data);
        	}
        }
    });
}

/**
 * 异步请求,没有返回结果
 * @param url
 */
function asynUrl_get(url,data,fun){
    loadingStar();
    if(data==null){
        data={};
    }
    $.ajax({
        type: "get",
        url: url,
        dataType : 'json',
        data: data,
        error: function (e) {
            loadingStop();
            if(e && e.status && e.status==401){
                log0ut();
            }
            if(fun){
                fun();
            }
        },
        success: function (data) {
            loadingStop();
            //NILog(data);
            if(fun){
                fun(data);
            }
        }
    });
}

/**
 * 异步请求,没有返回结果
 * @param url
 */
function asynUrl_data(url,data,fun){
    loadingStar();
    $.ajax({
        type: "post",
        url: url,
        data: data,
        error: function (e) {
            loadingStop();
            if(e && e.status && e.status==401){
                log0ut();
            }
            if(fun){
                fun();
            }
        },
        success: function (data) {
            loadingStop();
            //NILog(data);
            if(fun){
                fun(data);
            }
        }
    });
}

/**
 * 确认弹窗
 * @param msg
 * @param fun
 */
function NI_Confirm(msg,fun){
	if (window.confirm(msg) == 1) {
        if(fun){
        	fun();
        }
    }
}

/**
 * 弹窗提示
 * @param msg
 * @param fun
 */
function NI_Alert(msg,fun){
	alert(msg);
	if(fun){
    	fun();
    }
}


/**
 * 确认框
 * @param msg 提示消息
 * @returns 返回 确定/取消
 */
function NIConfirm(msg) {
    if (window.confirm(msg) == 1) {
        return true;
    } else {
        return false;
    }
}

/**
 * 确认框是否跳转,是就跳转
 * @param msg 提示消息
 * @param url 请求url
 * @param func 执行成功后方法
 */
function NIConfirmToUrl(msg,url,func){
	if(NLConfirm(msg)){
		$.ajax({
	        type: "post",
	        url: url,
	        data: {},
	        dataType: 'json',
	        error: function () {
	        	alert("操作失败!");
	        },
	        success: function (data) {
	        	if(data && data.data){
	        		alert(data.data);
	        	}
	            if (null == data || null == data.success || false == data.success) {
	            	console.log("操作失败!");
	            }else{
	            	//{"data":"禁用成功","success":true}
	            	if(func){
	            		func();
	            	}
	            }
	        }
	    });
	}
}

/**
 * 空字符串转换
 * @param contentStr 需要转换的字符串
 * @param defaultStr 如果是空就转换成defaultStr 没有就默认为""
 * @returns
 */
function NINVL(contentStr,defaultStr) {
	content=contentStr+"";
	if (null == content || "" == content || "" == $.trim(content) || "请选择" == content
	        || "undefined" == content || "null" == content || undefined == content || "NULL" == content) {
    	if(defaultStr){
    		return defaultStr;
    	}else{
    		return "";
    	}
    } else {
        return contentStr;
    }
}



/**
 * 字符串去空格
 */
String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
/**
 * 去掉左边空格
 */
String.prototype.LTrim = function () {
    return this.replace(/(^\s*)/g, "");
};
/**
 * 去掉右边空格
 */
String.prototype.RTrim = function () {
    return this.replace(/(\s*$)/g, "");
};

/**
 * 清空文本框中的内容
 * @param Id
 */
function ClearTxt(Id) {
    document.getElementById(id).value = "";
}
function ClearTxt(HidId, TxtId) {
    document.getElementById(HidId).value = "";
    document.getElementById(TxtId).value = "";
}

//设置层得显示隐藏
//显示
function NIShowVisible(Id) {
    document.getElementById(Id).style.display == "block";
}
//隐藏
function NIHidVisible(Id) {
    document.getElementById(Id).style.display = 'none';
}
//自动判断是显示还是隐藏
function NIAutoVisible(objId) {
    if (document.getElementById(Id).style.display == "none") {
        document.getElementById(Id).style.display = 'block';
    }
    else {
        document.getElementById(Id).style.display = 'none';
    }
}

//日期相关
/**
 * 验证两个日期的大小(开始时间,结束时间)
 * startdate<=enddate true
 * 
 */
function DateCompare(startdate, enddate) {
    if (startdate.length > 0 && enddate.length > 0) {
        var startDateTemp = startdate.split(" ");
        var endDateTemp = enddate.split(" ");
        var arrStartDate = startDateTemp[0].split("-");
        var arrEndDate = endDateTemp[0].split("-");
        var arrStartTime = startDateTemp[1].split(":");
        var arrEndTime = endDateTemp[1].split(":");
        var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);
        var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);
        if (allStartDate.getTime() <= allEndDate.getTime()) {
            return true;
        }
    }
    return false;

}      

/**
 * 获得昨日、今日、明日的日期等   
 * @param AddDayCount 增加或减少的天数
 * @returns {String}
 */
function GetDateStr(AddDayCount) {
    var Nowdate = new Date();
    Nowdate.setDate(Nowdate.getDate() + AddDayCount); //获取AddDayCount天后的日期
    M = Number(Nowdate.getMonth()) + 1; //获取当前月份的日期
    return Nowdate.getFullYear() + "-" + M + "-" + Nowdate.getDate() + " " + Nowdate.getHours() + ":" + Nowdate.getMinutes() + ":" + Nowdate.getSeconds();
}

/**
 * 获得中文标题的日期
 * @param date 增加或减少的天数xxxx/xx
 * @returns xxxx年xx月
 */
function treatDateToTitleStr(dateStr) {
    var dateArray = dateStr.split("/");
    return dateArray[0] + "年" + dateArray[1] + "月";
}

/**
 * 要select某个value值被选中
 * @param documentId
 * @param selectValue
 */
function selected_value(documentId,selectValue) {
    var dom = document.getElementById(documentId);
    for (var i = 0; i < dom.options.length; i++) {
        if (selectValue == dom.options[i].value) {
            dom.options[i].selected = true;
            return;
        }
    }
}

/**
 * 要select某个text值被选中
 * @param documentId
 * @param selectText
 */
function selected_text(documentId, selectText) {
    var dom = document.getElementById(documentId);
    for (var i = 0; i < dom.options.length; i++) {
        if (selectText == dom.options[i].text) {
            dom.options[i].selected = true;
            return;
        }
    }

}

/**
 * 根据单选按钮的value值进行选择
 * @param documentName
 * @param radioValue
 */
function checked_radio(documentName, radioValue) {
    var dom = document.getElementsByName(documentName);
    for (var i = 0; i < dom.length; i++) {
        if (dom[i].value == radioValue) {
            dom[i].checked = true;
            break;
        }
    }
}

function checked_radio2(documentName, radioValue) {
	var dom = document.getElementsByName(documentName);
    for (var i = 0; i < dom.length; i++) {
        if (dom[i].value == radioValue) {
            dom[i].checked = true;
            if(dom[i].parentNode){
            	//dom[i].parentNode.className += ' checked';
            	$(dom[i].parentNode).addClass("checked");
            }
        }else{
        	dom[i].checked = false;
        	$(dom[i].parentNode).removeClass("checked");
        }
    }
    
}

/**
 * 时间对象的格式化
 */
Date.prototype.format = function(format)
{
    /*
     * format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+" : this.getMonth() + 1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth() + 3) / 3),
        "S" : this.getMilliseconds()
    };
    
    if (/(y+)/.test(format))
    {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
                                                                            - RegExp.$1.length));
    }
    
    for (var k in o)
    {
        if (new RegExp("(" + k + ")").test(format))
        {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                    ? o[k]
                                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

/**
 * 返回需要格式的时间   (时间,相距时间多少秒,时间显示格式)
 * @param time
 * @param second
 * @param dateFormatStr
 * @returns
 */
function getDateWithDF(time,second,dateFormatStr){
    var t = time.valueOf();
    t = t + second*1000;
    t = new Date(t);
    var returnTime=t.format(dateFormatStr);
    return returnTime;
}

/**
 * window.open方式打开窗口  屏幕自动居中
 * @param url  windows的url
 * @param name	窗口名字标识
 * @param win_width	窗口宽度,没给就默认屏幕的90%
 * @param win_height 窗口高度,没给就默认屏幕的90%
 */
function openWindows(url,name,win_width,win_height){
	var $windowWidth = $(window.parent).width();
	var $windowHeight = $(window.parent).height();
	var winWidth=$windowWidth*0.9;
	if(win_width){
		winWidth=win_width;
	}
	var winHeight=$windowHeight*0.9;
	if(win_height){
		winHeight=win_height;
	}
	window.open(url,name,'width='+winWidth+',height='+winHeight+',location=no,top='+($windowHeight-winHeight)/2+',left='+($windowWidth-winWidth)/2+',resizable=no');
}

/**
 * 验证中文
 * @param Str
 * @returns {Boolean}
 */
function checkChina(Str){ 
	if(/.*[\u4e00-\u9fa5]+.*$/.test(Str)) { 
		alert("不能含有汉字！"); 
		return false; 
	} 
	return true; 
}

/**
 * 过滤特殊字符
 * @param value
 * @returns {String}
 */
function checkSpecial(value) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\"\\\\]");
    var rs = "";   
    for (var i = 0; i < value.length; i++) {
        rs = rs+value.substr(i, 1).replace(pattern, '');   
    }   
    return rs;  
}  

/**
 * 字符串过长省略
 * @param str
 * @param subLength   长度多少的时候用...代替, 默认10
 * @returns {String}
 */
function str_ellipsis(str,subLength){
	var s = str;//要展示的字符串
	var l=10;
	if(subLength){
		l=subLength;
	}
	if(str.length>l){
	  s=str.substring(0,l)+"...";
	}
	return s;
}

//刷新
function replaceFun(){
	location.replace(location.href);
}

//发送消息给用户
function sendMsgtoUser(title,content,toUser,fun){
	var jsonMap={
			"messagelog.title":title,
			"messagelog.typeinfoconfByType.id":503,
			"messagelog.content":content,
			"messagelog.userinfo.id":toUser
	};
	asynUrl('SyssettingAct_sendMsgtoUser.action',jsonMap,function(){
		if(fun){
			fun();
		}
	});
}

/**
* 将秒数换成时分秒格式
*/  
function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(theTime1 > 60) {
        	theTime2 = parseInt(theTime1/60);
        	theTime1 = parseInt(theTime1%60);
        }
    }
    
    //秒
    var result = "";
    if(theTime>9){
    	result = ""+parseInt(theTime)+"";
    }else if(theTime>0){
    	result = "0"+parseInt(theTime)+"";
    }else{
    	result = "00";
    }
    
    //分
    if(theTime1 > 9) {
    	result = ""+parseInt(theTime1)+":"+result;
    }else if(theTime1>0){
    	result = "0"+parseInt(theTime1)+":"+result;
    }else{
    	result = "00:"+result;
    }
    
    //时
    if(theTime2 >9) {
    	result = ""+parseInt(theTime2)+":"+result;
    }else if(theTime2>0){
    	result = "0"+parseInt(theTime2)+":"+result;
    }else{
    	result = "00:"+result;
    }
    
    return result;
}

/**
 * 获取图片的base64字符串
 * @param img     img标签对象 document.getElementById("pageAddA_alipayQRCode")
 * @returns
 */
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL // return dataURL.replace("data:image/png;base64,", ""); 
}

String.prototype.colorHex = function(){
    var that = this;
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是rgb颜色表示
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i=0; i<aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex === "0") {
                hex += hex;    
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;    
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/,"").split("");
        if (aNum.length === 6) {
            return that;    
        } else if(aNum.length === 3) {
            var numHex = "#";
            for (var i=0; i<aNum.length; i+=1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    }
    return that;
};

function changeColorRgb(color){
    var grb=color.colorRgb();
    return "rgb("+grb+")";
}

String.prototype.colorRgb = function(){
    var sColor = this.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
        }
        return "" + sColorChange.join(",") + "";
    }
    return sColor;
};

/**
 * 安卓调用的时候会直接进入并调用该方法
 * ios8以前 会在进入该方法前被拦截掉
 * @param command       请求命令
 * @param parameter     请求参数
 * @param returnJsFun   返回的回调方法,用于http请求回调数据 returnJsFun(data)
 */
function jsCallFun(command,parameter,returnJsFun){
    if(window!=null){
        var isAndroidOrIos=false;
        if(window.jsObj!=null){
            isAndroidOrIos=true;
            //js调用安卓方法
            return window.jsObj.jsCallFun(command,parameter,returnJsFun);
        }else if(window.webkit!=null){
            //js调用ios方法 ios8以后使用WKWebView
            if(window.webkit.messageHandlers!=null){
                if(window.webkit.messageHandlers.jsCallFun!=null){
                    if(window.webkit.messageHandlers.jsCallFun.postMessage!=null){
                        isAndroidOrIos=true;
                        var dataList=new Array(command,parameter,returnJsFun)
                        window.webkit.messageHandlers.jsCallFun.postMessage(dataList);
                    }
                }
            }
        }
        if(isAndroidOrIos==false){
            //网页模拟的时候
        }
    }
}

/**
 * 接口通用方法
 * @param interfaceId
 * @param jsonStr
 * @param fun
 */
function InterfaceAct_fun(interfaceId,jsonStr,fun,isShowMsg){
    $.ajax({
        type: "post",
        url: "InterfaceAct_fun.action",
        data: {
            "keyCode":sessionStorage.keyCode,
            "loginName":sessionStorage.loginName,
            "interfaceId":interfaceId,
            "jsonStr":JSON.stringify(jsonStr)
        },
        dataType: 'json',
        error: function () {
            console.log("加载失败!");
            if(isShowMsg!=false){
                layer.msg("加载失败!",{icon:2,time:1000,shade:[0.1,'#fff']});
            }
            setTimeout(function () {
                if($.hideIndicator){
                    $.hideIndicator();
                }
            }, 100);
        },
        success: function (data) {
            data=JSON.parse(data.resultData);
            if (null == data || null == data.result || -1 == data.result) {
                if(isShowMsg!=false){
                    layer.msg(data.msg,{icon:2,time:1000,shade:[0.1,'#fff']});
                }
            }else{
                if(isShowMsg!=false){
                    layer.msg(data.msg,{icon:6,time:1000,shade:[0.1,'#fff']});
                }
                if(fun){
                    window.setTimeout(fun(data),1000);
                }
            }
        }
    });
    setTimeout(function () {
        if($.hideIndicator){
            $.hideIndicator();
        }
    }, 10000);
}


//对象拷贝  node=$.extend(node, nodeObj);
jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        // 使用||运算符，排除隐式强制类型转换为false的数据类型
        // 如'', 0, undefined, null, false等
        // 如果target为以上的值，则设置target = {}
        i = 1,
        length = arguments.length,
        deep = false;

    // 当typeof target === 'boolean'时
    // 则将deep设置为target的值
    // 然后将target移动到第二个参数，
    if (typeof target === "boolean") {
        deep = target;
        // 使用||运算符，排除隐式强制类型转换为false的数据类型
        // 如'', 0, undefined, null, false等
        // 如果target为以上的值，则设置target = {}
        target = arguments[i] || {};
        i++;
    }

    // 如果target不是一个对象或数组或函数，
    // 则设置target = {}
    // 这里与Object.assign的处理方法不同，
    // assign方法会将Boolean、String、Number方法转换为对应的基本包装类型
    // 然后再返回，
    // 而extend方法直接将typeof不为object或function的数据类型
    // 全部转换为一个空对象
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
    }

    // 如果arguments.length === 1 或
    // typeof arguments[0] === 'boolean', 且存在arguments[1]，
    // 这时候目标对象会指向this
    // this的指向哪个对象需要看是使用$.fn.extend还是$.extend
    if (i === length) {
        target = this;
        // i-- 表示不进入for循环
        i--;
    }

    // 循环arguments类数组对象，从源对象开始
    for (; i < length; i++) {
        // 针对下面if判断
        // 有一点需要注意的是
        // 这里有一个隐式强制类型转换 undefined == null 为 true
        // 而undefined === null 为 false
        // 所以如果源对象中数据类型为Undefined或Null
        // 那么就会跳过本次循环，接着循环下一个源对象
        if ((options = arguments[i]) != null) {
            // 遍历所有[[emuerable]] === true的源对象
            // 包括Object, Array, String
            // 如果遇到源对象的数据类型为Boolean, Number
            // for in循环会被跳过，不执行for in循环
            for (name in options) {
                // src用于判断target对象是否存在name属性
                src = target[name];

                // 需要复制的属性
                // 当前源对象的name属性
                copy = options[name];

                // 这种情况暂时未遇到..
                // 按照我的理解，
                // 即使copy是同target是一样的对象
                // 两个对象也不可能相等的..
                if (target === copy) {
                    continue;
                }

                // if判断主要用途：
                // 如果是深复制且copy是一个对象或数组
                // 则需要递归jQuery.extend(),
                // 直到copy成为一个基本数据类型为止
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    // 深复制
                    if (copyIsArray) {
                        // 如果是copy是一个数组
                        // 将copyIsArray重置为默认值
                        copyIsArray = false;
                        // 如果目标对象存在name属性且是一个数组
                        // 则使用目标对象的name属性，否则重新创建一个数组，用于复制
                        clone = src && jQuery.isArray(src) ? src : [];

                    } else {
                        // 如果目标对象存在name属性且是一个对象
                        // 则使用目标对象的name属性，否则重新创建一个对象，用于复制
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // 因为深复制，所以递归调用jQuery.extend方法
                    // 返回值为target对象，即clone对象
                    // copy是一个源对象
                    target[name] = jQuery.extend(deep, clone, copy);

                } else if (copy !== undefined) {
                    // 浅复制
                    // 如果copy不是一个对象或数组
                    // 那么执行elseif分支
                    // 在elseif判断中如果copy是一个对象或数组，
                    // 但是都为空的话，排除这种情况
                    // 因为获取空对象的属性会返回undefined
                    target[name] = copy;
                }
            }
        }
    }

    // 当源对象全部循环完毕之后，返回目标对象
    return target;
};

//重新设置select标签, mobiscroll 控件实现
function resetSelect(selectID){
    if($('#'+selectID+'_moni')!=null){
        $('#'+selectID+'_moni').remove();
    }
    if($('#'+selectID+'_dummy')!=null){
        $('#'+selectID+'_dummy').remove();
        $('#'+selectID).removeClass("mbsc-comp mbsc-sel-hdn");
        $('#'+selectID).removeAttr("tabindex");
    }
    $('#'+selectID).mobiscroll().select({
        theme: 'android-holo-light',
        display: 'center',
        inputClass: 'mobiscroll_select mbsc-comp ',
        //设置为false，则点击空白地方不会关闭弹出层，默认为true
        closeOnOverlay:false,
        lang: 'zh'
    });
}

//设置时间输入框  yyyy/mm 或者  yyyy/mm/dd
//初始化配置参数 //www.jq22.com/demo/mobiscroll20161123/demo1/index.html
function resetTimeInput(inputId,defaultTime,dateFormatStr){

    if($('#'+inputId)!=null){
        $('#'+inputId).removeClass("mbsc-comp");
        $('#'+inputId).removeAttr("readonly");
    }

    $('#'+inputId).val(defaultTime);
    if(dateFormatStr=="yyyy/mm/dd"){

        $('#'+inputId).mobiscroll().date({
            theme: 'android-holo-light',    //日期选择器使用的主题
            dateOrder: 'yyyymmdd', //面板中日期排列格
            dateFormat: 'yy/mm/dd', // 日期格式
            startYear: 2000,
            endYear: (new Date()).getFullYear()+1,
            defaultValue:(new Date(defaultTime)),
            lang: 'zh',           //使用语言
            display: 'center'     //显示方式
        });
    }else{
        $('#'+inputId).mobiscroll().date({
            theme: 'android-holo-light',    //日期选择器使用的主题
            dateOrder: 'yyyymm', //面板中日期排列格
            dateFormat: 'yy/mm', // 日期格式
            startYear: 2000,
            endYear: (new Date()).getFullYear()+1,
            defaultValue:(new Date(defaultTime+'/01')),
            lang: 'zh',           //使用语言
            display: 'center'     //显示方式
        });
    }

    $('#'+inputId).val(defaultTime);
}

//改变这个id的对象的html为thisObj的值
function changeValue_setHtml(thisObj,setObjId){
    $("#"+setObjId).html($(thisObj).val());
}
//改变这个id的对象的值为thisObj的值
function changeValue_setVal(thisObj,setObjId){
    $("#"+setObjId).val($(thisObj).val());
}

//刷新echarts
function refreshEcharts(domId,option){
    var dom=document.getElementById(domId);
    var myChart;
    if(dom){
        myChart = echarts.init(dom,'macarons');
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }else{
            myChart.clear();
        }
    }
    return myChart;
}

//清理输入框的值
function clearInputText(inputId){
    $("#"+inputId).val("");
}

//ui li标签的点击,设置active
function active_ul_li(liObj){
    $(liObj).parent().find(".active").removeClass('active');
    $(liObj).addClass('active');
}

/**
 * 将yyyy/mm转成 yyyy年mm月  或 yyyymm
 * @param dataStr
 * @param dateFormatStr
 */
function yearMonthtoDF(dataStr,dateFormatStr){
    if("yyyy年mm月"==dateFormatStr){
        dataStr=dataStr.replace(/\//g, "年");
        dataStr+="月";
    }else{
        dataStr=dataStr.replace(/\//g, "");
    }
    return dataStr;
}

/**
* 保留数字的后两位
* @param dataStr
* @param dateFormatStr
*/
function returnFloat(value){
    var value=Math.round(parseFloat(value)*100)/100;
    var xsd=value.toString().split(".");
    if(xsd.length==1){
        value=value.toString()+".00";
        return value;
    }
    if(xsd.length>1){
        if(xsd[1].length<2){
            value=value.toString()+"0";
        }
        return value;
    }
}