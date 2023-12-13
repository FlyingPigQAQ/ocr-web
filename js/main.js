// navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
//     console.log("111")
//     let video = document.getElementById('v1');
//     video.srcObject = stream;
//     video.play();
//     console.log("222")
// // 在video元素上添加水印
//     let canvas = document.createElement('canvas');
//     let ctx = canvas.getContext('2d');
//
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//
//     let img = new Image();
//     img.src = '../bg.png';
//     img.onload = function () {
//         console.log(222333)
//         // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//
//         // 创建新的MediaStreamTrack
//         let canvasStream = canvas.captureStream();
//         let track = canvasStream.getVideoTracks();
//         let newStream = new MediaStream(track);
//
//         // 将新的MediaStream添加到video元素
//         let newVideo = document.getElementById('v2');
//         newVideo.srcObject = newStream;
//         newVideo.play();
//     };
// }).catch(function (err) {
//     console.log("获取媒体流失败：" + err);
// });

let img = new Image();
img.src = '../bg.png';
img.onload = function () {


    navigator.mediaDevices.getUserMedia({video: {width: 960, height: 680},})
        .then(function (mediaStream) {
            let hiddenVideo = document.querySelector('video.hidden') // A video that is not displayed to the user
            hiddenVideo.srcObject = mediaStream // Play the stream on the hidden video

            let canvas = document.querySelector('canvas'); // Get a canvas element, by creating or querying it (it may be hidden using 'display:none')
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 10, 10);
            console.log(hiddenVideo.videoWidth + "，" + hiddenVideo.videoHeight)

            let newStream = canvas.captureStream()
            let rVFC = () => {
                ctx.drawImage(hiddenVideo, 0, 0, hiddenVideo.videoWidth, hiddenVideo.videoHeight); // Draw the video image on your canvas

                ctx.drawImage(img, 100, 20, 100, 100); // Draw the video image on your canvas

                // ... Manipulate your canvas here ...
                hiddenVideo.requestVideoFrameCallback(rVFC)
            }
            hiddenVideo.requestVideoFrameCallback(rVFC)

            var video = document.querySelector('video.shown');


            video.srcObject = newStream; // Display the canvas edit on the video
        }).catch(function (err) {
        console.log(err.name + ": " + err.message);
    });

}


function takePhoto() {
    var video = document.querySelector('video.hidden');
    var canvas = document.getElementById("showPic");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
}

