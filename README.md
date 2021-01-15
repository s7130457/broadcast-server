# broadcast-server

前端資料放在/public，後端server放在/src裡

### 前端
* 可以在vscode安裝open in browser套件後，在html分頁下```alt + B```就能打開瀏覽器了

### ref:
1. 這篇文章有提到怎麼從recordjs去把audio buffer透過ws傳給後端：https://yushulx.medium.com/learning-how-to-capture-and-record-audio-in-html5-6fe68a769bf9
2. 要用 MediaRecorder api來收串流：https://github.com/mdn/web-dictaphone/blob/gh-pages/scripts/app.js
3. 後端可以參考這個https://stackoverflow.com/questions/31995677/audio-streaming-by-websockets
4. 拿聲音的方法：https://stackoverflow.com/questions/46623517/write-a-wav-file-in-node-js-from-an-audiobuffer
5. 小範例： https://github.com/mdn/web-dictaphone/tree/28f4bea6994f2f7b74317144659ad02161015ab4
---
現在可以收到聲音了，接下來研究改聲音的部分(以下還沒研究)
1. Web Audio之getChannelData: https://juejin.cn/post/6844904098764947463
2. ffmpeg-audiobuffer-stream: https://www.npmjs.com/package/ffmpeg-audiobuffer-stream
3. 這不知道有沒有幫助：https://stackoverflow.com/questions/60921018/web-audio-api-efficiently-play-a-pcm-stream