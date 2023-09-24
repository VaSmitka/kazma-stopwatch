import { Beepsound } from './BeepSound';

export const Stopwatch = function (elem: any, options: any) {
  const times = [
    { h: 0, m: 0, s: 3 },
    { h: 0, m: 3, s: 58 },
    { h: 0, m: 16, s: 37 },
    { h: 0, m: 17, s: 44 },
    { h: 0, m: 19, s: 47 },
    { h: 0, m: 23, s: 36 },
    { h: 0, m: 24, s: 32 },
    { h: 0, m: 26, s: 2 },
    { h: 0, m: 26, s: 47 },
    { h: 0, m: 27, s: 20 },
    { h: 0, m: 29, s: 27 },
    { h: 0, m: 29, s: 34 },
    { h: 0, m: 30, s: 21 },
    { h: 0, m: 31, s: 38 },
    { h: 0, m: 37, s: 13 },
    { h: 0, m: 46, s: 27 },
    { h: 0, m: 54, s: 0 },
    { h: 0, m: 54, s: 33 },
    { h: 1, m: 5, s: 16 },
  ];
  let indexTimes = 0;

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

    if (
      hrs === times[indexTimes].h &&
      min === times[indexTimes].m &&
      Math.floor(clock / 1000) === times[indexTimes].s
    ) {
      Beepsound();
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
