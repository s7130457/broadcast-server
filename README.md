# broadcast-server

前端資料放在/public，後端server放在/src裡

### 小技巧
* 可以在vscode安裝open in browser套件後，在html分頁下```alt + B```就能打開瀏覽器了

### 描述
前端主要用recoderjs來收麥克風的聲音，並透過websocket將聲音後到後端去儲存成wav檔


## Start
```
npm install
npm start
```
---
## Record.js
### 改寫步驟：
1. 先安裝google擴充套件：[Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related)
2. 建立websocket.js檔，裡面建立websocket連線
3. 到recoder.js的```onaudioprocess```函式去，這裡當錄音執行時就會開始拿到event，因為普遍廣播是單聲道，所以拿```e.inputBuffer.getChannelData(0)```就夠了
4. 因為拿到的串流是float32，一般的聲音格式是int 16，因此在前端將buffer執行轉換後再透過websocket送去後端(找到的資料是用binaryjs，這裡一樣用ws就好)
```javascript=
function convertFloat32ToInt16(buffer) {
    l = buffer.length;
    buf = new Int16Array(l);
    while (l--) {
      buf[l] = Math.min(1, buffer[l])*0x7FFF;
    }
    return buf.buffer;
}
```
5. 後端就建立一個write stream開始寫檔
6. 最後下```ffplay -f s16le -ar 48000 -ac 1 -nodisp test.wav```聽聽看儲存的聲音是否正確

---

### 應用：
後續可以用rtAudio lib來將收到的聲音串流去做廣播
- [audify api](https://almogh52.github.io/audify/)
- [sox-stream](https://github.com/ArtskydJ/sox-stream) 
---
### ref:
1. 如何將recordjs去把audio buffer透過ws傳給後端：[Learning How to Capture and Record Audio in HTML5](https://yushulx.medium.com/learning-how-to-capture-and-record-audio-in-html5-6fe68a769bf9)
2. 聲音的介紹：[Web Audio之getChannelData](https://juejin.cn/post/6844904098764947463)
3. [Tutorial: HTML Audio Capture streaming to Node.js (no browser extensions)](https://subvisual.com/blog/posts/39-tutorial-html-audio-capture-streaming-to-node-js-no-browser-extensions/)
4. [後端透過ws將聲音存成wav檔](https://github.com/davehorton/simple-ws-recorder/blob/cabc2f4472fba1127d99ba1cc48292b8a0d89e1d/app.js#L12)
5. [Recoder.js](https://github.com/jergason/Recorderjs)
6. [[套件] Recorder.js 網頁版錄音程式，不限平台開啟網頁立即就可錄音](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related)

---
## WebRTC
https://ithelp.ithome.com.tw/articles/10204431