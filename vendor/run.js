!function(window) {
  var output = document.getElementById('output'),
      runButton = document.getElementById('run'),
      handlers = [];

  var runHandlers = function() {
    var index, length;
    output.innerHTML = '';

    try {
      for(index = 0, length = handlers.length; index < length; index++) {
        handlers[index]();
      }
      output.innerHTML += '<code class=success>Program finished successfully!</code>';
    } catch(e) {
      output.innerHTML += '<code class=error>' + e + '</code>';
    }
  };

  runButton.addEventListener('click', runHandlers);
  window.addEventListener('keypress', function(e) {
    if(e.which === 13) runHandlers();
  });

  window.frontendClass = function(handler) {
    handlers.push(handler);
  };

  window.println = function(text) {
    output.innerHTML += '<code>' + text + '</code>';
  };


}(window);
