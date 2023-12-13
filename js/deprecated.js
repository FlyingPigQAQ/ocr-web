'use strict';

// In this codelab, you  only stream video, not audio (video: true).
const mediaStreamConstraints = {
    video: true,
};

// The video element where the stream is displayed
const localVideo = document.querySelector('video');


const canvas = document.querySelector('canvas');
let cns = canvas.getContext('2d');
let img = new Image();
img.src = 'watermark.png';



// The local stream that's displayed on the video
let localStream;

// Handle success and add the MediaStream to the video element
function gotLocalMediaStream(mediaStream) {
    let track
    img.onload = function () {
        cns.drawImage(img, 0, 0, 100, 100);
        let canvasStream = canvas.captureStream();
        track = canvasStream.getVideoTracks()[0];
    }
    // localStream = mediaStream;
    mediaStream.addTrack(track)
    localVideo.srcObject =mediaStream;
}

// Handle error and log a message to the console with the error message
function handleLocalMediaStreamError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

// Initialize media stream
navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);


