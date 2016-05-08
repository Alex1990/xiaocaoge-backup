/*
 * mi-pageScroll.js
 * xiaomi-2s.html
 */

domReady( removeOutline );
domReady( pageScroll );
domReady( tabBox );

function pageScroll(){
    var i, len,
        nav = byClass('nav')[0],
        items = tag('a', nav),
        bd = document.body;
        
    for ( i = 0, len = items.length; i < len; i++ ) {
        items[i].desId = items[i].href.substr(items[i].href.indexOf('#') + 1);
        
        items[i].onclick = function(e){
            var j,
                diffY,
                e = e ? e : window.event,
                desY = pageY( id(this.desId) ),
                curY = scrollY(); 
                
            if ( e.preventDefault ) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            } 
            
            desY = parseInt(desY);
            curY = parseInt(curY);
            diffY = desY - curY;
            
            for ( j = 0; j < 21; j++ ) {
                (function(){
                    var pos = j;

                    setTimeout(function(){
                        if ( (getIEVersion() == -1) || (getIEVersion() >=7) ) {
                            window.scrollTo(0, curY + diffY * (20-pos) *
                                    (20-pos) / 400);
                        } else {
                            bd.scrollTop = curY + diffY * (20-pos) * (20-pos) / 400;
                        }
                    }, (20-pos) * 20);
                })();
            }
        }
    }
}

function tabBox(){
    var i,
        tab = byClass('tab-box');
    
    for ( i = 0, len1 = tab.length; i < len1; i++ ) {
        (function(){
            var n = i,
                j,k,len2,
                tCon = byClass('t-con', tab[n]),
                tNavItem = byClass('t-nav', tab[n])[0].getElementsByTagName('li');
            
            for ( j = 0, len2 = tNavItem.length; j < len2; j++ ) {
                tNavItem[j].onclick = function(){
                    for ( k = 0; k < len2; k++ ) {
                        removeClass(tCon[k], 'on');
                        removeClass(tNavItem[k], 'on');
                    }
                    addClass(this, 'on');
                    addClass(tCon[index(this)], 'on');
                }
            }
        })();
    }
}
function removeOutline(){
    var i,len,
        a = document.getElementsByTagName('a');
    
    for ( i = 0, len = a.length; i < len; i++ ){
        a[i].hideFocus = true;
    }
}

function id(name) {
    return document.getElementById(name);
}

function tag(tag, node) {
    node = node || document;
    return tag && node.getElementsByTagName(tag);
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

// Get the element child nodes
function child ( elem ) {
    var i, len,
        childs = [];
    for ( i = 0, len = elem.childNodes.length; i < len; i++ ) {
        if ( elem.childNodes[i].nodeType === 1 ) {
            childs.push(elem.childNodes[i]);
        }
    }
    return childs;
}

// Get the index of the element in its siblings
function index ( elem ) {
    var i, len,
        childs = elem.parentNode ? child( elem.parentNode ) : elem;
    for ( i =0, len = childs.length; i < len; i++ ) {
        childs[i].index = i;
    }
    return elem.index;
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

// The left relative to document
function pageX(elem) {
    return elem.offsetParent ? 
            elem.offsetLeft + pageX( elem.offsetParent ) :
            elem.offsetLeft;
}

// The top relative to idocument
function pageY(elem) {
    return elem.offsetParent ?
            elem.offsetTop + pageY( elem.offsetParent ) :
            elem.offsetTop;
}

// Get the current scroll left position
function scrollX() {
    var de = document.documentElement;
    
    return self.pageXOffset || ( de && de.scrollLeft ) ||
            document.body.scrollLeft;
}

// Get the current scroll top position
function scrollY() {
    var de = document.documentElement;
    
    return self.pageYOffset || ( de && de.scrollTop ) ||
            document.body.scrollTop;
}

function domReady( f ) {

    if ( domReady.done ) return f();
    
    if ( domReady.timer ) {
        domReady.ready.push( f );
    } else {
        
        // addEvent( window, "load", isDOMReady );
        window.onload = isDOMReady;
        
        domReady.ready = [ f ];

        domReady.timer = setInterval( isDOMReady, 13 );
    }
}

// Check if the DOM is enable to be operated
function isDOMReady() {
    
    if ( domReady.done ) return false;
    
    // Check if serveral functions and elements are usable
    if ( document && document.getElementById &&
            document.getElementsByTagName && document.body ) {
        
        clearInterval ( domReady.timer );
        domReady.timer = null;
        
        // Run all functions
        for ( var i = 0; i < domReady.ready.length; i++ ) {
            domReady.ready[i]();
        }
        
        // Take the finish notes
        domReady.ready = null;
        domReady.done = true;
    }
}

// Get the IE version or return -1
function getIEVersion(){
    var rv = -1;
    if ( navigator.appName == 'Microsoft Internet Explorer' ) {
        var ua = navigator.userAgent,
            re = /MSIE (\d+\.\d+)/;
        if ( re.test(ua) != null ) {
            rv = parseFloat(RegExp.$1);
        }
    }
    return rv;
}