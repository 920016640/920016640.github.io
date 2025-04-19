define(['jquery', 'bootstrap', 'frontend', 'form', 'template'], function ($, undefined, Frontend, Form, Template) {

    var Controller = {
        dobank: function () {
            $("title").html(Config.title);

            Form.api.bindevent($("form[role=form]"), function (data, ret) {
                setTimeout(function () {
                    location.href = ret.url;
                }, 500);

            }, function (success, error) {
                //错误提示码
                //   return false;

            }, function () {

            });

        },
        listing:function () {
            $("title").html(Config.title);
        },
        edit:function () {
            $("title").html(Config.title);
        }

    };
    return Controller;
});