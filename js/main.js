/**
 * Alex Chao's blog
 * 2015-03-07
 */

(function() {

  // Shortand
  var win = window;
  var doc = document;
  var docEl = doc.documentElement;

  // Helper
  var trim = function(str) {
    if (str.trim) {
      return str.trim();
    } else {
      return str = str.replace(/^\s+/, '').replace(/\s+$/, '');
    }
  };

  var id = function(id) {
    return doc.getElementById(id);
  };

  var addEvent;
  var removeEvent;

  if (doc.addEventListener) {
    addEvent = function(elem, type, listener) {
      return elem.addEventListener(type, listener, false);
    };
    removeEvent = function(elem, type, listener) {
      return elem.removeEventListener(type, listener, false);
    };
  } else {
    addEvent = function(elem, type, listener) {
      elem[type + listener] = function() {
        e = window.event;
        e.target = e.srcElement;
        e.preventDefault = function() {
          e.returnValue = false;
        };
        e.stopPropagation = function() {
          e.cancelBubble = true;
        };
        listener.call(el, e);
      };
      return elem.attachEvent('on' + type, elem[type + listener]);
    };
    removeEvent = function(elem, type, listener) {
      return elem.detachEvent('on' + event, elem[type + listener]);
    };
  }

  var hasClass;
  var addClass;
  var removeClass;

  if (docEl.classList) {
    hasClass = function(elem, className) {
      return elem.classList.contains(className);
    };
    addClass = function(elem, className) {
      elem.classList.add(className);
    };
    removeClass = function(elem, className) {
      elem.classList.remove(className);
    };
  } else {
    hasClass = function(elem, className) {
      var re = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
      return re.test(elem.className);
    };
    addClass = function(elem, className) {
      if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
      }
    };
    removeClass = function(elem, className) {
      var re;
      if (hasClass(elem, className)) {
        re = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
        elem.className = trim(elem.className.replace(re, ' '));
      }
    };
  }

  var toggleClass = function(elem, className) {
    if (hasClass(elem, className)) {
      removeClass(elem, className);
    } else {
      addClass(elem, className);
    }
  };

  // Main

  var sidebarTrigger = id('sidebar-toggle');

  addEvent(sidebarTrigger, 'click', function(e) {
    e.stopPropagation();
    toggleClass(docEl, 'sidebar-active');
  });

  var main = id('main');

  addEvent(main, 'click', function() {
    removeClass(docEl, 'sidebar-active');
  });

})();