window.addEventListener('load', () => {

  const chatRoomTemplate = Handlebars.compile($('#chat-room-template').html());

  const localVideo = $('#local-video');
  const remoteVideo = $('#remote-video');
  const localImage = $('#local-image');
  const remoteImage = $('#remote-image');
  const chat = $('#chat');
  const form = $('form');

  const messages = [];
  let username;

  // Hide cameras until they are initialized
  localVideo.hide();
  remoteVideo.hide();

  // create our webrtc connection
  // var webrtc = new SimpleWebRTC({
  //   // the id/element dom element that will hold "our" video
  //   localVideoEl: 'local-video',
  //   // the id/element dom element that will hold remote videos
  //   remoteVideosEl: 'remote-video',
  //   // immediately ask for camera access
  //   autoRequestMedia: true,
  //   debug: false,
  //   detectSpeakingEvents: true,
  //   autoAdjustMic: false
  // });

  // // We got access to local camera
  // webrtc.on('localStream', function (stream) {
  //   localImage.hide();
  //   localVideo.show();
  // });

  const receiveMessage = () => {

  }

  const postMessage = () => {

  }

  const showChatRoom = () => {
    form.hide();
    const html = chatRoomTemplate({ messages });
    chat.html(html);
  }

  const createRoomHandler = () => {
    if (!form.form('is valid')) {
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

  // Form Validation Rules
  form.form({
    fields: {
      room: 'empty',
      username: 'empty',
    },
  });
  $('#create-btn').on('click', createRoomHandler);

});