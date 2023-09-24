export const Stopwatch = function (elem: any, options: any) {
  let timer = createTimer(),
    startButton = createButton('start', start),
    stopButton = createButton('stop', stop),
    resetButton = createButton('reset', reset),
    offset: any,
    clock: any,
    interval: any,
    hrs = 0,
    min = 0;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // append elements
  elem.appendChild(timer);
  elem.appendChild(startButton);
  elem.appendChild(stopButton);
  elem.appendChild(resetButton);

  // initialize
  reset();

  function createTimer() {
    return document.createElement('span');
  }

  function createButton(action: any, handler: any) {
    if (action !== 'reset') {
      let a = document.createElement('a');
      a.href = '#' + action;
      a.innerHTML = action;
      a.addEventListener('click', function (event) {
        handler();
        event.preventDefault();
      });
      return a;
    } else if (action === 'reset') {
      let a = document.createElement('a');
      a.href = '#' + action;
      a.innerHTML = action;
      a.addEventListener('click', function (event) {
        clean();
        event.preventDefault();
      });
      return a;
    }
  }

  function start() {
    if (!interval) {
      offset = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render();
  }

  function clean() {
    min = 0;
    hrs = 0;
    clock = 0;
    render();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    if (Math.floor(clock / 1000) === 60) {
      min++;
      reset();
      if (min === 60) {
        min = 0;
        hrs++;
      }
    }
    timer.innerHTML =
      hrs +
      '<p>hrs</p>' +
      min +
      '<p>min</p>' +
      Math.floor(clock / 1000) +
      '<p>sec</p>';
  }

  function delta() {
    var now = Date.now(),
      d = now - offset;

    offset = now;
    return d;
  }
};
