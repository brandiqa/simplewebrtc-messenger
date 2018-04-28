# Simple WebRTC Messenger

A tutorial on building a WebRTC video chat app with [SimpleWebRTC](https://simplewebrtc.com/) , that allows you to communicate with (for example) your customers in real-time.

Article URL: [http://www.sitepoint.com/webrtc-video-chat-application-peerjs](http://www.sitepoint.com/webrtc-video-chat-application-peerjs)

## Requirements

* [Node.js](http://nodejs.org/) Environment
* An account with [now.sh](https://zeit.co/now)

## Installation Steps

1. Clone repository
2. Run `npm install`
3. Start the server with `npm start` or `node server`
4. Visit [http://localhost:3000/](http://localhost:3000/)

HTTPS is required for remote cameras and remote microphone to work. Currently, there's no known method for creating SSL certificates for a private IP address. You can easily acquire a free SSL certificate for a public domain.

## Deployment Steps

If you would like to quickly test out the app on a public domain without dealing with the hassles of setting up SSL, simply deploy they app with [now.sh](https://zeit.co/now)

1. Clone repository
2. Run `npm install`
3. Run `npm install -g now`
4. Deploy the server with `now --public`. Follow the printed out instructions
5. Visit the url provided
6. Enter room name and username, click 'Create Room'
7. Invite a friend or use another device with a front camera, visit the url. Give another name but provide the same room name
8. Remote videos should show up on both videos. You can also send chat which also works without video

If the video stutters or freezes, it's probably due to the slow upload speeds given by your ISP.

## License

The MIT License (MIT) Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
