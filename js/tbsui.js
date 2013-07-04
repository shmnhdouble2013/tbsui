/**
 * @Description: 模拟控件扁平化
 * @Author:      dafeng.xdf[at]taobao.com
 * @Date:        2013.7.3
 */
KISSY.add('tbsui', function (S,XTemplate) {
    'use strict';
    var D = S.DOM,E = S.Event,EMPTY = '';
    /**
     * @name Tbsui
     * @class 模拟控件扁平化
     * @constructor
     */
    function Tbsui(cfg) {
        var self = this;
        self.selector = cfg.selector;
        self.prifix = 'slct-block';
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
                       self.createSelect(j);
                   }else if(j.nodeName === 'RADIO' && D.hasClass(j,'huangjia')){

                   }
                });
            });
        },
        createSelect:function(elm){
            var self = this,
                tpl = '<div class="'+self.prifix+'">' +
                '<div class="clearfix title">' +
                '<span class="option">{{optionName}}</span>' +
                '<span class="icon"></span>' +
                '</div>' +
                '<ul class="menu">{{#options}}' +
                '<li data-index="{{index}}" class="{{selected}}">' +
                '{{text}}' +
                '</li>{{/options}}'+
                '</ul></div>',
                _options = [],
                selectedOption = 0;
            S.each(elm.options,function(i,key){
                var _selected = EMPTY;
                if(i.selected){
                    _selected = 'selected';
                    selectedOption = key;
                }
                _options.push({index:key,text:i.text,selected:_selected});
            });
            var data = {
                    optionName: elm.options[selectedOption].text,
                    options: _options
                },
                render = new XTemplate(tpl).render(data);
            D.insertAfter(D.create(render),elm);
            var panel = D.get('.menu',D.next(elm));
            E.delegate('.'+self.prifix,'click','.title',function(e){
                if(D.hasClass(e.target,'title')){
                    S.each(D.query('li',panel),function(i){
                        D.removeClass(i,'selected');
                    });
                    D.addClass(D.query('li',panel)[elm.options.selectedIndex],'selected');
                    D.toggle(panel);
                }
            });
            E.delegate('.'+self.prifix,'click mouseenter mouseleave','li',function(e){
                switch(e.type){
                    case 'click':
                        self.selectOption(elm,D.attr(e.target,'data-index'), D.get('.option', D.next(elm)));
                        D.hide(panel);
                        break;
                    case 'mouseenter':
                        D.addClass(e.target,'selected');
                        break;
                    case 'mouseleave':
                        D.removeClass(e.target,'selected');
                        break;
                }
            });
            E.delegate('.'+self.prifix,'click','span',function(e){
                if(e.target.nodeName == 'SPAN'){
                    D.toggle(panel);
                }
            });
            E.delegate(document,'click','div',function(e){
                if(!D.contains(D.next(elm),e.target)){
                    D.hide(panel);
                }
            });
        },
        selectOption:function(elm,index,title){
            elm.options[index].selected = 'selected';
            D.html(title,elm.options[index].text);
        }
    });
    return Tbsui;
}, {requires: ['xtemplate','dom','event']});