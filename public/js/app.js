window.addEventListener('load', () => {

  const chatRoomTemplate = Handlebars.compile($('#chat-room-template').html());

  const localVideoEl = $('#local-video');
  const remoteVideoEl = $('#remote-video');
  const localImageEl = $('#local-image');
  const remoteImageEl = $('#remote-image');
  const chatEl = $('#chat');
  const formEl = $('form');

  // Webrtc data
  let room;

  // Chat data
  const messages = [];
  let username;

  // Hide cameras until they are initialized
  localVideoEl.hide();
  remoteVideoEl.hide();

  // create our webrtc connection
  const webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'local-video',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remote-video',
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

  // Receive message from remote user
  webrtc.connection.on('message', (data) => {
    console.log(data);
    if(data.type === 'chat') {
      const message = data.payload;
      messages.push(message);
      showChatRoom();
    }
  });

  const createRoom = (roomName) => {
    console.info(`Creating new room: ${roomName}`);

    webrtc.createRoom(roomName, (err, name) => {
      room = name;
      formEl.form('clear');
      displayRoom();
    });
  }

  const addToRoom = () => {
    // Add joined message
    messages.push({
      username,
      message: `${username} joined chatroom`,
      postedOn: new Date().toLocaleString('en-GB')
    });
    showChatRoom();
  }

  const joinRoom = (roomName) => {
    console.log(`Joining Room ${roomName}`)
    webrtc.joinRoom(roomName);
    room = roomName;
    addToRoom();
  }

  // Form Validation Rules
  formEl.form({
    fields: {
      room: 'empty',
      username: 'empty',
    },
  });
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
    showChatRoom();
  }

  const showChatRoom = () => {
    formEl.hide();
    const html = chatRoomTemplate({ room, messages });
    chatEl.html(html);
    const postForm = $('form');
    postForm.form({
      message: 'empty'
    });
    $('#post-btn').on('click', () => {
      const message = $('#post-message').val();
      postMessage(message);
    })
  }

  const createRoomHandler = () => {
    if (!formEl.form('is valid')) {
      return false;
    }
    const roomName = $('#room').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
    console.log(roomName);
    webrtc.createRoom(roomName, (err, name) => {
      console.log(' create room cb');
      const newUrl = location.pathname + '?' + name;
      if (!err) {
        history.replaceState({ foo: 'bar' }, null, newUrl);
        setRoom(name);
        $('form').form('clear');
      } else {
        console.log(err);
      }
    });
    return false;
  }

});