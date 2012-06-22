!function(window) {
  var output = J('#output'),
      originalHeight = output.height(),
      runButton = J('#run'),
      stack = [],
      running = false;
  output.updateStyle('height');

  var run = function() {
    var index, length;

    running = true;
    animateDisplay(function() {
      try {
        for(index = 0, length = stack.length; index < length; index++) {
          stack[index]();
        }
        output.append('<code class=success>Program finished successfully!</code>');
      } catch(e) {
        output.append('<code class=error>' + e + '</code>');
      }
      running = false;
    });
  };

  var animateDisplay = (function() {
    var placeDots = function(dots, cbk) {
      output.append('<code>.</code>');
      setTimeout(function() {
        if(dots - 1 > 0) {
          placeDots(dots - 1, cbk);
        } else {
          resetDisplay();
          cbk();
          output.updateStyle('height');
        }
      }, 200);
    };
    
    return function(cbk) {
      resetDisplay(function() { placeDots(3, cbk) });
    };
  })();

  var resetDisplay = function(cbk) {
    output.html('');
    var current = output.height();
    if(!cbk) cbk = function() {};
    if(originalHeight === current) return cbk();

    output.height(originalHeight);
    output.once('transitionend', cbk);
  };

  window.println = function(text) {
    output.append('<code class=println>' + text + '</code>');
  };

  window.frontendClass = function(handler) {
    stack.push(handler);
  };

  runButton.on('click', run);
  J(window).on('keypress', function(e) {
    if(running) return;
    if(e.which === 13) run();
    else if(e.which === 99) resetDisplay();
  });
}(window);
