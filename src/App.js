import React, { useRef, useEffect, useState } from 'react';


function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);


  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 1700, height: 1080} })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();

        //videoRef.current.srcObject = stream;
        //videoRef.current.play();
      })
      .catch(err => console.error(err));
  };

  const takePhoto = () => {
    const width = 1920;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);

  }

  const BaixarPhoto = () => {
  const photo = photoRef.current;
  const link = document.createElement('a');
  




  link.href = photo.toDataURL('/image/png');

  link.download = 'Documentos-Scanner.png';
  link.click();

  


  









  };


  

  const closePhoto = () => {
  let photo = photoRef.current;
  let ctx = photo.getContext('2d');

  ctx.clearRect(0, 0, photo.width, photo.height);
   setHasPhoto(true);
  }

  useEffect(() => {
    getVideo();
  }, [videoRef]);


  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>CAPTURE PHOTO</button>
      </div>
      <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
        <canvas ref={photoRef}></canvas>
        <button onClick={BaixarPhoto}>BAIXAR FOTO</button>
      </div>
      
    </div>
  );
}

export default App;
