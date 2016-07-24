$(document).ready(function () {
    $('.header-nav-drop').slideUp();
    $('.nav-button ').hover(
        function () {
            var drop = $(this).find('.header-nav-drop');
            drop.addClass('show-drop');
        },
        function () {
            var drop = $(this).find('.header-nav-drop');
            drop.removeClass('show-drop');
        }
    );
    var bodySize = function () {
        var body_w = $('body').width(),
            body_h = $('body').height(),
            body_d = body_h/body_w,
            content_w,
            content_h,
            ratio = 0.5621;
        if(body_d > ratio) {
            content_w = body_h/ratio;
            content_h = body_h;
            $('.body-frame').css({
                'width' : content_w,
                'height' : content_h,
                'top' : 0,
                'left' : 0.5*(body_w-content_w)
            });
        } else {
            content_w = body_w;
            content_h = body_w*ratio;
            $('.body-frame').css({
                'width': content_w,
                'height' : content_h,
                'top' : 0.5*(body_h-content_h),
                'left' : 0
            });
        }
    };

    $(window).bind('resize', function () {
        bodySize();
    });
    bodySize();

});

(function ($) {
    jQuery.fn.area2svg = function (options) {
        console.log('area2');
        options = $.extend({
            'opacity': 0,
            'fill': '#0000ff',
            'fill-opacity': 1,
            'stroke': '#00ff00',
            'stroke-opacity': 1,
            'stroke-width': 3,
            'cursor': 'pointer',
            'stroke-linejoin': 'round',
            onclick: function (el, e) {
            },
            onmouseover: function (el, e) {
                el.attr({'opacity': 0.5});
            },
            onmouseout: function (el, e) {
                el.attr({'opacity': 0});
            },
            each: function (el) {
            }
        }, options);
        var img = this;
        var name = img.attr('class') + '_raphael';
        var random_n = '_' + Math.floor(Math.random() * 100000000000);
        img.after('<div id="' + name + random_n + '" class="' + name + '"></div>');
        var paper = new ScaleRaphael(name + random_n, img.attr('width'), img.attr('height'));
        var areas = img.siblings('map').find('area');
        for (i = 0; i < areas.length; i++) {
            var area = areas[i];
            var points = area.coords.split(',');
            var newpoints = '';
            newpoints += 'M' + points[0] + ' ' + points[1];
            for (j = 0; j < points.length; j += 2) {
                newpoints += 'L' + points[j] + ' ' + points[j + 1];
            }
            newpoints += ' z';
            var alt = area.alt;
            if (alt == '') {
                alert('null alt at line ' + i);
            }
            if (area.shape != 'poly') {
                alert('no poly shape at line ' + i);
            }
            paper.path(newpoints).attr({
                'opacity': options['opacity'],
                'fill': options['fill'],
                'fill-opacity': options['fill-opacity'],
                'stroke': options['stroke'],
                'stroke-opacity': options['stroke-opacity'],
                'stroke-width': options['stroke-width'],
                'cursor': options['cursor'],
                'stroke-linejoin': options['stroke-linejoin']
            }).data({'alt': alt});
        }
        ;
        img.siblings('map').remove();
        var arr = {};
        paper.forEach(function (el) {
            el.node.onclick = function (e) {
                options.onclick(el, e);
            };
            el.node.onmouseover = function (e) {
                options.onmouseover(el, e);
            };
            el.node.onmouseout = function (e) {
                options.onmouseout(el, e);
            };
            options.each(el);
            arr[el.data('alt')] = el.id;
        });
        paper.getByAlt = function (alt) {
            return paper.getById(arr[alt]);
        };
        return paper;
    };
})(jQuery);