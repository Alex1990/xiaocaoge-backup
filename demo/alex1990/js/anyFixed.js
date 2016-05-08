/*
 * Name: anyFixed.js
 * Description: Make an element fixing on appointed position when scroll
 * Author: Alex Chao (http://alex1990.com)
 * Site: https://github.com/Alex1990/anyFixed
 * Version: 0.1 beta
 */

function anyFixed(settings) {

    // The default settings
    var defaults = {
        fixedObj: '#fixedBar',
        pos: '',
        marginTop: 0
    }

    var elem,
        elemY,
        placeElem,
        settings = objMerge(defaults, settings);
    
    // Get the fixed element by id or class
    if (/^#\w+/.test(settings.fixedObj)) {
        elem = document.getElementById(settings.fixedObj.slice(1));
    } else if (/^\.\w+/.test(settings.fixedObj)) {
        elem = getElementsByClass(settings.fixedObj.slice(1));
    } else {
        elem = null;
    }
    
    if (settings.pos == 'origin') {
    
        elemY = pageY(elem);
        fixedElem(elem, elemY);

    } else if (settings.pos == 'top') {

        window.onscroll = function(e) {
            if (!placeElem && (pageY(elem) - scrollY()) < 0) {
                placeElem = fixedElem(elem, 0);
            }
            if (placeElem && (pageY(placeElem) - scrollY() > 0)) {
                unfixedElem(elem);
                placeElem = null;
            }
        }
    } else {

        window.onscroll = function(e) {
            if (!placeElem && (pageY(elem) - scrollY()) < settings.marginTop) {
                elemY = settings.marginTop;
                placeElem = fixedElem(elem, elemY);
            }
            if (placeElem && (pageY(placeElem) - scrollY()) > 
                    settings.marginTop) {
            
                unfixedElem(elem);
                placeElem = null;
            }
        }
    }
    
}

function fixedElem(elem,elemY) {

    var placeElem,
        elemX,
        elemW,
        elemH;
    
    // Create the same node to fixed element,
    // and set the style of node to the original style of fixed element
    placeElem = document.getElementById(elem.id + '-placeholder') ?
            document.getElementById(elem.id + '-placeholder') :
            document.createElement(elem.nodeName);
    placeElem.id = elem.id + '-placeholder';
    placeElem.style.position = getStyle(elem, 'position');
    placeElem.style.width = elem.offsetWidth + 'px';
    placeElem.style.height = elem.offsetHeight + 'px';
    placeElem.style.left = getStyle(elem, 'left');
    placeElem.style.top = getStyle(elem, 'top');
    
    if (typeof placeElem.style.cssFloat != 'undefined') {
        placeElem.style.cssFloat = getStyle(elem, 'float') ?
                getStyle(elem, 'float') : getStyle(elem, 'cssFloat');
    } else if (typeof placeElem.style.styleFloat != 'undefined') {
        placeElem.style.styleFloat = getStyle(elem, 'styleFloat');
    }
    
    // Get the current position of fixed element
    elemX = pageX(elem);
    
    // Get the padding and border width of fixed element
    elemPL = getStyle(elem, 'padding-left');
    elemBLW = getStyle(elem, 'border-left-width');
    elemPR = getStyle(elem, 'padding-right');
    elemBRW = getStyle(elem, 'border-right-width');
    elemPT = getStyle(elem, 'padding-top');
    elemBTW = getStyle(elem, 'border-top-width');
    elemPB = getStyle(elem, 'padding-bottom');
    elemBBW = getStyle(elem, 'border-bottom-width');
    
    // In IE, it returns nothing using elem.currentStyle('width') when the
    // width of element isn't defined explicitly.
    // But the elem.offsetWidth contains the width, padding and border-width.
    // So we must substract the padding and border-width
    elemW = (elem.offsetWidth - elemPL - elemPR - elemBLW - elemBRW) + 'px';
    elemH = (elem.offsetHeight - elemPT - elemPB - elemBTW - elemBBW) + 'px';
    
    // Insert the new placeElem before the fixed element
    elem.parentNode.insertBefore(placeElem,elem);
    
    // Set the position and size of fixed element
    elem.style.position = 'fixed';
    elem.style.left = elemX + 'px';
    elem.style.top = elemY + 'px';
    elem.style.width = elemW;
    elem.style.height = elemH;
    
    return placeElem;
}

// Restore the fixed element
function unfixedElem(elem) {
    var placeElem = document.getElementById(elem.id + '-placeholder');
    elem.style.position = placeElem.style.position;
    placeElem.parentNode.replaceChild(elem, placeElem);
    placeElem.parentNode ? placeElem.parentNode.removeChild(placeElem) : null;
}

// Merge obj1 and obj2. If the property of obj1 is same to obj2's,
// it will be coverd.
function objMerge(obj1, obj2) {
    if ((typeof obj1 != 'object') || (typeof obj2 != 'object')) {
        return;
    }
    
    for (var prop2 in obj2) {
        obj1[prop2] = obj2[prop2];
    }
    
    return obj1;
}

function getElementsByClass(searchClass,node,tag) {
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

// Get the current style of the element
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

// Return the scrollbar left distance
function scrollX() {
    var de = document.documentElement;
    
    return self.pageXOffset || ( de && de.scrollLeft ) ||
            document.body.scrollLeft;
}

// Return the scrollbar top distance
function scrollY() {
    var de = document.documentElement;
    
    return self.pageYOffset || ( de && de.scrollTop ) ||
            document.body.scrollTop;
}

// The left relative to document
function pageX(elem) {
    return elem.offsetParent ? 
            elem.offsetLeft + pageX( elem.offsetParent ) :
            elem.offsetLeft;
}

// The top relative to document
function pageY(elem) {
    return elem.offsetParent ?
            elem.offsetTop + pageY( elem.offsetParent ) :
            elem.offsetTop;
}