!function(window) {
  var output = J('#output'),
      originalHeight = output.height(),
      runButton = document.getElementById('run'),
      handlers = [];
  output.updateStyle('height');

  var runHandlers = function() {
    var index, length;

    animateDisplay(function() {
      try {
        for(index = 0, length = handlers.length; index < length; index++) {
          handlers[index]();
        }
        output.append('<code class=success>Program finished successfully!</code>');
      } catch(e) {
        output.append('<code class=error>' + e + '</code>');
      }
    });
  };

  var animateDisplay = function(cbk) {
    var height,
        dots = 0;
    var placeDot = function() {
      output.append('<code>.</code>');
      dots++;
      setTimeout(function() {
        if(dots < 3) {
          placeDot();
        } else {
          resetDisplay();
          cbk();
          output.updateStyle('height');
        }
      }, 200);
    };
    
    resetDisplay(placeDot);
  };

  var resetDisplay = function(handler) {
    output.html('');
    var current = output.height();
    if(!handler) handler = function() {};
    if(originalHeight === current) return handler();

    output.height(originalHeight);
    output.once('transitionend', handler);
  };

  window.println = function(text) {
    output.append('<code class=println>' + text + '</code>');
  };

  window.frontendClass = function(handler) {
    handlers.push(handler);
  };

  runButton.addEventListener('click', runHandlers);
  window.addEventListener('keypress', function(e) {
    if(e.which === 13) runHandlers();
    else if(e.which === 99) resetDisplay();
  });
}(window);
