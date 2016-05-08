/*
 * slide.js
 */

window.onload = function(){
    removeOutline();
    slide();
}

function removeOutline(){
    var i,len;
    
    for ( i = 0, len = tag('a').length; i < len; i++ ) {
        tag('a')[i].hideFocus = true;
    }
}
function slide(){
    var i = 0,
        len = 2,
        box = byClass('slide-box')[0],
        boxW = parseInt(getStyle(box, 'width')),
        list = tag('ul', box)[0],
        left = parseInt(getStyle(list, 'left')),
        prev = byClass('prev')[0],
        next = byClass('next')[0];
    
    prev.onclick = function(){
        if ( i > 0 ) {
            removeClass(next, 'noff');
            for ( var j = 0; j < 16; j++ ) {
                setTimeout(function(){
                    left += boxW/16;
                    list.style.left = left + 'px';
                }, Math.pow(j+1, 1/3) * 250);
            }
            i--;
            if ( i == 0 ) {
                addClass(this, 'poff');
            }
        }
    }
    
    next.onclick = function(){
        if ( i < len ) {
            removeClass(prev, 'poff');
           for ( var j = 0; j < 16; j++ ) {
                setTimeout(function(){
                    left -= boxW/16;
                    list.style.left = left + 'px';
                }, Math.pow(j+1, 1/3) * 250);
            }
            i++;
            if ( i == len ) {
                addClass(this, 'noff');
            }
        }
    }
}

function getStyle( elem, name ) {
    
    if ( elem.style[name] ) {
        return elem.style[name];
    } else if ( elem.currentStyle ) {
        return elem.currentStyle[name];
    } else if ( document.defaultView && document.defaultView.getComputedStyle )
            {
        name = name.replace( /[A-Z]/g, "-$1" );
        name = name.toLowerCase();
        
        var s = document.defaultView.getComputedStyle(elem);
        return s && s.getPropertyValue(name);
    } else {
        return null;
    }
}

function tag(name, node) {
    node = node || document;
    return node.getElementsByTagName(name);
}

function byClass(searchClass,node,tag) {
    var classElements = new Array();
    if ( node == null )
        node = document;
    if ( tag == null )
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
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