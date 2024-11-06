// audioGenerator.js

let audioContext;
let oscillator;
let gainNode;

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const frequencySlider = document.getElementById("frequency");
const volumeSlider = document.getElementById("volume");
const freqValue = document.getElementById("freqValue");
const volValue = document.getElementById("volValue");

// Initialize Audio Context
function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  oscillator = audioContext.createOscillator();
  gainNode = audioContext.createGain();

  oscillator.type = "sine"; // Set the type of waveform (sine, square, sawtooth, triangle)
  oscillator.frequency.setValueAtTime(frequencySlider.value, audioContext.currentTime);
  gainNode.gain.setValueAtTime(volumeSlider.value, audioContext.currentTime);

  // Connect oscillator to gain, and gain to the audio context destination
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
}

// Start generating audio
startButton.addEventListener("click", () => {
  if (!audioContext) {
    initAudio();
  }
  oscillator.start(); // Start the oscillator
  startButton.disabled = true;
  stopButton.disabled = false;
});

// Stop generating audio
stopButton.addEventListener("click", () => {
  if (oscillator) {
    oscillator.stop(); // Stop the oscillator
    audioContext.close(); // Close the audio context
    audioContext = null; // Reset the audio context
    startButton.disabled = false;
    stopButton.disabled = true;
  }
});

// Update frequency in real-time
frequencySlider.addEventListener("input", (event) => {
  const frequency = event.target.value;
  freqValue.textContent = `${frequency} Hz`;
  if (oscillator) {
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  }
});

// Update volume in real-time
volumeSlider.addEventListener("input", (event) => {
  const volume = event.target.value;
  volValue.textContent = volume;
  if (gainNode) {
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  }
});
