/*
 * ie6-dropmenu.js
 */

window.onload = function(){
    addHoverIE6();
    removeOutline();
}

function addHoverIE6(){
    var nav = byClass('nav')[0],
        items = nav.getElementsByTagName('li'),
        i, len;
    
    for (i=0,len=items.length; i < len; i++) {
        items[i].onmouseover = function(){
            addClass(this, 'hover');
        };
        items[i].onmouseout = function(){
            removeClass(this, 'hover');
        };
    }
}

function removeOutline(){
    var anchors = byClass('a'),
        i, len;
    for (i=0,len=anchors.length; i < len; i++) {
        anchors[i].hideFocus = true;
    }
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