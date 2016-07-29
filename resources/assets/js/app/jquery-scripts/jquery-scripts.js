/**
 * Jquery scripts
 */




/**
 * Body resize
 */
var bodySize = function (element) {
    var body_w = $('body').width(),
        body_h = $('body').height(),
        body_d = body_h/body_w,
        content_w,
        content_h,
        ratio = 0.5621; //1250x703=0.5625 1020/1950=0.523
    if(body_d > ratio) {
        content_w = body_h/ratio;
        content_h = body_h;
        $(element).css({
            'width' : content_w,
            'height' : content_h,
            'top' : 0,
            'left' : 0.5*(body_w-content_w)
        });
    } else {
        content_w = body_w;
        content_h = body_w*ratio;
        $(element).css({
            'width': content_w,
            'height' : content_h,
            'top' : 0.5*(body_h-content_h),
            'left' : 0
        });
    }
};
/**
 * Map resize
 */
var mapResize = function (element) {
    var body_w = $('body').width(),
        body_h = $('body').height(),
        body_d = body_h/body_w,
        content_w,
        content_h,
        ratio = 0.5621; // windows.height / windows.width 703 / 1250 = 0.5625 1020/1950=0.523
    if(body_d > ratio) {
        content_w = body_h/ratio;
        content_h = body_h;
        $(element).css({
            'width' : content_w,
            'height' : content_h,
            'top' : 0,
            'left' : 0
        });
    } else {
        content_w = body_w;
        content_h = body_w*ratio;
        $(element).css({
            'width': content_w,
            'height' : content_h,
            'top' : 0,
            'left' : 0
        });
    }
};
/**
 * Help for navigation item hover, in css problem with z-index
 */
var navigationHover = function () {
    $('.nav-item').hover(
        function () {
            $(this).find('a').css('z-index', 100000);

        },
        function () {
            $(this).find('a').css('z-index', 0);
        }
    );
};

/**
 * jQuery plug-in for Raphael map draw
 */

(function ($) {
    jQuery.fn.svgDrawing = function (options) {
        console.log('SVG drawing');
        //Options
        options = $.extend({
            fill: '#FEC700',
            opacity: 0,
            cursor: 'pointer',
            onclick: function (el, e) {

            },
            onmouseover: function (el, e) {
                el.attr('opacity', 0.5);
            },
            onmouseout: function (el, e) {
                el.attr('opacity', 0);
            },
            each: function (el) {

            }
        }, options);
        var image = this;
        var name = image.attr('class') + '-draw';
        var random_name = '-' + Math.floor(Math.random() + 10000);
        image.after('<div class="' + name + '" id="' + name + random_name + '" style="position: absolute;"></div>');
        
        var draw = new ScaleRaphael(name + random_name, image.attr('width'), image.attr('height'));

        var areas = image.siblings('map').find('area');
        for(var i = 0; i < areas.length; i ++) {
            var area = areas[i];
            var points = area.coords.split(',');
            var coords = '';
            coords += 'M' + points[0] + ' ' + points[1];
            for(var j = 0; j < points.length; j += 2) {
                coords += 'L' + points[j] + ' ' + points[j + 1];
            }
            coords += 'z';
            var alt = area.alt;
            draw.path(coords).attr({
                fill: options['fill'],
                opacity: options['opacity'],
                cursor: options['cursor']
            }).data({'alt': alt});
        };

        image.siblings('map').remove();
        var arr = {};
        draw.forEach(function (el) {
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
        draw.getByAlt = function (alt) {
            return draw.getByAlt(arr[alt]);
        };

        mapResize('.map-plans-draw');
        bodySize('.page');
        mapResize('svg');
        return draw;
    };
})(jQuery);


$(document).ready(function () {
    console.log('window ready')
    $(window).bind('resize', function () {
        console.log('window resize')
        bodySize('.page');
        mapResize('svg');
    });
    bodySize('.page');
    mapResize('svg');
    navigationHover();
});

