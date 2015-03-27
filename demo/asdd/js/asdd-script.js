/**
 * ansuodd script
 */
domReady(function() {
    Echo.init({
        offset: 100,
        throttle: 250
    });
    setSlider();
    nav();
    hideLine();
});

function hideLine() {
    var i,
        len,
        anchors = document.getElementsByTagName('a');
    for (i = 0, len = anchors.length; i < len; i++) {
        anchors[i].hideFocus = true;
    }
}

/* swipe slider set */
function setSlider() {
    var i,
        len,
        frag,
        indicator,
        slider = document.getElementById('slider'),
        sliderNav = document.getElementById('slider-nav'),
        sliderImgs = tag('img', slider),
        sliderNavPara = tag('p', sliderNav)[0];
    
    len = sliderImgs.length;
    frag = document.createDocumentFragment();
    for (i = 0; i < len; i++) {
        indicator = document.createElement('a');
        indicator.appendChild(document.createTextNode(i));
        frag.appendChild(indicator);
    }
    sliderNavPara.appendChild(frag);
    
    window.mySwipe = Swipe(slider, {
        speed: 400,
        auto: 3000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index) {
            var sliderNav =  document.getElementById('slider-nav'),
                navItems = sliderNav.getElementsByTagName('a');
            
            for (var i = 0, len = navItems.length; i < len; i++) {
                removeClass(navItems[i], 'cur');
            }
            addClass(navItems[index], 'cur');
        }
    });
}

function nav() {
    var i,
        len,
        mainCSS = cls('main-css')[0],
        selector = '.nav .has-subnav',
        stylesheet,
        stylesheets = document.styleSheets,
        nav = cls('nav')[0],
        navItems = cls('has-subnav', nav);

    for (i = 0; i < stylesheets.length; i++) {
        if (stylesheets[i].ownerNode && stylesheets[i].ownerNode === mainCSS) {
            stylesheet = stylesheets[i];
        }
    }

    for (i = 0, len = navItems.length; i < len; i++) {
        (function() {
            var j,
                len,
                height = 0,
                navItem = navItems[i],
                subnav = cls('subnav', navItem)[0],
                subnav = cls('subnav', navItem)[0],
                childs = subnav.childNodes,
                subnavs = cls('subnav');
                

            len = childs.length;
            for (j = 0; j < len; j++) {
                if (childs[j].nodeType == 1) {
                    height += childs[j].offsetHeight;
                }
            }
            height += 'px';

            if (stylesheet.addRule) {
                stylesheet.addRule(selector + ' .subnav-show', 'max-height: ' + height);
            } else {
                stylesheet.insertRule(selector + ' .subnav-show' + '{ max-height: ' + height + '; }', 0);
            }
            selector += ' + .has-subnav';

            if (isTouch()) {
                addEvent(navItem, 'touchstart', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var i,
                        len;

                    len = subnavs.length;
                    for (i = 0; i < len; i++) {
                        if (!(subnavs[i] == subnav)) {
                            removeClass(subnavs[i], 'subnav-show');
                        }
                    }

                    if (hasClass(subnav, 'subnav-show')) {
                        removeClass(subnav, 'subnav-show');
                    } else {
                        addClass(subnav, 'subnav-show');
                    }
                });
            } else {
                addEvent(navItems[i], 'mouseover', function(e) {
                    addClass(subnav, 'subnav-show');
                });
                addEvent(navItems[i], 'mouseout', function() {
                    removeClass(subnav, 'subnav-show');
                });
            }
        })();
    }

    addEvent(document.body, 'touchstart', function(e) {
        var i,
            len,
            subnavs = cls('subnav');
        for (i = 0, len = subnavs.length; i < len; i++) {
            removeClass(subnavs[i], 'subnav-show');
        }
    });

    function show(el) {
        addClass(el, 'subnav-show');
    }
}

// Base
function isTouch() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

function tag(tag, parent) {
    parent = parent || document;
    return parent.getElementsByTagName(tag);
}

function cls(cls, parent) {
    parent = parent || document;
    if (parent.getElementsByClassName) {
        return parent.getElementsByClassName(cls);
    } else {
        var i,
            len,
            els = [],
            reg = new RegExp('(^|\\s+)' + cls + '(\\s+|$)'),
            all = parent.getElementsByTagName('*');
        for (var i = 0, len = all.length; i < len; i++) {
            if (reg.test(all[i].className)) {
                els.push(all[i]);
            }
        }
        return els;
    }
}

function hasClass(obj, cls) {
    return obj.className && obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg1 = new RegExp('(\\s|^)' + cls + '(\\s|$)'),
            reg2 = new RegExp('\\s' + cls + '\\s');
        obj.className = reg2.test(obj.className) ?
                obj.className.replace(reg2, ' ') :
                obj.className.replace(reg1, '');
    }
}

function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
        obj[type+fn] = function() {
            var e = window.event;
            e.preventDefault = function() {
                e.returnValue = false;
            };
            e.stopPropagation = function() {
                e.cancelBubble = true;
            };
            fn(e);
        };
        obj.attachEvent('on' + type, obj[type+fn]);
    }
}

function domReady(fn) {
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn, false);
    } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                fn();
            }
        });
    }
}