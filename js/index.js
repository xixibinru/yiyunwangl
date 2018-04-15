$(function () {
    /*<顶部导航栏区域>*/
    //头部通栏固定定位+渐变
    var top = 36;
    var $nav = $('#header .nav');
    var navHeight = $nav.height();
    var headerHeight = $('#header').height();
    var $header = $('#header');

    function fixed() {
        var scrollTop = $(window).scrollTop();
        // 如果滚动距离大于36 则固定定位 并渐变颜色
        if (scrollTop >= top) {
            $nav.addClass('fixed');
            $header.css('padding-top', top + navHeight + 'px').height(headerHeight - navHeight);
            var opacity = 0.85 / (160 + top + navHeight) * scrollTop;
            opacity = opacity < 0.85 ? opacity : 0.85;
            $nav.css('background-color', 'rgba(0,0,0,' + opacity + ')');
        } else {
            $nav.removeClass('fixed').css('background-color', 'rgba(0,0,0,0');
            $header.css('padding-top', top + 'px').height(headerHeight);
        }
        // 滚动到相应位置  导航栏下面的li显示蓝条

        if (scrollTop >= navArr[4] - 100) {
            $('#header .nav li').eq(4).addClass('current').siblings().removeClass('current');
        } else if (scrollTop >= navArr[3]) {
            $('#header .nav li').eq(3).addClass('current').siblings().removeClass('current');
        } else if (scrollTop >= navArr[2]) {
            $('#header .nav li').eq(2).addClass('current').siblings().removeClass('current');
        } else if (scrollTop >= navArr[1]) {
            $('#header .nav li').eq(1).addClass('current').siblings().removeClass('current');
        } else if (scrollTop >= navArr[0]) {
            $('#header .nav li').eq(0).addClass('current').siblings().removeClass('current');
        }
    }


    // 拿到对应的高
    var arr = [0, $('#header')[0].offsetHeight, $('#company')[0].offsetHeight, $('#FAQ')[0].offsetHeight, $('#feature')[0].offsetHeight];
    // 拿到应该跳转的高
    function getArr(arr) {
        var newArr = [];
        var i = 0, len = arr.length;
        for (; i < len; i++) {
            var sum = 0;
            for (var j = 0; j <= i; j++) {
                sum += arr[j];
            }
            if (i !== 0) {
                sum -= navHeight; //减去导航栏的高
            }
            newArr.push(sum);
        }
        return newArr;
    }

    var navArr = getArr(arr);
    // 点击跳转到指定位置
    $('#header ul').on('click', 'li', function () {
        $('html,body').stop().animate({'scrollTop': navArr[$(this).index()]});
    });
    $('#header .move').on('click',function () {
        $('html,body').stop().animate({'scrollTop': navArr[3]});
    });
    // 点击导航栏滚动到指定位置
    fixed();
    $(window).on('scroll', function () {
        fixed();
    });

    /*</顶部导航栏区域>*/

    /*<轮播图>*/
    //轮播图添加背景图标

    $('#FAQ li i').each(function (i, e) {
        $(e).css('background', 'url(images/icon_list.png) 0px ' + (-i * 60) + 'PX');
        $(e).attr('index', i);
    });


    var $lis = $('#FAQ .show li');
    var marginWidth = $lis[0].offsetWidth + 4;
    $lis.each(function (i, e) {
        $(e).css('margin-left', i * marginWidth + 'px');

    });

    $lis.each(function (i, e) {
        $(e).attr('num', i);
        current(e);
    });
    function current(e) {
        if ($(e).attr('num') >= 0 && $(e).attr('num') <= 3) {
            $(e).addClass('current');
        } else {
            $(e).removeClass('current');
        }
    }

    //6张轮播图 全部播放完才执行
    var flag = 6;
    // 轮播图向左滑动一次
    function goRight() {
        if (flag === 6) {
            $lis.each(function (i, e) {
                flag = 0;
                if ($(e).attr('num') < 0) {
                    $(e).attr('num', 5);
                    $(e).css('margin-left', 5 * marginWidth + 'px');
                }
                $(e).attr('num', $(e).attr('num') - 1);
                current(e);
                $(e).stop().animate({'margin-left': $(e).attr('num') * marginWidth + 'px'}, 500, function () {
                    flag += 1;
                });
            });

        }
    }

    // 轮播图向右滑动一次
    function goLeft() {
        if (flag === 6) {
            $lis.each(function (i, e) {
                flag = 0;
                if ($(e).attr('num') > 4) {
                    $(e).attr('num', -1);
                    $(e).css('margin-left', -1 * marginWidth + 'px');
                }
                $(e).attr('num', +$(e).attr('num') + 1);
                current(e);
                $(e).stop().animate({'margin-left': $(e).attr('num') * marginWidth + 'px'}, 500, function () {
                    flag += 1;
                });
            });
        }
    }
 //开启定时器并绑定事件
    var timer = null, time = 3000;
    timer = setInterval(goRight, time);
    var $left = $('#FAQ .slider .go-left');
    var $right = $('#FAQ .slider .go-right');
    $('#FAQ .slider ul').on('mouseenter', 'li', function () {
        $(this).children('a').children('i').css('background-position-x', '-60px');
        clearInterval(timer);
    });
    $('#FAQ .slider ul').on('mouseleave', 'li', function () {
        $(this).children('a').children('i').css('background-position-x', '0');
        timer = setInterval(goRight, time);
    });
    $right.on('mouseenter', function () {
        clearInterval(timer);
    });
    $left.on('mouseenter', function () {
        clearInterval(timer);
    });
    $right.on('mouseleave', function () {
        timer = setInterval(goRight, time);
    });
    $left.on('mouseleave', function () {
        timer = setInterval(goRight, time);
    });
    $right.on('click', function () {
        goRight();
    });
    $left.on('click', function () {
        goLeft();
    });
    /*</轮播图>*/

    /*<高德地图导航>*/
    var map = new AMap.Map('Address', {
        resizeEnable: true,
        zoom:14,
        center: [120.730738,27.974167],
    });
    var marker = new AMap.Marker({
        position: [120.730738,27.974167],
        title: '红莲文创园A208',
    
    });
    marker.setMap(map);
    var circle = new AMap.Circle({
        center: [120.730738,27.974167],
        radius: 200,
        fillOpacity:0.2,
        strokeWeight:1,
    });
    circle.setMap(map);
    /*</高德地图导航>*/
});
