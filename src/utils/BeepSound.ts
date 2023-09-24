export const Beepsound = function () {
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = 800;
  oscillator.connect(context.destination);
  oscillator.start();
  // Beep for 500 milliseconds
  setTimeout(function () {
    oscillator.stop();
  }, 100);
};
