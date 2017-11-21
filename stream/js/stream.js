

$(document).ready(function(){

    // install flowplayer into selected container
    flowplayer("#player", "http://releases.flowplayer.org/swf/flowplayer-3.2.18.swf", {
    
        clip: {
            url: 'emerzil',
            live: true,
            // configure clip to use hddn as our provider, referring to our rtmp plugin
            provider: 'influxis'
        },
    
        // streaming plugins are configured under the plugins node
        plugins: {
    
            // here is our rtmp plugin configuration
            influxis: {
                url: "flowplayer.rtmp-3.2.13.swf",
     
                // netConnectionUrl defines where the streams are found
                netConnectionUrl: 'rtmp://10.0.0.175/live'
            }
        },
        canvas: {
            backgroundGradient: 'none'
        }
    });
});