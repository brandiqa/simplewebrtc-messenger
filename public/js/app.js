window.addEventListener('load', () => {

  // Chat platform
  const chatTemplate = Handlebars.compile($('#chat-template').html());
  const chatContentTemplate = Handlebars.compile($('#chat-content-template').html());
  const chatEl = $('#chat');
  const formEl = $('form');
  const messages = [];
  let username;

  // Local Video
  const localImageEl = $('#local-image');
  const localVideoEl = $('#local-video');

  // Remote Videos
  const remoteVideoTemplate = Handlebars.compile($('#chat-content-template').html());
  const remoteVideosEl = $('#remote-videos');
  const remoteVideosCount = 0;

  // Webrtc data
  let room;

  // Hide cameras until they are initialized
  localVideoEl.hide();

  // Add validation rules to Create/Join Room Form
  formEl.form({
    fields: {
      room: 'empty',
      username: 'empty',
    },
  });

  // create our webrtc connection
  const webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'local-video',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remote-videos',
    // immediately ask for camera access
    autoRequestMedia: true,
    debug: false,
    detectSpeakingEvents: true,
    autoAdjustMic: false
  });

   // We got access to local camera
  webrtc.on('localStream', (stream) => {
    localImageEl.hide();
    localVideoEl.show();
  });

  // Remote video was added
  webrtc.on('videoAdded', (video, peer) => {
    console.log(`Remote Video added: ${peer}`);
    const id = webrtc.getDomId(peer)
    const html = remoteVideoTemplate({ id });
    if(remoteVideosCount === 0) {
      remoteVideosEl.html(html);
    } else {
      remoteVideosEl.append(html);
    }
    $(`#${id}`).html(video);
    remoteVideosCount +=1;
  });

  // Update Chat Messages
  const updateChatMessages = () => {
    const html = chatContentTemplate({ messages });
    const chatContentEl = $('#chat-content');
    chatContentEl.html(html);
    // automatically scroll downwards
    const scrollHeight = chatContentEl.prop("scrollHeight");
    chatContentEl.animate({ scrollTop: scrollHeight }, "slow");
  }

  // Post Local Message
  const postMessage = (message) => {
    const chatMessage = {
      username,
      message,
      postedOn: new Date().toLocaleString('en-GB')
    }
    // Send to all peers
    webrtc.sendToAll("chat", chatMessage);
    // Update messages locally
    messages.push(chatMessage);
    $('#post-message').val('');
    updateChatMessages();
  }

  // Display Chat Interface
  const showChatRoom = () => {
    formEl.hide();
    const html = chatTemplate({ room });
    chatEl.html(html);
    const postForm = $('form');
    postForm.form({
      message: 'empty'
    });
    $('#post-btn').on('click', () => {
      const message = $('#post-message').val();
      postMessage(message);
    });
    $('#post-message').on('keyup', (event) => {
      if (event.keyCode === 13) {
        const message = $('#post-message').val();
        postMessage(message);
      }
    });
  }

  // Join Chat Room Session
  const enterRoom = () => {
    // Add joined message
    messages.push({
      username,
      message: `${username} joined chatroom`,
      postedOn: new Date().toLocaleString('en-GB')
    });
    showChatRoom();
    updateChatMessages();
  }

  // Register new Chat Room
  const createRoom = (roomName) => {
    console.info(`Creating new room: ${roomName}`);
    webrtc.createRoom(roomName, (err, name) => {
      room = name;
      formEl.form('clear');
      enterRoom();
    });
  }

  // Join existing Chat Room
  const joinRoom = (roomName) => {
    console.log(`Joining Room: ${roomName}`)
    webrtc.joinRoom(roomName);
    room = roomName;
    enterRoom();
  }

  // Receive message from remote user
  webrtc.connection.on('message', (data) => {
    console.log(data);
    if (data.type === 'chat') {
      const message = data.payload;
      messages.push(message);
      showChatRoom();
    }
  });

  // Room Submit Button Handler
  $('.submit').on('click', (event) => {
    if (!formEl.form('is valid')) {
      return false;
    }
    username = $('#username').val();
    const roomName = $('#room').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
    if(event.target.id === 'create-btn') {
      createRoom(roomName);
    } else {
      joinRoom(roomName);
    }

    return false;
  });
});
