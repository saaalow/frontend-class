!function(window) {
  var output = document.getElementById('output'),
      runButton = document.getElementById('run'),
      handlers = [];

  var runHandlers = function() {
    var index, length;

    animateDisplay(function() {
      try {
        for(index = 0, length = handlers.length; index < length; index++) {
          handlers[index]();
        }
        output.innerHTML += '<code class=success>Program finished successfully!</code>';
      } catch(e) {
        output.innerHTML += '<code class=error>' + e + '</code>';
      }
    });
  };

  var animateDisplay = function(cbk) {
    var dots = 0;
    var placeDot = function() {
      output.innerHTML += '<code>.</code>';
      dots++;
      setTimeout(function() {
        if(dots < 3) {
          placeDot();
        } else {
          clearDisplay();
          cbk();
        }
      }, 200);
    };
    
    clearDisplay();
    placeDot();
  };

  var clearDisplay = function() {
    output.innerHTML = '';
  };

  window.println = function(text) {
    output.innerHTML += '<code class=println>' + text + '</code>';
  };

  window.frontendClass = function(handler) {
    handlers.push(handler);
  };

  runButton.addEventListener('click', runHandlers);
  window.addEventListener('keypress', function(e) {
    if(e.which === 13) runHandlers();
  });
}(window);
