const WebRTC = require('./webrtc')

function htmlLog(e, data) {
  log.innerHTML += "\n" + e + " " + (data || '');
}

var audio_context;
var webrtc;
var input


async function startUserMedia(stream) {
  audio_context.resume()
  input = audio_context.createMediaStreamSource(stream);
  htmlLog('Media stream created.');
  const audioTracks = stream.getAudioTracks()
  // 下面那行註解打開會馬上收到聲音，因為麥克風輸入後又直接馬上輸出
  // input.connect(audio_context.destination);
  // console.log(audio_context.destination);
  
  // htmlLog('Input connected to audio context destination.');
  htmlLog('Using audio device: ' + audioTracks[0].label)
  window.stream = stream
  htmlLog('webrtc initialised.');
  webrtc = new WebRTC(input)
  // 跟server的webrtc連接
  let serverPeer = await fetch(`http:127.0.0.1:3000/api/webrtc/connection`)
  serverPeer = await serverPeer.json()
  await webrtc.connect(serverPeer.id)
}

async function startRecording() {
  webrtc.start()
  const button = document.getElementById('record')
  button.disabled = true;
  button.nextElementSibling.disabled = false;
  htmlLog('Recording...');
}


function stopRecording() {
  const button = document.getElementById('stop')
  button.disabled = true;
  button.previousElementSibling.disabled = false;
  htmlLog('Stopped recording.');
  webrtc.stop()
}


window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    audio_context = new AudioContext;
    htmlLog('Audio context set up.');
    htmlLog('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));

    const record = document.getElementById('record')
    record.addEventListener('click', startRecording, false)

    const stop = document.getElementById('stop')
    stop.addEventListener('click', stopRecording, false)

  } catch (e) {
    alert('No web audio support in this browser!');
  }

  navigator.getUserMedia({ audio: true }, startUserMedia, function (e) {
    htmlLog('No live audio input: ' + e);
  });
};

