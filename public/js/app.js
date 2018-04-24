window.addEventListener('load', () => {

  const localVideo = $('#my-camera video')[0];

  const onReceiveStream = (stream, video) => {
    video.srcObject = stream;
    window.peer_stream = stream;
  }

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      window.localStream = stream;
      onReceiveStream(stream, localVideo);
    } catch (error) {
      console.log(error);
      alert('An error occurred. Please try again');
    }
  }

  getVideo();

})