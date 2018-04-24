window.addEventListener('load', () => {

  const roomChatTemplate = Handlebars.compile($('#chat-room-template').html());

  const myCamera = $('#my-camera');
  const peerCamera = $('#peer-camera');
  const myImage = $('#my-image');
  const peerImage = $('#peer-image');
  const room = $('#room-wrapper');

  // Hide cameras until they are initialized
  myCamera.hide();
  peerCamera.hide();

  // Create Room Form Validation Rules
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

  const onReceiveStream = (stream, video) => {
    video.srcObject = stream;
    window.peer_stream = stream;
  }

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      window.localStream = stream;
      const video = myCamera.find('video')[0];
      onReceiveStream(stream, video);
      myImage.hide();
      myCamera.show();
    } catch (error) {
      console.log(error);
      alert('An error occurred. Please try again');
    }
  }

  getVideo();

})