window.addEventListener('load', () => {

  // grab the room from the URL
  const room = location.search && location.search.split('?')[1];

  // const roomChatTemplate = Handlebars.compile($('#chat-room-template').html());

  const localVideo = $('#local-video');
  const remoteVideo = $('#remote-video');
  const localImage = $('#local-image');
  const remoteImage = $('#remote-image');
  // const roomEl = $('#room-wrapper');

  // Hide cameras until they are initialized
  localVideo.hide();
  remoteVideo.hide();

  // create our webrtc connection
  var webrtc = new SimpleWebRTC({
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
  webrtc.on('localStream', function (stream) {
    localImage.hide();
    localVideo.show();
  });

  // Form Validation Rules
  $('form').form({
    fields: {
      room: 'empty',
    },
  });
  $('.submit').on('click', () => {
    const roomName = $('#room').val();
    console.log(roomName);
    $('form').form('clear');
    return false;
  });

  // const onReceiveStream = (stream, video) => {
  //   video.srcObject = stream;
  //   window.peer_stream = stream;
  // }

  // const getVideo = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //     window.localStream = stream;
  //     const video = myCamera.find('video')[0];
  //     onReceiveStream(stream, video);
  //     myImage.hide();
  //     myCamera.show();
  //   } catch (error) {
  //     console.log(error);
  //     alert('An error occurred. Please try again');
  //   }
  // }

  // getVideo();

});