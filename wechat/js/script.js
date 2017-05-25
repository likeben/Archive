$(function() {
    /* 模拟数据 */
    var dataArr = [
        {
            name : "周明",
            date : "星期日",
            img : "./images/avatars/webwxgeticon%20(4).jpg",
            messages : [
                {type : 0, text : "周明发来的消息"},
                {type : 1, text : "这是一条消息"},
                {type : 0, text : "周明发来的消息"},
                {type : 1, text : "这是一条消息"}
            ]
        },
        {
            name : "Lucy",
            date : "星期五",
            img : "./images/avatars/webwxgeticon%20(3).jpg",
            messages : [
                {type : 0, text : "Lucy发来的消息"},
                {type : 1, text : "这是一条消息"},
                {type : 0, text : "Lucy发来的消息"},
                {type : 1, text : "这是一条消息"},
                {type : 0, text : "Lucy发来的消息"}
            ]
        },
        {
            name : "王磊",
            date : "星期日",
            img : "./images/avatars/webwxgeticon%20(5).jpg",
            messages : [
                {type : 0, text : "王磊发来的消息"},
                {type : 1, text : "这是一条消息"},
                {type : 0, text : "王磊发来的消息"},
                {type : 1, text : "这是一条消息"},
                {type : 0, text : "王磊发来的消息"}
            ]
        }
    ];

    /* 根据数据填充聊天列表和会话区域 */
    $('.friends-list').html(template('friends-tpl', {data:dataArr}));
    $('.conversation').html(template('conversation-tpl',{data:dataArr[0]}));

    /* 监听最左侧导航点击事件 */
    var navItems = $('.nav-item ul li');
    navItems.each(function(index, item) {
        $(this).click(function() {
            $(this).addClass('selected').siblings().removeClass('selected');
        })
    });
    /* 根据路由变化, 模拟导航切换 */
    window.onhashchange = function() {
        var section = location.hash.slice(1);
        var list = $('.friends-list');
        var conversation = $('.conversation');
        switch (section) {
            case 'chat':
                list.show();
                conversation.children().show();
                break;
            case 'contact':
                list.hide();
                conversation.children().hide();
                break;
            case 'moment':
                list.hide();
                conversation.children().hide();
                break;
        }
    };

    /* 模拟聊天对象切换 */
    var list = $('.friends-list ul li');
    list.each(function(index, listItem) {
        $(this).click(function() {
            $(this).addClass('selected').siblings().removeClass('selected');

            /* 重新渲染会话窗口 */
            $('.conversation').html(template('conversation-tpl',{data:dataArr[index]}));

            var sendBtn = $('.input-box .send');
            var textInput = $('.input-box textarea');
            var messages = $('.messages');
            /* 给发送按钮绑定事件 */
            sendBtn.click(function(e) {
                e.stopImmediatePropagation();
                if (textInput.val() === '') {
                    /* 显示消息为空提示 */
                    $('.input-box .tooltip').fadeIn();
                    return;
                }
                messages.append(template('message-tpl', {data:textInput.val()}));
                textInput.val('');
            });
        })
    });

    /* 隐藏提示 */
    $(document).click(function() {
        $('.input-box .tooltip').fadeOut();
    })
});