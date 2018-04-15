function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    if(window.screen.width >= 1200){
        flag = true;
    }
    return flag;
}
if(!isPC()){
    window.location.href = "http://m.yiyunwangl.com/yiyunm/index.html";
}


