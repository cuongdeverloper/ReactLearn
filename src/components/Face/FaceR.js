// import React, { useRef, useEffect } from 'react';
// import './face.css';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import * as faceapi from 'face-api.js';
// import nProgress from 'nprogress';

// const FaceR = () => {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const params = useParams();
//   console.log('checkpr', params)
//   const prc = params.c;
//   const navigate = useNavigate();
//   useEffect(() => {
//     startVideo();
//     videoRef && loadModels();
    
//   }, []);
  
//   const startVideo = () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((currentStream) => {
//         videoRef.current.srcObject = currentStream;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const stopVideo = () => {
//     const stream = videoRef.current.srcObject;
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach(track => track.stop());
//     }
//   };
//   const loadModels = async () => {
//     try {
//       await Promise.all([
//         faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//         // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//         faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//         faceapi.nets.faceExpressionNet.loadFromUri("/models")
//       ]);
//       faceMyDetect();
//     } catch (error) {
//       console.error('Error loading models:', error);
//     }
//   };

//   const faceMyDetect = () => {
//     setInterval(async () => {
//       const detections = await faceapi.detectAllFaces(videoRef.current,
//         // new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
//         new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
//       canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
//       faceapi.matchDimensions(canvasRef.current, {
//         width: 940,
//         height: 650
//       });
      
//       const resized = faceapi.resizeResults(detections, {
//         width: 940,
//         height: 650
//       });
// // console.log(detections)
//       // faceapi.draw.drawDetections(canvasRef.current, resized);
//       // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
//       // faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      
//       if (detections && detections.length > 0) {
//         const expressions = detections[0].expressions;
//         if(expressions.sad > 0.6) {
//           nProgress.start();
//           setTimeout(() => {
            
//             navigate('/us');
//             stopVideo()
//           }, 3000);

          
//           setTimeout(() => {
//             nProgress.done();
//           }, 3000);
//         }
//       }
//     }, 1000);
//   };

//   return (
//     <div className="myapp">
//       <h1>Face Detection</h1>
//       <button onClick={()=> stopVideo()}>Stop</button>
//       <div className="appvide">
//         <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
//       </div>
//       <canvas ref={canvasRef} width="940" height="650" className="appcanvas" />
      
//     </div>
//   );
// }

// // export default FaceR;
