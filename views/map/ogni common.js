/**
 * Created by tokovchuk_R on 14.07.2016.
 */
var mobile_scale=1;
$(function(){
    var body_size=$('body');
    var centrer1=$('#centrer1');
    var centrer2=$('#centrer2');
    var scroll1=centrer1.find('.scroll_frame');
    var scroll2=centrer2.find('.scroll_frame');
    var preloader=$('#preloader_frame');
    var ratio=0.5625;
    var apart_ratio=1;
    var paper_size, paper_size2, paper_size3, paper_size4;
    var time=700;
    var old_page;
    var page=body_size.attr('class');
    var frame_w, frame_h, frame_d, centrer1_w, centrer1_h;
    var easyIn='easeInQuart';
    var easyOut='easeOutQuart';
    var easyInOut='easeInOutQuart';
    var ani=false;
    var mobile=false;
    var transitions_av=true;
    var pano_help=true;
    var xml_txt;
    var p_frame1, p_frame2, p_frame3, mouse_pos;
    var home_slides=['0015','0004','0046','0043','0020','0041','0002','0000','0038','0023'];
    var pages=[

    ];
    var ani_names=[

    ];

    var popup_video, video_w, video_h, carousel, data, param_search;
    var carousel_scroll_av, carousel_line, carousel_items_num, carousel_items_targ;
    var bg_slides={};
    var plans_val={};
    plans_val['q']=1;



    if (!Modernizr.csstransitions || !Modernizr.cssanimations) {
        transitions_av=false;
        $.fn.transition=$.fn.animate;
        $.fn.transitionStop = $.fn.stop;
    }
    if(/iPad/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent))  {
        mobile=true;
        $('#body_frame').attr('class','mobile');
        centrer2.append('<div class="rotate_help_frame"><img src="/assets/i/rotate.png" class="rotate_help" /></div>');
        var rotate_help=centrer2.find('.rotate_help_frame');
    }
    if(mobile || !Modernizr.video) {
        ani=false;
    }
    if($.browser.msie && $.browser.version<11) {
        $('#body_frame').addClass('old-ie');
    }
    if(ani) {
        var bg_video, videoInt, videoTime, is_video, html_loaded;
        centrer1.prepend('<video id="bg_video" class="video-js" preload="auto"><source src="" type="video/webm" /><source src="" type="video/mp4" /></video>');
        videojs('bg_video', {}, function(){
            bg_video=this;
            bg_video.on('ended',function(){
                load_js(page,old_page);
            });
        });
    } else {
        $('.ani_toggle').remove();
    }
    function content_move() {
        if(mobile) {
            var min_window_w=1250;
            var min_window_h=650;
            var min_window_d=min_window_h/min_window_w;
            var window_w=$(window).width();
            var window_h=$(window).height();
            var window_d=window_h/window_w;
            if(window_d<min_window_d) {
                var scale=Math.min(1,window_h/min_window_h);
                body_size.css({'min-width':window_w/scale,'min-height':min_window_h,'transformOrigin':'0 0','scale':scale});
            } else {
                var scale=Math.min(1,window_w/min_window_w);
                body_size.css({'min-width':min_window_w,'min-height':window_h/scale,'transformOrigin':'0 0','scale':scale});
            }
            if(rotate_help) {
                if(window_h>window_w) {
                    rotate_help.show();
                } else {
                    rotate_help.hide();
                }
            }
        }
        frame_w=body_size.width();
        frame_h=body_size.height();
        frame_d=frame_h/frame_w;
        if(frame_d>ratio) {
            centrer1_w=frame_h/ratio;
            centrer1_h=frame_h;
            centrer1.css({'width':centrer1_w,'height':centrer1_h,'top':0,'left':0.5*(frame_w-centrer1_w)});
        } else {
            centrer1_w=frame_w;
            centrer1_h=frame_w*ratio;
            centrer1.css({'width':centrer1_w,'height':centrer1_h,'top':0.5*(frame_h-centrer1_h),'left':0});
        }
        var menu_h=Math.round(frame_h*0.0866);
        $('.footer_frame').css({'height':Math.round(frame_h*0.2122)})
        $('.menu_frame').css({'bottom':menu_h})
            .find('.menu_a').css({'line-height':menu_h+'px'}).end()
            .find('.submenu_frame').css({'padding-bottom':menu_h});
        if(paper_size) {
            paper_size.changeSize(centrer1_w, centrer1_h, true, false);
        }
        if(paper_size4) {
            plan_check_size();
        }
        if(popup_video) {
            popup_video_reload();
        }
    }
    function plan_check_size() {
        var fr=centrer2.find('.plan_frame_centrer:last');
        var fr2=fr.parent();
        var plan_size=Math.min(fr2.width()/apart_ratio,fr2.height());
        fr.css({'width':plan_size*apart_ratio,'height':plan_size,'margin-top':-0.5*plan_size,'margin-left':-0.5*plan_size*apart_ratio});
        if(paper_size2) {
            paper_size2.changeSize(plan_size*apart_ratio, plan_size, true, false);
            paper_size3.changeSize(plan_size*apart_ratio, plan_size, true, false);
        }
    }
    $(window).bind('resize',function(){
        content_move();
    });
    content_move();
    setTimeout(function(){content_move();},500);
    setTimeout(function(){content_move();},1500);
    setTimeout(function(){content_move();},2500);

    function test_json(targ_function) {
        if(!data) {
            $.ajax({
                url: '/assets/js/data.json',
                dataType: 'json',
                success: function(response){
                    data=response;
                    //console.log('loaded json');
                    targ_function();
                }
            });
        } else {
            //console.log('already loaded json');
            targ_function();
        }
    }
    var load_js=function(targ,prev) {
        //console.log('load_js '+targ);
        var menu_targ=targ;
        body_size.attr('class',targ);
        var frame1=scroll1.find('.'+targ+'_frame:last');
        var frame2=scroll2.find('.'+targ+'_frame:last');
        var prev_frame1=frame1.prevAll();
        var prev_frame2=frame2.prevAll();
        var dir;
        var prev_index=$.inArray(prev,pages);
        var next_index=$.inArray(targ,pages);
        function frame1_ani_ended(){
            scroll1.removeAttr('style');
            frame1.css({'left':0});
            prev_frame1.remove();
        }
        function frame2_ani_ended(){
            scroll2.removeAttr('style');
            frame2.css({'left':0});
            prev_frame2.remove();
        }
        if(prev_index!=-1 && next_index!=-1) {
            if(prev_index<next_index) {
                dir=1;
            } else {
                dir=-1;
            }
        }
        if(ani && $.inArray(prev+'-'+targ,ani_names)!=-1) {
            frame1.css({'left':0})
                .children(':not(.bg_img)').css({'opacity':0}).transition({'opacity':1},time);
            frame2.css({'left':0,'opacity':0}).transition({'opacity':1},time);
            prev_frame1.remove();
            prev_frame2.remove();
        } else
        if(dir) {
            frame1.css({'left':(100*dir)+'%'});
            frame2.css({'left':(100*dir)+'%'});
            if(transitions_av) {
                scroll1.delay(100).css({'translate':0}).transition({'translate':(-100*dir)+'%'},time,function(){
                    frame1_ani_ended();
                });
                scroll2.delay(100+time*0.3).css({'translate':0}).transition({'translate':(-100*dir)+'%'},time,function(){
                    frame2_ani_ended();
                });
            } else {
                scroll1.delay(100).animate({'left':(-100*dir)+'%'},time,function(){
                    frame1_ani_ended();
                });
                scroll2.delay(100+time*0.3).animate({'left':(-100*dir)+'%'},time,function(){
                    frame2_ani_ended();
                });
            }
        } else {
            frame1.css({'left':0,'opacity':0}).transition({'opacity':1},time,function(){
                frame1_ani_ended();
            });
            frame2.css({'left':0,'opacity':0}).transition({'opacity':1},time,function(){
                frame2_ani_ended();
            });
            prev_frame1.stop(true).transition({'opacity':0},time);
            prev_frame2.stop(true).transition({'opacity':0},time);
        }
        if(ani) {
            videoTime=setTimeout(function(){
                $('#bg_video').hide();
                bg_video.src('');
            },100);
        }

        frame2.find('.text_scroll').removeClass('browser_scroll').jScrollPane({showArrows:false,autoReinitialise:true,verticalDragMinHeight:35,verticalDragMaxHeight:35});

        if(targ=='home') {
            bg_slides['slides']=home_slides;
            bg_slides['av']=true;
            bg_slides['time']=7500;
            bg_slides['frame']=frame1;
            load_bg_slide(0);
            frame2.find('.bg_slides_frame, .bg_slides_dots_frame')
                .bind('mouseenter',function(){
                    stop_bg_slide();
                })
                .bind('mouseleave',function(){
                    bg_slides['av']=true;
                    start_bg_slide();
                })
            $('.logo_bg').transition({'rotate':-380,'scale':1.2},1000);
            frame2.find('.home_links_frame>*').each(function(){
                scale_show($(this),time+500+$(this).index()*700);
            })
            scale_show(frame2.find('.actions_banner'),time+1200);
        } else
        if(targ=='about') {
            scale_show(frame2.find('.to_gallery'),time+500);
            parallax_init(frame1);
        } else
        if(targ=='advantages') {
            adv_pos(0,0);
            parallax_init(frame1);
            //frame2.find('.adv_icons').css({'translate3d':0})
        } else
        if(targ=='company') {
            parallax_init(frame1);
        } else
        if(targ=='documents') {
            parallax_init(frame1);
        } else
        if(targ=='construction') {
            init_carousel(frame2,1);
            make_constr_active(0,0)
            frame2.find('.contr_bg2').css({'rotate':270,'opacity':0}).delay(time).transition({'rotate':0,'opacity':1},2000);
        } else
        if(targ=='placement' || targ=='infrastructure') {
            frame2.find('.map_place').attr('id','map_place');
            frame2.find('.place_btns_frame>*').each(function(){
                scale_show($(this),time+500+$(this).index()*700);
            })
            $.ajax({
                //url: '/assets/pages/load.php?url=LbZ-jWocVYO9ztHCziBjd_t48Au1gCVi',
                url: '/assets/files/infra.xml',
                cache: true,
                dataType: 'xml',
                type: 'GET',
                success: function(response){
                    xml_txt=[];
                    var hrefs={'pmlbs.png':0,'pmbls.png':1,'pmdbs.png':2,'pmgns.png':3,'pmnts.png':4,'pmpns.png':5,'pmvvs.png':6,'pmyws.png':7,'pmors.png':8,'pmdos.png':9,'pmrds.png':10,'pmgrs.png':11,'pmwts.png':12};
                    $(response).find('Placemark').each(function() {
                        var point_item=$(this);
                        var point_coord=point_item.find('coordinates').text().split(',');
                        var num=hrefs[point_item.find('href').text().replace('http://api-maps.yandex.ru/i/0.4/micro/','')];
                        //if(num==10 || page=='infrastructure') {
                        xml_txt.push([Number(point_coord[1]),Number(point_coord[0]),point_item.find('name').text(),point_item.find('description').text(),num]);
                        //}
                    });
                    load_placement_map(true);
                }
            })
        } else
        if(targ=='gallery') {
            var gallery_frame1=frame1.find('.gallery_place');
            var gallery_frame2=frame2.find('.gallery_place');
            var gallery_images=gallery_frame1.data('targ').split(',');
            carousel=gallery_frame1.galleryInit({
                frame2:gallery_frame2,
                path:gallery_frame1.data('path'),
                images:gallery_images,
                start_num:gallery_frame1.data('start'),
                preview_width:120,
                time:600,
                mobile:mobile,
                force3d:transitions_av,
                afterMove:function(num){
                    body_size.load_content('/gallery/'+gallery_images[num],{'suppress_load':true});
                },
                loadComplete:function(){
                    frame1.find('.bg_img').remove();
                    var active_num=gallery_frame2.find('.g_p.active').data('targ');
                    gallery_frame2.find('.g_p').each(function(){
                        $(this).delay(time+150*Math.abs($(this).data('targ')-active_num)).transition({'top':0},400,easyOut);
                    })
                }
            });
        } else
        if(targ=='news' || targ=='actions') {
            init_carousel(frame2,3);
            if(old_page!='news-article') {
                frame2.find('.carousel_item').each(function(){
                    var num=$(this).index();
                    if(num<3) {
                        $(this).css({'opacity':0,'scale':1.2}).delay(time+200*num).transition({'opacity':1,'scale':1},500);
                    }
                })
            }
        } else
        if(targ=='news-article') {
            menu_targ='news';
            frame2.find('.fancybox').fancybox({padding:0,margin:[75,100,40,100]});
        } else
        if(targ=='actions-article') {
            menu_targ='actions';
        } else
        if(targ=='banks') {
            menu_targ='ipoteque';
        } else
        if(targ=='calculator') {
            menu_targ='ipoteque';
            function get_calc(){
                var val1=Number(frame2.find('input.n1').val().replace(/\s/g,''));
                var val2=Number(frame2.find('input.n2').val()/100);
                var val3=Number(frame2.find('input.n3').val());
                var result=0;
                if(val1 && val2 && val3 && val3>2) {
                    result=Math.round(val1*((val2/12)/(1-Math.pow((1+(val2/12)),(-(val3-2))))));
                }
                frame2.find('.calc_result>span').text(addspace(result));
            }
            get_calc();
            frame2.find('input').bind('change input',function(){
                var val=$(this).val().replace(/\s+/g,'');
                var new_val=val;
                if($(this).hasClass('n1')) {
                    new_val=new_val.replace(/[^\d]/,'');
                    new_val=addspace(new_val);
                } else
                if($(this).hasClass('n2')) {
                    new_val=new_val.replace(',','.');
                    new_val=new_val.replace(/[^\.\d]/,'');
                } else
                if($(this).hasClass('n3')) {
                    new_val=new_val.replace(/[^\d]/,'');
                }
                $(this).val(new_val);
                get_calc();
            });
        } else
        if(targ=='vtour') {
            //drag_point($('.pano_points_frame'),true,false,false,true);
            frame2.find('.pano_place')
                .css({'cursor':'url(/assets/i/cur1.cur), move','translate3d':0})
                .bind('mousedown',function(){
                    $(this).css({'cursor':'url(/assets/i/cur2.cur), move'})
                })
                .bind('mouseup',function(){
                    $(this).css({'cursor':'url(/assets/i/cur1.cur), move'})
                })
            frame1.find('.pano_open_btn').sortY().each(function(){
                $(this).css({'margin-top':-105,'opacity':0}).delay(time+2000*Math.random()).animate({'margin-top':-55,'opacity':1},700,'easeOutBounce');
            })
        } else
        if(targ=='plans') {
            frame2.find('.home_links_frame>*').each(function(){
                scale_show($(this),time+500+$(this).index()*700);
            })
            test_json(function(){
                load_plans_map(frame1,frame2);
                frame1.find('.korpus_icon').each(function(){
                    var num=$(this).data('targ');
                    if(data.buildings[num])	{
                        var at=data.buildings[num];
                        $(this).addClass('pjax').attr('href','/plans/korpus'+num)
                            .find('.korpus_icon_popup').html('<div class="korpus_icon_popup_bg"><div class="korpus_icon_val">'+at.at+'</div><div class="korpus_icon_text">квартир'+word_end(at.at)+'<div>в продаже</div></div></div><div class="korpus_icon_av n0">студий<span>'+at.arc[0]+'</span></div><div class="korpus_icon_av n1">1-комнатных<span>'+at.arc[1]+'</span></div><div class="korpus_icon_av n2">2-комнатных<span>'+at.arc[2]+'</span></div><div class="korpus_icon_av n3">3-комнатных<span>'+at.arc[3]+'</span></div><div class="korpus_icon_av n4">4-комнатных<span>'+at.arc[4]+'</span></div>');
                        paper_size.getByAlt(num).data('av',1);
                    } else {
                        var txt='нет в продаже';
                        if(num==4) {
                            txt='скоро в продаже';
                        }
                        $(this).addClass('soon')
                            .find('.korpus_icon_popup').html('<div class="korpus_icon_popup_bg"><div class="korpus_icon_val">'+txt+'</div></div>');
                        paper_size.getByAlt(num).data('av',0).attr({'cursor':'default'});
                    }
                })
            })
            //drag_point($('.pano_points_frame'),true,false,false,true);
        } else
        if(/section/.test(targ)) {
            menu_targ='plans';
            frame2.find('.home_links_frame>*').each(function(){
                scale_show($(this),time+500+$(this).index()*700);
            })
            test_json(function(){
                load_section_map(frame1,frame2);
            })
            /*if(old_page=='korpus2' || old_page=='korpus2-back') {
             frame2.find('.plans_back').attr('href','/plans/'+old_page);	
             }*/
        } else
        if(/korpus/.test(targ)) {
            menu_targ='plans';
            frame2.find('.home_links_frame>*').each(function(){
                scale_show($(this),time+500+$(this).index()*700);
            })
            test_json(function(){
                load_korpus_map(frame1,frame2);
            })
        } else
        if(targ=='search') {
            test_json(function(){
                param_search=centrer2.find('.load_frame:last').searchInit({
                    data:data.apartments,
                    scroll_height:35,
                    pagination:0,
                    loadAnimate:function(el){
                        //el.css({'scale':0.9,'opacity':0}).transition({'scale':1,'opacity':1},500);					
                    }/*,
                     resultClick:function(id){
                     var d=data.apartments[id];
                     body_size.load_content('/plans/korpus'+d.b+'/section'+d.s+'/floor'+d.f+'/flat'+d.n);	
                     }*/
                });
            })
            if(old_page=='korpus') {
                frame2.find('.close_btn').attr('href','/plans/korpus'+plans_val['b']);
            } else
            if(old_page=='section') {
                frame2.find('.close_btn').attr('href','/plans/korpus'+plans_val['b']+'/section'+plans_val['s']);
            }
        } else
        if(targ=='contacts') {
            frame2.find('.map_place').attr('id','map_place');
            load_placement_map(false);
            scale_show(frame2.find('.open_route'),time+500);
            scale_show(frame2.find('.open_road'),time+700);
            frame2.find('.contr_bg2').css({'rotate':270,'opacity':0}).delay(time).transition({'rotate':0,'opacity':1},2000);
        } else
        if(targ=='buy') {
            frame2.find('.buy_icons').each(function(){
                scale_show($(this),time+$(this).index()*400);
            })
        } else
        if(targ=='ipoteque') {
            frame2.find('.buy_icons').each(function(){
                scale_show($(this),time+$(this).index()*400);
            })
        } else
        if(targ=='instalment') {

        }



        $('.menu')
            .find('.active').removeClass('active').end()
            //.find('.menu_a.'+menu_targ+'_link, .submenu_a.'+submenu_targ+'_link').addClass('active');	
            .find('.menu_a.'+menu_targ+'_link').addClass('active').parent().addClass('active').end().end()
            .find('.submenu_a.'+menu_targ+'_link').addClass('active').parent().parent().addClass('active');
        old_page=targ;
    }
    function unload_js(targ,next) {
        //console.log('unload_js '+targ);
        var frame1=scroll1.find('.'+targ+'_frame:last');
        var frame2=scroll2.find('.'+targ+'_frame:last');

        if(targ=='home') {
            frame2.find('.bg_slides_frame, .bg_slides_dots_frame').unbind('mouseenter mouseleave');
            stop_bg_slide();
            $('.logo_bg').transition({'rotate':0,'scale':1},1000);
        }

        if(paper_size) {
            paper_size=null;
            paper_size2=null;
            paper_size3=null;
        }
        if(carousel) {
            carousel.removeEvents();
            carousel=null;
        }
        if(param_search) {
            param_search.removeEvents();
            param_search=null;
        }
        if(frame2.find('.map_place').length) {
            frame2.find('.map_place').removeAttr('id');
        }
        p_frame1=null;
        p_frame2=null;
        p_frame3=null;
    }
    function add_stat(url) {
        //console.log('add_stat '+url);
        ga('send', 'pageview', url);
        //_gaq.push(['_trackPageview', url]);
        yaCounter29172190.hit(url);
    }
    function parallax_init(frame) {
        p_frame1=frame.find('.p_item.n1');
        p_frame2=frame.find('.p_item.n2');
        p_frame3=frame.find('.p_item.n3');
        move_bg();
    }
    function move_bg() {
        if(mouse_pos) {
            var x=mouse_pos.pageX/mobile_scale;
            var y=mouse_pos.pageY/mobile_scale;
            var proc=x/frame_w;
            var pos1=3*(0.5-proc)+'%';
            var pos2=6*(0.5-proc)+'%';
            var pos3=9*(0.5-proc)+'%';
            if(transitions_av==true) {
                if(p_frame1) {
                    p_frame1.css({translate3d:pos1});
                }
                if(p_frame2) {
                    p_frame2.css({translate3d:pos2});
                }
                if(p_frame3) {
                    p_frame3.css({translate3d:pos3});
                }
            } else {
                if(p_frame1) {
                    p_frame1.css({'left':pos1});
                }
                if(p_frame2) {
                    p_frame2.css({'left':pos2});
                }
                if(p_frame1) {
                    p_frame3.css({'left':pos3});
                }
            }
        }
    }

    /* слайдшоу на главной */

    function start_bg_slide() {
        bg_slides['timeout']=setTimeout(function(){
            load_bg_slide(bg_slides['num']+1);
        },bg_slides['time']);
    }
    function stop_bg_slide() {
        bg_slides['av']=false;
        clearTimeout(bg_slides['timeout']);
    }
    function load_bg_slide(num) {
        clearTimeout(bg_slides['timeout']);
        if(num>bg_slides['slides'].length-1) {
            num=0;
        } else
        if(num<0) {
            num=bg_slides['slides'].length-1;
        }
        if(bg_slides['av']) {
            start_bg_slide();
        }
        var fr=bg_slides['frame'];
        if(fr.find('.bg_img:last').data('targ')!=bg_slides['slides'][num]) {
            load_bg_img(fr,bg_slides['slides'][num]);
        }
        $('.bg_slides_frame')
            .find('.bg_slides_item.active').stop(true).transitionStop().removeClass('active').transition({'opacity':0,'scale':1.1},300,function(){
            $(this).css({'display':'none'});
        }).end()
            .find('.bg_slides_item.n'+num).stop(true).transitionStop().addClass('active').css({'display':'block','opacity':0,'scale':0.9}).delay(300).transition({'opacity':1,'scale':1},300);
        $('.bg_slides_dots_frame').find('.bg_slides_dots[data-targ="'+num+'"]').addClass('active').siblings().removeClass('active');
        bg_slides['num']=num;
    }
    function load_bg_img(frame,name) {
        frame
            .append('<img class="bg_img n'+name+'" data-targ="'+name+'" src="/assets/images/gallery/'+name+'.jpg" />')
            .find('.bg_img:last').css({'opacity':0,'scale':1.1,'translate3d':0}).load(function(){
            $(this).transition({'opacity':1,'scale':1},1000,function(){
                $(this).prevAll('.bg_img').remove();
            });
        });
    }


    function random_num(slides) {
        var r=slides[Math.floor(Math.random()*slides.length)];
        if (r!=slideshow_slide) {
            return r;
        } else {
            return random_num(slides);
        }
    }
    function scale_show(targ,delay) {
        targ.delay(delay).css({'scale':0.7,'opacity':0,'display':'block'}).transition({'scale':1.2,'opacity':1},400).transition({'scale':1},500);
    }

    Number.prototype.toRad = function () { return this * Math.PI / 180; }
    function adv_pos(num,time) {
        var fr=$('.adv_icons_frame');
        fr.find('.adv_icons').each(function(){
            var item_index=$(this).data('targ');
            var delta=0;
            if(item_index>num) {
                delta=1;
            } else
            if(item_index<num) {
                delta=-1;
            }
            var pos=item_index-num+0.7*delta;
            var angle=(180-(pos*13)).toRad();
            var radius=50;
            var new_css={};
            new_css['left']=50+radius*Math.cos(angle)+'%';
            new_css['top']=50+radius*Math.sin(angle)+'%';
            if($(this).hasClass('active')) {
                $(this).removeClass('active');
                new_css['width']=80;
                new_css['height']=80;
                new_css['margin-top']=-40;
                new_css['margin-left']=-40;
            } else
            if(item_index==num) {
                $(this).addClass('active');
                new_css['width']=120;
                new_css['height']=120;
                new_css['margin-top']=-60;
                new_css['margin-left']=-60;
            }
            $(this).transitionStop(true).transition(new_css,time);
        })
        //console.log('---------')
        if(time) {
            var scroll_frame=scroll2.find('.advantages_frame .text_scroll');
            scroll_frame.transitionStop(true).transition({'opacity':0},0.5*time,function(){
                $(this).find('.jspPane>div').load('/about/advantages/page'+num,function(){
                    scroll_frame.transition({'opacity':1},0.5*time);
                    scroll_frame.data('jsp').scrollTo(0,0);
                    scroll_frame.data('jsp').reinitialise();
                })
            });
            load_bg_img(scroll1.find('.advantages_frame .p_item'),home_slides[fr.find('.active').data('targ')]);
        }
    }

    /* поп-ап с видео */

    function open_popup_video(name) {
        if(!$('.video_popup').length) {
            centrer2.append('<div class="popup_overlay video_popup"></div>');
            var fr=centrer2.find('.video_popup');
            fr.html('<div class="video_popup_center">'+name+'<div class="close_btn video_close"></div></div>').css({'opacity':0,'display':'block'});
            video_w=fr.find('video').attr('width');
            video_h=fr.find('video').attr('height');
            videojs('popup_video', {}, function(){
                popup_video=this;
                popup_video_reload();
                fr.transition({'opacity':1},300);
            })
        }
    }
    function unload_popup_video() {
        if(popup_video) {
            popup_video.src('');
            popup_video.dispose();
            popup_video=null;
        }
    }
    function popup_video_reload() {
        var cur_video_w=Number(video_w);
        var cur_video_h=Number(video_h);
        var video_frame_w=Number(frame_w)-150;
        var video_frame_h=Number(frame_h)-150;
        if(cur_video_w>video_frame_w || cur_video_h>video_frame_h) {
            var scale=Math.min(video_frame_w/video_w,video_frame_h/video_h);
            cur_video_w=video_w*scale;
            cur_video_h=video_h*scale;
        }
        centrer2.find('.video_popup_center').css({'margin-top':-0.5*cur_video_h,'margin-left':-0.5*cur_video_w});
        popup_video.width(cur_video_w);
        popup_video.height(cur_video_h);
    }
    function load_road_text(num,time) {
        var fr=$('.road_frame');
        var text_scroll=fr.find('.text_scroll');
        fr.find('.road_sel.n'+num).addClass('active').siblings().removeClass('active');
        text_scroll.transitionStop(true).transition({'opacity':0},time,function(){
            $(this).find('.jspPane>div').load('/contacts/'+num,function(){
                text_scroll.transition({'opacity':1},time);
                text_scroll.data('jsp').scrollTo(0,0);
                text_scroll.data('jsp').reinitialise();
            })
        })
    }

    /* динамика - слайдер */

    function init_carousel(frame,item_n) {
        carousel_scroll_av=true;
        carousel_line=frame.find('.carousel_line');
        carousel_items_num=carousel_line.children('.carousel_item').length;
        carousel_items_targ=item_n;
        var dots_num=Math.ceil(carousel_items_num/carousel_items_targ);
        if(dots_num>1) {
            var txt='<div class="carousel_dots_frame">';
            for(var i=0; i<dots_num; i++) {
                txt+='<div class="carousel_dots'+(i==0?' active':'')+'" data-targ="'+i+'"></div>';
            }
            txt+='</div><div class="carousel_arrow left"></div><div class="carousel_arrow right"></div>';
            frame.find('.carousel_frame').prepend(txt);
            txt=null;
        } else {
            carousel_line.css({'left':0.5*carousel_line.children(':first').outerWidth(true)*(carousel_items_targ-carousel_items_num)});
        }
        carousel_line.css({'translate3d':0});
    }
    function make_constr_active(targ_data,time) {
        carousel_line.find('.active').removeClass('active').stop(true).transitionStop().transition({'width':170},time)
            .find('.carousel_item_img').stop(true).transitionStop().transition({'margin-top':-85,'margin-left':-85},time).end()
            .find('.carousel_item_title').stop(true).transitionStop().transition({'opacity':0},time,function(){
            $(this).css({'display':'none'});
        });
        carousel_line.find('.carousel_item').eq(targ_data).addClass('active').stop(true).transitionStop().transition({'width':244},time)
            .find('.carousel_item_img').stop(true).transitionStop().transition({'margin-top':-122,'margin-left':-122},time).end()
            .find('.carousel_item_title').stop(true).transitionStop().css({'display':'block','opacity':0}).transition({'opacity':1},time);
    }

    /* панорамы */

    function load_pano(targ) {
        scroll2.find('.pano_place').stop(true).css({'opacity':0,'display':'block'}).delay(500).transition({'opacity':1},800).html('<div id="pano_screen"><script>embedpano({swf:"/assets/pages/pano/pano.swf",xml:"/assets/pages/pano/Pano_00'+targ+'.xml",target:"pano_screen",wmode:"opaque","bgcolor":"#000000",html5:"prefer"});</script></div><div class="shadow"></div><div class="close_btn pano_close"></div><div class="pano_help"></div>');
        if(pano_help) {
            $('.pano_help, .pano_place .shadow').delay(1500).fadeIn(300).delay(4000).fadeOut(300);
            pano_help=false;
        }
    }
    function unload_pano() {
        scroll2.find('.pano_place').stop(true).transition({'opacity':0},500,function(){
            $(this).hide().html('');
        });
    }
    function drag_point(frame,top,right,bottom,left) {
        var w, h;
        frame.children()
            .drag('start',function(){
                w=frame.width();
                h=frame.height();
            })
            .drag(function (ev,dd) {
                if(top) $(this).css({'top':(100*dd.offsetY/h).toFixed(1)+'%'});
                if(right) $(this).css({'right':(100-100*dd.offsetX/w).toFixed(1)+'%'});
                if(bottom) $(this).css({'bottom':(100-100*dd.offsetY/h).toFixed(1)+'%'});
                if(left) $(this).css({'left':(100*dd.offsetX/w).toFixed(1)+'%'});
            },{relative:true})
            .bind('click',function(){
                return false;
            });
    }

    /* поп-ап обратной связи */

    function load_feedback(targ) {
        if(!$('.feedback_frame').length) {
            centrer2.append('<div class="popup_overlay feedback_popup"></div>')
                .find('.feedback_popup').load('/assets/pages/feedback'+targ+'.html',function(){
                $(this).css({'opacity':0,'display':'block'}).transition({'opacity':1},400)
                    .find('input, textarea').placeholder().bind('change',function(){
                        $(this).removeClass('error');
                    })
                    .filter('.phone_input').mask('+7 (999) 999-99-99');
            })
        }
    }

    /* квартиры */

    function load_plans_map(frame1,frame2) {
        paper_size=frame1.find('.plans_map').area2svg({
            'opacity':0,
            'fill':'#f29228',
            'fill-opacity':1,
            'stroke-opacity':0,
            onclick:function(el) {
                var alt=el.data('alt');
                if(el.data('av')) {
                    body_size.load_content('/plans/korpus'+alt);
                }
            },
            onmouseover:function(el) {
                var alt=el.data('alt');
                frame1.find('.korpus_icon.n'+alt).trigger('mouseenter').addClass('hover');
            },
            onmouseout:function(el) {
                var alt=el.data('alt');
                frame1.find('.korpus_icon.n'+alt).trigger('mouseleave').removeClass('hover');
            }
        })
        content_move();
    }
    function load_korpus_map(frame1,frame2) {
        plans_val['b']=Number(frame2.find('.korp_det.n0 .korp_det_val>div').text());
        var floor_popup=frame1.find('.korpus_popup');
        paper_size=frame1.find('.plans_map').area2svg({
            'fill':'#f29228',
            'opacity':0,
            'stroke-opacity':0,
            'cursor':'default',
            onclick:function(el) {
                if(el.data('av')) {
                    var alt=el.data('alt');
                    body_size.load_content('/plans/korpus'+plans_val['b']+'/section'+alt);
                }
            },
            onmouseover:function(el) {
                var alt=el.data('alt');
                var box=el.getBBox();
                var scale=el.paper.width/frame1.find('.plans_map').attr('width');
                floor_popup.css({'display':'block','top':box.y*scale,'left':box.cx*scale})
                    .find('.val').text(alt);
                if(floor_popup.offset().top<5) {
                    floor_popup.offset({'top':5});
                }
                if(el.data('av')) {
                    el.attr({'opacity':0.8});
                    var at=data.sections[plans_val['b']+'-'+alt];
                    floor_popup.find('.korpus_icon_popup').html('<div class="korpus_icon_popup_bg"><div class="korpus_icon_val">'+at.at+'</div><div class="korpus_icon_text">квартир'+word_end(at.at)+'<div>в продаже</div></div></div><div class="korpus_icon_av n0">студий<span>'+at.arc[0]+'</span></div><div class="korpus_icon_av n1">1-комнатных<span>'+at.arc[1]+'</span></div><div class="korpus_icon_av n2">2-комнатных<span>'+at.arc[2]+'</span></div><div class="korpus_icon_av n3">3-комнатных<span>'+at.arc[3]+'</span></div><div class="korpus_icon_av n4">4-комнатных<span>'+at.arc[4]+'</span></div>');
                } else {
                    el.attr({'opacity':0.4});
                    floor_popup.find('.korpus_icon_popup').html('');
                }
            },
            onmouseout:function(el) {
                if(el.data('av')) {
                    el.attr({'opacity':0.4});
                } else {
                    el.attr({'opacity':0});
                }
                floor_popup.css({'display':'none'});
            },
            each:function(el) {
                el.data('av',0);
                var alt=el.data('alt');
                if(data.sections[plans_val['b']+'-'+alt]) {
                    var at=data.sections[plans_val['b']+'-'+alt].at;
                    if(at!=0) {
                        el.attr({'opacity':0.4,'cursor':'pointer'}).data('av',at);
                    }
                }
            }
        });
        content_move();
    }
    function load_minimap_map(frame2) {
        frame2.find('.minimap_map:last').area2svg({
            'opacity':0,
            'fill':'#f29228',
            'fill-opacity':1,
            'stroke-opacity':0,
            'cursor':'default',
            onclick:function(el) {
                var alt=el.data('alt').split('-');
                if(!el.data('active') && el.data('av')) {
                    body_size.load_content('/plans/korpus'+alt[0]+'/section'+alt[1]);
                }
            },
            onmouseover:function(el) {
                if(!el.data('active') && el.data('av')) {
                    el.attr({'opacity':1});
                }
            },
            onmouseout:function(el) {
                if(!el.data('active')) {
                    el.attr({'opacity':0});
                }
            },
            each:function(el) {
                var alt=el.data('alt').split('-');
                if(alt[1]==plans_val['s']) {
                    el.attr({'opacity':1}).data('active',true);
                }
                el.data('av',0);
                if(data.sections[alt[0]+'-'+alt[1]]) {
                    el.attr({'cursor':'pointer'}).data('av',1);
                }
            }
        });
    }
    function load_section_map(frame1,frame2) {
        plans_val['b']=Number(frame2.find('.korp_det.n0 .korp_det_val>div').text());
        plans_val['s']=Number(frame2.find('.korp_det.n1 .korp_det_val>div').text());
        plans_val['floor_frame']=frame2.find('.floor_frame');
        plans_val['sect_sel']=frame2.find('.korp_det.n1');
        plans_val['floor_sel']=frame2.find('.korp_det.n2');
        plans_val['apart_details']=frame2.find('.apart_details_frame');
        plans_val['floor_frame'].find('.minimap_frame').load('/assets/pages/minimaps/'+plans_val['b']+'.html',function(){
            load_minimap_map(frame2);
        })
        var floor_popup=frame1.find('.korpus_popup');
        if(frame1.hasClass('opened_floor') || frame1.hasClass('opened_flat')) {
            plans_val['f']=Number(plans_val['floor_sel'].find('.korp_det_val>div').text());
            if(frame1.hasClass('opened_floor')) {
                load_floor(0,true);
            } else
            if(frame1.hasClass('opened_flat')) {
                var flat_num=plans_val['b']+'-'+plans_val['apart_details'].find('.n1 .val').text();
                load_floor_details();
                load_apart_details(flat_num);
                load_apart(flat_num,0,true);
                paper_size4=true;
                plan_check_size();
            }
            $('.korp_det.n1').addClass('small');
        }
        if(!data.sections[plans_val['b']+'-'+(plans_val['s']-1)]) {
            plans_val['sect_sel'].find('.sect_left').remove();
        } else {
            plans_val['sect_sel'].find('.sect_left').attr('href','/plans/korpus'+plans_val['b']+'/section'+(plans_val['s']-1));
        };
        if(!data.sections[plans_val['b']+'-'+(plans_val['s']+1)]) {
            plans_val['sect_sel'].find('.sect_right').remove();
        } else {
            plans_val['sect_sel'].find('.sect_right').attr('href','/plans/korpus'+plans_val['b']+'/section'+(plans_val['s']+1));
        };
        paper_size=frame1.find('.plans_map').area2svg({
            'fill':'#f29228',
            'opacity':0,
            'stroke-opacity':0,
            onclick:function(el) {
                var alt=el.data('alt');
                open_floor_popup(alt);
                floor_popup.css({'display':'none'});
            },
            onmouseover:function(el) {
                var alt=el.data('alt');
                if(el.data('av')) {
                    el.attr({'opacity':0.8});
                } else {
                    el.attr({'opacity':0.4});
                }
                var box=el.getBBox();
                var scale=el.paper.width/frame1.find('.plans_map').attr('width');
                var at=data.floors[plans_val['b']+'-'+alt];
                floor_popup.css({'display':'block','top':box.y*scale,'left':box.cx*scale})
                    .find('.val').text(alt.split('-')[1]).end()
                    .find('.korpus_icon_popup').html('<div class="korpus_icon_popup_bg"><div class="korpus_icon_val">'+at.at+'</div><div class="korpus_icon_text">квартир'+word_end(at.at)+'<div>в продаже</div></div></div><div class="korpus_icon_av n0">студий<span>'+at.arc[0]+'</span></div><div class="korpus_icon_av n1">1-комнатных<span>'+at.arc[1]+'</span></div><div class="korpus_icon_av n2">2-комнатных<span>'+at.arc[2]+'</span></div><div class="korpus_icon_av n3">3-комнатных<span>'+at.arc[3]+'</span></div><div class="korpus_icon_av n4">4-комнатных<span>'+at.arc[4]+'</span></div>');
            },
            onmouseout:function(el) {
                if(el.data('av')) {
                    el.attr({'opacity':0.4});
                } else {
                    el.attr({'opacity':0});
                }
                floor_popup.css({'display':'none'});
            }
        });
        test_floors(frame2);
        content_move();
    }
    function test_floors(frame2) {
        var rooms_av=[];
        frame2.find('.rooms_sel.active').each(function(){
            rooms_av.push(Number($(this).data('targ')));
        })
        if(rooms_av.length==0) {
            rooms_av=[1,2,3];
        }
        paper_size.forEach(function(el){
            var alt=el.data('alt');
            var av=0;
            var floor_data=data.floors[plans_val['b']+'-'+alt];
            if(floor_data) {
                $.each(rooms_av, function(index, value) {
                    av+=floor_data.arc[value];
                })
            }
            if(av!=0) {
                el.attr({'opacity':0.4,'cursor':'pointer'}).data('av',av);
            } else {
                el.attr({'opacity':0,'cursor':'default'}).data('av',av);
            }
        })
    }
    function open_floor_popup(alt) {
        plans_val['s']=Number(alt.split('-')[0]);
        plans_val['f']=Number(alt.split('-')[1]);
        plans_val['floor_frame'].stop(true).css({'display':'block','opacity':0}).transition({'opacity':1},700);
        show_blur_bg();
        load_floor(0);
        $('.korp_det.n1').addClass('small');
    }
    function close_floor() {
        plans_val['floor_frame'].stop(true).transition({'opacity':0},400,function(){
            $(this).hide().find('.plan_frame_centrer').html('');
            paper_size2=null;
            paper_size3=null;
            paper_size4=null;
        })
        hide_blur_bg();
        $('.korp_det.n1').removeClass('small');
        body_size.load_content('/plans/korpus'+plans_val['b']+'/section'+plans_val['s'],{'suppress_load':true});
    }
    function show_blur_bg(search_bg) {
        $('.blur_bg').stop(true).css({'display':'block','opacity':0}).transition({'opacity':1},400);
        if(search_bg) {
            $('.korp_det.n0').addClass('low-z');
        }
    }
    function hide_blur_bg(search_bg) {
        $('.blur_bg').stop(true).transition({'opacity':0},700,function(){
            $(this).hide();
            if(search_bg) {
                $('.korp_det.n0').removeClass('low-z');
            }
        });
    }
    function load_floor_details() {
        plans_val['floor_frame'].find('.floor_down, .floor_up').addClass('active');
        if(!data.floors[plans_val['b']+'-'+plans_val['s']+'-'+(plans_val['f']-1)]) {
            plans_val['floor_sel'].find('.floor_down').removeClass('active');
        };
        if(!data.floors[plans_val['b']+'-'+plans_val['s']+'-'+(plans_val['f']+1)]) {
            plans_val['floor_sel'].find('.floor_up').removeClass('active');
        };
        plans_val['floor_frame']
            .find('.windrose').attr('src','/assets/images/minimaps/'+plans_val['b']+'-'+plans_val['s']+'.png');
        plans_val['floor_sel'].find('.korp_det_val>div').text(plans_val['f']);
    }
    function load_floor(time,no_history) {
        load_floor_details();
        plans_val['floor_frame']
            .find('.plan_frame_centrer').stop(true).transition({'opacity':0},time,function(){
            load_floor_map(time);
            plans_val['floor_frame']
                .find('.at_floor').stop(true).fadeIn(time*2).end()
                .find('.at_apart, .apart_details_frame').stop(true).fadeOut(time*2);
        });
        if(!no_history) {
            body_size.load_content('/plans/korpus'+plans_val['b']+'/section'+plans_val['s']+'/floor'+plans_val['f'],{'suppress_load':true});
        }
    }
    function rc_attr(param) {
        return {'opacity':0.2};
    }
    function load_floor_map(time) {
        $('.plans_close').attr('class','plans_close floor_close');
        paper_size2=null;
        paper_size3=null;
        paper_size4=true;
        plans_val['n']=null;
        var fr=plans_val['floor_frame'].find('.plan_frame_centrer')
        fr.load('/assets/pages/floors/'+plans_val['b']+'-'+plans_val['s']+'-'+plans_val['f']+'.html',function(){
            fr.find('.floor_map').load(function(){
                $(this).unbind('load');
                fr.transition({'opacity':1},time);
            })
            fr.find('.floor_map_cont').clone().appendTo($(this));
            var zoom;
            fr.find('.floor_map:first').attr('src','/assets/i/blank.gif');
            paper_size2=fr.find('.floor_map:first').area2svg({
                'opacity':0,
                'fill':'#f29228',
                'fill-opacity':1,
                'stroke-opacity':0,
                onclick:function(el) {
                },
                onmouseover:function(el) {
                },
                onmouseout:function(el) {
                }
            })
            paper_size3=fr.find('.floor_map:last').area2svg({
                'opacity':0,
                'cursor':'default',
                onclick:function(el) {
                    var alt=el.data('alt');
                    if(el.data('av')==1) {
                        load_apart(alt,200);
                    }
                },
                onmouseover:function(el) {
                    var alt=el.data('alt');
                    if(paper_size2) {
                        if(el.data('av')==1) {
                            paper_size2.getByAlt(alt).attr({'opacity':0.6});
                        }
                        load_apart_details(alt);
                    }
                    if(data.apartments[alt].st==1) {
                        var box=el.getBBox();
                        var scale=el.paper.width/fr.find('.floor_map').attr('width');
                        zoom.css({'display':'block','top':box.cy*scale,'left':box.cx*scale});
                    }

                },
                onmouseout:function(el) {
                    var alt=el.data('alt');
                    if(paper_size2 && el.data('av')==1) {
                        paper_size2.getByAlt(alt).attr(rc_attr(data.apartments[alt].rc));
                    }
                    if(!plans_val['n']) {
                        plans_val['apart_details'].css({'display':'none'});
                    }
                    zoom.css({'display':'none'});
                },
                each:function(el) {
                    var alt=el.data('alt');
                    var d=data.apartments[alt];
                    if(!d || d.st!=1) {
                        if(!d) {
                            d={};
                            d.st=0;
                            console.log('null data at '+alt)
                        }
                        if(d.st==2) {
                            paper_size2.getByAlt(alt).attr({'opacity':0.15,'fill':'#000000'});
                        } else {
                            paper_size2.getByAlt(alt).attr({'opacity':0});
                        }
                    } else {
                        paper_size2.getByAlt(alt).attr(rc_attr(data.apartments[alt].rc));
                        el.attr({'cursor':'pointer'});
                    }
                    el.data('av',d.st);
                }
            })
            fr.find('.floor_map:last').after('<div class="floor_zoom"></div>');
            zoom=$(this).find('.floor_zoom');
            plan_check_size();
        })
    }
    function load_apart_details(alt) {
        var d=data.apartments[alt];
        var sale_text='не в продаже';
        if(d.st==1) {
            sale_text='в продаже';
        } else
        if(d.st==2) {
            sale_text='забронирована';
        } else
        if(d.st==0) {
            sale_text='продана';
        }
        plans_val['apart_details'].stop(true).css({'display':'block','opacity':1})
            .find('.n1 .val').text(d.n).end()
            .find('.n5 .val').text(sale_text);
        if(d.st==1) {
            var rc=d.rc;
            if(rc!=0) {
                var rc_text='<div class="val bold">'+rc+'</div>количество комнат';
            } else {
                var rc_text='<div class="val bold is_st">студия</div>';
            }
            plans_val['apart_details'].removeClass('not-sale')
                .find('.n2').html(rc_text).end()
                .find('.n3 .val').html(d.sq).end()
                .find('.n4 .val').text(addspace(d.tc));
        } else {
            plans_val['apart_details'].addClass('not-sale');
        }
    }
    function load_apart(alt,time,no_history) {
        plans_val['n']=alt;
        paper_size2=null;
        paper_size3=null;
        plans_val['floor_frame'].find('.plan_frame_centrer').stop(true).transition({'opacity':0},time,function(){
            $(this).html('<img class="apart_img" src="/assets/images/apts/'+alt+'.png" />')
                .find('.apart_img').load(function(){
                $(this).unbind('load').parent().transition({'opacity':1},time);
            })
        })
        plans_val['floor_frame']
            .find('.at_floor').stop(true).fadeOut(time*2).end()
            .find('.at_apart').stop(true).fadeIn(time*2).end()
            .find('.pdf_btn').attr('href','/assets/php/pdf.php?id='+alt);
        $('.plans_close').attr('class','plans_close apart_close');
        if(!no_history) {
            body_size.load_content('/plans/korpus'+plans_val['b']+'/section'+plans_val['s']+'/floor'+plans_val['f']+'/flat'+data.apartments[plans_val['n']].n,{'suppress_load':true});
        }
    }

    /* карты */

    function load_placement_map(placement) {
        //console.log(xml_txt)
        var obj_point = new google.maps.LatLng(55.046928,82.926279);
        var off_point = new google.maps.LatLng(55.046928,82.929522);
        var center_point = new google.maps.LatLng(55.0431,82.9252);
        var myOptions = {
            zoom: 15,
            center: center_point,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.RIGHT_CENTER
            }
        };

        var map = new google.maps.Map(document.getElementById('map_place'),myOptions);

        var colors=['#4fa2db',null,null,'#c24894','#f8b000','#f29229',null,'#009fe2','#4e2483','#2377c4','#ff0013','#2db3a0','#e20613'];
        var image1 = new google.maps.MarkerImage(
            '/assets/i/sprite.png',
            new google.maps.Size(57,73),
            new google.maps.Point(804,5),
            new google.maps.Point(25,73)
        );
        var marker1 = new MarkerWithLabel({
            position: obj_point,
            title: 'Огни Сибири',
            map: map,
            icon: image1,
            labelContent: '<span class="gmaps_labels_span n5" style="background-color:'+colors[5]+'">Огни Сибири</span>',
            labelAnchor: new google.maps.Point(90,-8),
            labelClass: 'gmaps_labels',
            labelVisible: false,
        });
        google.maps.event.addListener(marker1,'mouseover',function() {
            this.setOptions({labelVisible:true,zIndex:10000});
        });
        google.maps.event.addListener(marker1,'mouseout',function() {
            this.setOptions({labelVisible:false,zIndex:null});
        });
        var image_route = new google.maps.MarkerImage(
            '/assets/i/sprite.png',
            new google.maps.Size(56,73),
            new google.maps.Point(929,155),
            new google.maps.Point(25,73)
        );
        var route_marker = new google.maps.Marker({
            position: obj_point,
            map: map,
            icon: image_route,
            clickable: false,
            visible: false
        });
        var path;
        var markers=[];
        var lineSymbol1 = {
            path: 'M 0,-1 0,-0.99',
            strokeOpacity: 1,
            strokeColor: '#f36d21',
            scale: 6
        };
        var directionsDisplay = new google.maps.DirectionsRenderer({map:null,suppressMarkers:true,polylineOptions:{strokeOpacity:0,
            icons: [{
                icon: lineSymbol1,
                offset: '0',
                repeat: '15px'
            }]
        }});
        var directionsService = new google.maps.DirectionsService();
        function calcRoute(position) {
            var request = {
                origin: position,
                destination: obj_point,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }
        function placeMarker(position) {
            route_marker.setOptions({position:position,visible:true,animation:google.maps.Animation.DROP});
            directionsDisplay.setMap(map);
            calcRoute(position);
            $('.route_help').trigger('click');
        }
        google.maps.event.addListener(map, 'click', function(e) {
            if(path) {
                placeMarker(e.latLng);
            }
        });
        $('.open_route').bind('click',function(){
            path=true;
            map.panTo(center_point);
            map.setZoom(11);
            $('.route_adr_frame').stop(true).fadeIn(400)
                .find('.route_adr_input').val('').placeholder();
            for(var i=0; i<markers.length; i++) {
                markers[i].setVisible(setVisible(false,markers[i].type));
            }
            $('.open_route').fadeOut(300);
        });
        $('.route_adr_close').bind('click',function(){
            path=false;
            map.panTo(center_point);
            map.setZoom(15);
            $('.route_adr_frame').stop(true).fadeOut(300);
            directionsDisplay.setMap(null);
            route_marker.setOptions({visible:false});
            for(var i=0; i<markers.length; i++) {
                markers[i].setVisible(setVisible(true,markers[i].type));
            }
            $('.open_route').fadeIn(400);
        });
        $('.route_adr_btn').bind('click', function() {
            var address = $(this).siblings('.route_adr_input').val();
            if(address != '' && address != 'Выберите точку на карте или введите адрес начала маршрута') {
                $.ajax({
                    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address,
                    dataType: 'json',
                    success: function(response){
                        if(response.results.length) {
                            inputCoords = new google.maps.LatLng(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng);
                            placeMarker(inputCoords);
                        }
                    }
                });
            }
        });
        $('.route_adr_input').bind('keydown',function(e){
            var key=e.which;
            if(key==13 && path==true) {
                $('.route_adr_btn').trigger('click');
            };
        })
        if(placement) {
            function get_icon_style(type) {
                var img;
                if(type==10) {
                    img=new google.maps.MarkerImage(
                        '/assets/i/sprite.png',
                        new google.maps.Size(32,32),
                        new google.maps.Point(804,88),
                        new google.maps.Point(16,32)
                    )
                } else
                if(type==9) {
                    img=new google.maps.MarkerImage(
                        '/assets/i/sprite.png',
                        new google.maps.Size(32,32),
                        new google.maps.Point(838,88),
                        new google.maps.Point(16,32)
                    )
                } else
                if(type==5) {
                    img=new google.maps.MarkerImage(
                        '/assets/i/sprite.png',
                        new google.maps.Size(57,73),
                        new google.maps.Point(804,5),
                        new google.maps.Point(25,73)
                    )
                } else {
                    img=new google.maps.MarkerImage(
                        '/assets/i/sprite.png',
                        new google.maps.Size(47,61),
                        new google.maps.Point(type*50+348,246),
                        new google.maps.Point(24,61)
                    )
                }
                return img;
            }
            function setVisible(state,type) {
                return state;
            }
            //var markers=[[],[],[],[],[],[],[],[],[],[],[],[],[]];

            for (var i=0; i<xml_txt.length; i++) {
                var type=Number(xml_txt[i][4]);
                var marker = new MarkerWithLabel({
                    position: new google.maps.LatLng(xml_txt[i][0],xml_txt[i][1]),
                    title: xml_txt[i][2],
                    map: map,
                    icon: get_icon_style(type),
                    type: type,
                    labelContent: '<span class="gmaps_labels_span n'+type+'" style="background-color:'+colors[type]+'">'+xml_txt[i][2]+'</span>',
                    labelAnchor: new google.maps.Point(90,-8),
                    labelClass: 'gmaps_labels',
                    labelVisible: false,
                    visible: setVisible(true,type)
                });
                //markers[type].push(marker);
                markers.push(marker);
                google.maps.event.addListener(marker,'mouseover',function() {
                    this.setOptions({labelVisible:true,zIndex:10000});
                });
                google.maps.event.addListener(marker,'mouseout',function() {
                    this.setOptions({labelVisible:false,zIndex:null});
                });
            }
        } else {
            var marker2 = new MarkerWithLabel({
                position: off_point,
                title: 'Офис продаж',
                map: map,
                icon: image1,
                labelContent: '<span class="gmaps_labels_span n5" style="background-color:'+colors[5]+'">Офис продаж</span>',
                labelAnchor: new google.maps.Point(90,-8),
                labelClass: 'gmaps_labels',
                labelVisible: false,
            });
            google.maps.event.addListener(marker2,'mouseover',function() {
                this.setOptions({labelVisible:true,zIndex:10000});
            });
            google.maps.event.addListener(marker2,'mouseout',function() {
                this.setOptions({labelVisible:false,zIndex:null});
            });
        }
    }



    body_size.pjax2({
        beforeSend:function(new_page) {
            preloader.show();
            unload_js(old_page,new_page);
            var video_name=old_page+'-'+new_page;
            if(ani) {
                clearInterval(videoInt);
                clearTimeout(videoTime);
                bg_video.pause();
            }
            if(ani && $.inArray(video_name,ani_names)!=-1) {
                is_video=true;
                var i=0;
                html_loaded=false;
                $('#bg_video').show();
                bg_video.src([
                    {type:'video/webm', src:'/assets/video/fly/'+video_name+'.webm'},
                    {type:'video/mp4', src:'/assets/video/fly/'+video_name+'.mp4'}
                ]);
                scroll1.find('.'+old_page+'_frame').children(':not(.bg_img)').stop(true).transition({'opacity':0},time,function(){
                    $(this).hide();
                })
                scroll2.find('.'+old_page+'_frame').stop(true).transition({'opacity':0},time,function(){
                    $(this).remove();
                })
                videoInt=setInterval(function(){
                    i++;
                    if ((bg_video.bufferedPercent()>0.60 || i>100) && html_loaded) {
                        clearInterval(videoInt);
                        preloader.hide();
                        bg_video.play();
                        setTimeout(function(){
                            scroll1.find('.'+old_page+'_frame>.bg_img:first').hide();
                        },90);
                    }
                },50);
            } else {
                is_video=false;
            }
        },
        success:function(data,type,url,slug,custom_type) {
            //console.log(type,url,slug,custom_type)
            page=type;
            var txt1=/to_centrer1">([\s\S]*)<\/div>\s*<div class="to_centrer2/.exec(data)[1];
            var txt2=/to_centrer2">([\s\S]*)<\/div>\s*$/.exec(data)[1];
            if(mobile==true) {
                //txt1=txt1.replace(/(bg_img"\s.*)\/(\w*\.jpg"\s\/>)/,'$1/m/$2');
            }
            scroll1.append('<div class="load_frame '+type+'_frame'+custom_type+'" style="left:100%;">'+txt1+'</div>');
            scroll2.append('<div class="load_frame '+type+'_frame'+custom_type+'" style="left:100%;">'+txt2+'</div>');
            $('.load_frame.'+type+'_frame:last-child .bg_img:first').load(function(){
                $(this).unbind('load');
                if(is_video) {
                    html_loaded=true;
                } else {
                    preloader.hide();
                    load_js(type,old_page);
                }
            })
            add_stat(url);
        },
        success_function:load_js,
    });

    body_size.bind('click',function(e){
            var targ_id=e.target.id;
            var targ_class=e.target.className;
            var targ=$(e.target);
            var targ_data=targ.data('targ');

            if(targ_class=='open_video') {
                open_popup_video(targ_data);
            } else
            if(targ_class=='close_btn video_close') {
                centrer2.find('.video_popup').stop(true).transition({'opacity':0},300,function(){
                    unload_popup_video();
                    $(this).remove();
                })
            } else
            if(targ_class=='ani_toggle') {
                if(ani) {
                    ani=false;
                    targ.text('включить анимацию');
                } else {
                    ani=true;
                    targ.text('выключить анимацию');
                };
            } else
            if(targ_class=='pano_open_btn') {
                load_pano(targ_data);
            } else
            if(targ_class=='close_btn pano_close') {
                unload_pano();
            } else
            if(targ_class=='open_feedback n0' || targ_class=='open_feedback n1' || targ_class=='buy_icons n1') {
                load_feedback(targ_data);
            } else
            if(targ_class=='close_btn feedback_close') {
                centrer2.find('.feedback_bg').stop(true).transition({'opacity':0},300,function(){
                    $(this).parent().transition({'opacity':0},400,function(){
                        $(this).remove();
                    })
                });
            } else
            if(targ_class=='send_btn') {
                var fr=targ.parents('.feedback_bg');
                fr.find('input, textarea').each(function(){
                    var val=$(this).val();
                    if(val=='' || val==$(this).attr('placeholder') || ($(this).hasClass('mail_input') && !/\S+@\S+\.\S+/.test(val))) {
                        $(this).addClass('error');
                    }
                })
                if(fr.hasClass('n2')) {
                    if(!fr.find('.phone_input').hasClass('error') || !fr.find('.mail_input').hasClass('error')) {
                        fr.find('.phone_input, .mail_input').removeClass('error')
                    }
                }
                if(!fr.find('.error').length) {
                    var txt_name=fr.find('.feedback_input1').val();
                    var txt_text='';
                    var txt_title=fr.find('.feedback_name').data('title');
                    targ.addClass('no-active');
                    $.cookie('name',$.md5(txt_name),{expires:1,path:'/'});
                    fr.find('input, textarea').each(function(){
                        txt_text+=$(this).data('title')+': '+$(this).val()+'\n';
                    })
                    $.ajax({
                        url: '/assets/pages/mail.php',
                        cache: false,
                        type: 'POST',
                        data: 'name='+txt_name+'&text='+txt_text+'&title='+txt_title,
                        success: function(data){
                            if(data=='ok') {
                                fr
                                    .find('.feedback_inputs').fadeOut(200).end()
                                    .find('.feedback_sended').delay(200).fadeIn(200).delay(5000).fadeOut(200,function(){
                                    fr.find('.feedback_close').trigger('click');
                                });
                            } else {
                                targ.removeClass('no-active');
                            }
                        },
                        error: function(){
                            targ.removeClass('no-active');
                        }
                    });
                }
            } else
            if(targ_class=='rotate_help' || targ_class=='rotate_help_frame') {
                rotate_help.hide();
                rotate_help=null;
            } else
            if(targ_class=='carousel_arrow left') {
                $('.carousel_dots.active').prev().trigger('click');
            } else
            if(targ_class=='carousel_arrow right') {
                $('.carousel_dots.active').next().trigger('click');
            } else
            if(targ_class=='carousel_dots' && carousel_scroll_av) {
                carousel_scroll_av=false;
                var prev_btn=$('.carousel_arrow.left');
                var next_btn=$('.carousel_arrow.right');
                targ.addClass('active').siblings('.active').removeClass('active');
                if(targ.is(':last-child')) {
                    prev_btn.show();
                    next_btn.hide();
                } else
                if(targ.is(':first-child')) {
                    prev_btn.hide();
                    next_btn.show();
                } else {
                    prev_btn.show();
                    next_btn.show();
                }
                var time=600;
                var targ_pos=-100*1/carousel_items_targ*Math.min(targ_data*carousel_items_targ, carousel_items_num-carousel_items_targ)+'%';
                carousel_line.stop(true).transition({'left':targ_pos},time,easyInOut,function(){
                    carousel_scroll_av=true;
                });
                if(page=='construction') {
                    make_constr_active(targ_data,time);
                }
            } else
            if(targ_class=='plans_close floor_close') {
                close_floor();
            } else
            if(targ_class=='plans_close apart_close') {
                load_floor(200);
            } else
            if(targ_class=='floor_down active') {
                plans_val['f']--;
                load_floor(100);
            } else
            if(targ_class=='floor_up active') {
                plans_val['f']++;
                load_floor(100);
            } else
            if(targ_class=='rooms_sel' || targ_class=='rooms_sel active') {
                targ.toggleClass('active').siblings('.active').removeClass('active');
                test_floors(scroll2.find('.korpus_frame:last'));
            } else
            if(targ_class=='bg_slides_arrow left' || targ_class=='bg_slides_arrow right') {
                load_bg_slide(bg_slides['num']+targ_data);
            } else
            if(targ_class=='bg_slides_dots') {
                load_bg_slide(targ_data);
            } else
            if(targ_class=='adv_str up') {
                var next_targ=$('.adv_icons.active').prev('.adv_icons');
                if(!next_targ.length) {
                    next_targ=$('.adv_icons:last');
                }
                next_targ.trigger('click');
            } else
            if(targ_class=='adv_str down') {
                var next_targ=$('.adv_icons.active').next('.adv_icons');
                if(!next_targ.length) {
                    next_targ=$('.adv_icons:first');
                }
                next_targ.trigger('click');
            } else
            if(targ_class=='road_sel n1' || targ_class=='road_sel n2' || targ_class=='road_sel n3' || targ_class=='road_sel n4') {
                load_road_text(targ_data,200);
            } else
            if(targ_class=='close_btn close_road') {
                targ.parent().transitionStop().transition({'opacity':0},400,function(){
                    $(this).hide();
                })
            } else
            if(targ_class=='open_road') {
                $('.road_frame').transitionStop().css({'opacity':0,'display':'block'}).transition({'opacity':1},500);
                load_road_text(1,0);
            }
        })
        .bind('mousemove',function(e){
            mouse_pos=e;
            move_bg();
        })

    $('.construction_fancy').live('click',function(){
        if($(this).hasClass('active')) {
            var arr=[];
            var url=$(this).data('url');
            var path=$(this).data('path');
            $.ajax({
                url: url,
                dataType: 'json',
                success: function(response){
                    var arr=[];
                    for(var i=0; i<response.length; i++) {
                        arr.push({href:path+'/'+response[i], title:response[i].replace(/\.\w+$/,'')});
                    }
                    $.fancybox(arr,{type:'image',padding:0,margin:[75,100,40,100]});
                    //console.log(arr);	
                    arr=null;
                }
            });
        } else {
            $('.carousel_dots').eq($(this).index('.carousel_item')).trigger('click');
        }
    })
    $('.adv_icons').live('click',function(){
        if(!$(this).hasClass('active')) {
            adv_pos($(this).data('targ'),1000);
        }
    })
    $('.plans_frame .korpus_icon')
        .live('mouseenter',function(){
            var alt=$(this).data('targ');
            if(paper_size) {
                paper_size.getByAlt(alt).attr({'opacity':0.4});
            }
        })
        .live('mouseleave',function(){
            var alt=$(this).data('targ');
            if(paper_size) {
                paper_size.getByAlt(alt).attr({'opacity':0});
            }
        })
});