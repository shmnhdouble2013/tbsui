/**
 * @Description: 模拟控件扁平化
 * @Author:      dafeng.xdf[at]taobao.com
 * @Date:        2013.7.3
 */
KISSY.add('tbsui', function (S) {
    'use strict';
    var D = S.DOM;
    /**
     * @name Tbsui
     * @class 模拟控件扁平化
     * @constructor
     */
    function Tbsui(cfg) {
        var self = this;
        self.selector = cfg.selector;
        self.init();
    }

    S.augment(Tbsui, {
        init:function(){
            var self = this;
            self.detecte();
        },
        detecte:function(){
            var self = this;
            S.each(self.selector,function(i){
                S.each(S.query(i),function(j){
                   if (j.nodeName === 'SELECT' && D.hasClass(j,'slct')){
                    console.log(1)
                   }else if(j.nodeName === 'RADIO' && D.hasClass(j,'huangjia')){

                   }
                });
            });
        },
        createSelect:function(){
            var tpl = '';
        },
        bindEvent:function(){

        }
    });
    return Tbsui;
}, {requires: ['dom']});