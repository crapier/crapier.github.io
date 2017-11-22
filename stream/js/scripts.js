
$(document).ready(function(){
    var stream = videojs('video-stream', {techOrder: ['flash']});
    stream.src({type: "rtmp/mp4", src: "rtmp://emeraldserver.chickenkiller.com/live/emerzil"});
});
            