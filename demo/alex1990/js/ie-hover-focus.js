/*
 * Make the IE6 support hover on any element by adding class '.hover'
 * Make the IE6/7 support focus on inputable element by adding class '.focus'
 */

domReady(addHoverFocus);

function addHoverFocus() {
    var hoverElems = getElementsByClassName(document, 'ie-hover'),
        focusElems = getElementsByClassName(document, 'ie-focus');
    
    for (var i = 0, len = hoverElems.length; i < len; i++) {
        hoverElems[i].onmouseover= function() {
            addClass(this, 'hover');
        };
        hoverElems[i].onmouseout = function() {
            removeClass(this, 'hover');
        };
    }
    
    for (var i = 0, len = focusElems.length; i < len; i++) {
        focusElems[i].onfocus = function() {
            addClass(this, 'focus');
        };
        focusElems[i].onblur = function() {
            removeClass(this, 'focus');
        };
    }
}

function getElementsByClassName(node, classname) {
    if (node.getElementsByClassName) {
        return node.getElementsByClassName(classname);
    } else {
        var results = new Array();
        var elems = node.getElementsByTagName("*");
        for (var i=0; i<elems.length; i++) {
            if (elems[i].className.indexOf(classname) != -1) {
                results[results.length] = elems[i];
            }
        }
        return results;
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