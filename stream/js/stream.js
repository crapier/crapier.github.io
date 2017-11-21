

$(document).ready(function(){

    // install flowplayer into selected container
    flowplayer("player", "http://releases.flowplayer.org/swf/flowplayer-3.2.18.swf", {
    
        clip: {
            url: 'emerzil',
            provider: 'rtmp',
            live: true
        },
        plugins: {
            rtmp: {
                url: "flowplayer.rtmp-3.2.13.swf",
     
                netConnectionUrl: 'rtmp://10.0.0.175:1935/live',
                subscribe: true
            }
        }
    });
});