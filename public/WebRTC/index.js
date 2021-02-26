const WebRTC = require('./webrtc')

function htmlLog(e, data) {
  log.innerHTML += "\n" + e + " " + (data || '');
}

var audio_context;
var webrtc;
let chunks = []
let mediaRecorder
let source
var input


async function startUserMedia(stream) {
  audio_context.resume()

  input = audio_context.createMediaStreamSource(stream);
  // source = audio_context.createBufferSource()
  // console.log('input');
  // console.log(input);
  // const audio = document.querySelector('audio')
  // mediaRecorder = new MediaRecorder(stream)
  htmlLog('Media stream created.');
  const audioTracks = stream.getAudioTracks()
  // 下面那行註解打開會馬上收到聲音，因為麥克風輸入後又直接馬上輸出
  // input.connect(audio_context.destination);
  // console.log(audio_context.destination);
  
  // htmlLog('Input connected to audio context destination.');
  htmlLog('Using audio device: ' + audioTracks[0].label)
  // stream.oninactive = function() {
  //   console.log('Stream ended');
  // }
  window.stream = stream
  // audio.srcObject = stream
  // webrtc = new WebRTC(stream)
  // let serverPeer = await fetch(`http:127.0.0.1:3000/api/webrtc/connection`)
  // serverPeer = await serverPeer.json()
  // await webrtc.connect(serverPeer.id)

  htmlLog('webrtc initialised.');

}

async function startRecording() {
  // mediaRecorder.start();
  // console.log(mediaRecorder.state);
  console.log("recorder started")
  webrtc = new WebRTC(input)

  let serverPeer = await fetch(`http:127.0.0.1:3000/api/webrtc/connection`)
  serverPeer = await serverPeer.json()
  await webrtc.connect(serverPeer.id)
  webrtc.start()
  // recorder && recorder.record();
  const button = document.getElementById('record')
  button.disabled = true;
  button.nextElementSibling.disabled = false;
  htmlLog('Recording...');
  // console.log(mediaRecorder);
  // webrtc.start()
  
  // mediaRecorder.ondataavailable = e => /*e.data.size && */chunks.push(e.data);
  // mediaRecorder.onstop = () => {//Quando ativar a função parar a gravação
  //   //Cria o BLOB com as partes acionadas na Matriz
  //   const blob = new Blob(chunks, { type: 'audio/wav' });
  //   }
  
//   console.log('webrtc.peerConnect')
//   console.log(webrtc.peerConnect)
// webrtc.peerConnect.peer.send(window.stream)


}


function stopRecording() {
  // recorder && recorder.stop();
  const button = document.getElementById('stop')
  button.disabled = true;
  button.previousElementSibling.disabled = false;
  htmlLog('Stopped recording.');
  webrtc.stop()
  

  // create WAV download link using audio data blob
  // createDownloadLink();
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

