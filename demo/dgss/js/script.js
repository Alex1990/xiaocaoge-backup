/*
 * Name: dgss
 * Author: Alex Chao
 * Date: 2013-12-20
 */

document.addEventListener('DOMContentLoaded', function(e) {
    sidePanel();
    skinSet();
});

function sidePanel() {
    var skinTrigger = cls('skin-trigger')[0],
        skinPanel = cls('skin-set')[0],
        skinSetOff = cls('skin-set-off')[0];
    
    skinTrigger.addEventListener('click', function() {
        addClass(skinPanel, 'show');
    });
    
    skinSetOff.addEventListener('click', function() {
        removeClass(skinPanel, 'show');
    });
}

function skinInit() {
    var color = store.get('color') ? store.get('color') : 'green',
        bg = store.get('bg') ? store.get('bg') : 'bg-01',
        html = document.documentElement;
    addClass(html, color);
    addClass(html, bg);
}
skinInit();
    
function skinSet() {
    var i,
        j,
        len1,
        len2,
        colors = ['orange', 'green', 'blue', 'red', 'pink', 'purple', 'cyan', 'yellow', 'black', 'transparent'],
        bgsLen = 16,
        html = document.documentElement,
        colorTriggers = tag('li', cls('color-list')[0]),
        bgTriggers = tag('li', cls('bg-list')[0]);
    
    len1 = colorTriggers.length;
    for (i = 0; i < len1; i++) {
        colorTriggers[i].addEventListener('click', function(e) {
            var color = this.getAttribute('data-color-on');
            for (j = 0; j < len1; j++) {
                removeClass(colorTriggers[j], 'cur');
            }
            addClass(this, 'cur');
            for (j = 0; j < colors.length; j++) {
                removeClass(html, colors[j]);
            }
            addClass(html, color);
            store.set('color', color);
        });
    }
    
    len2 = bgTriggers.length;
    for (i = 0; i < len2; i++) {
        bgTriggers[i].addEventListener('click', function(e) {
            var bg = this.getAttribute('data-bg-on');
            for (j = 0; j < len2; j++) {
                removeClass(bgTriggers[j], 'cur');
            }
            for (j = 0; j < bgsLen; j++) {
                removeClass(html, 'bg-' + ('0' + (j+1)).slice(-2));
            }
            addClass(this, 'cur');
            addClass(html, bg);
            store.set('bg', bg);
        });
    }
}
/* base */
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

function cls(cls, parent) {
    parent = parent ? parent : document;
    return parent.getElementsByClassName(cls);
}

function tag(tag, parent) {
    parent = parent ? parent : document;
    return parent.getElementsByTagName(tag);
}