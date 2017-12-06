
var stream;

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
            callback(xhr.response, null);
        }
        else {
            callback(xhr.response, status);
        }
    };
    xhr.send();
}

$(document).ready(function(){
    var parameters = function() {
        var parameters = document.location.href;
        if (parameters.indexOf('?') < 0) {
            return {};
        }
        parameters = parameters.substring(parameters.indexOf('?') + 1);
        parameters = parameters.split('&');
        parameters.forEach(function(element, index, params) {
            params[index] = element.split('=');
        });
        var parametersObj = {};
        parameters.forEach(function(element) {
            if(element.length == 2) {
                parametersObj[element[0]] = element[1];
            }
        });
        return parametersObj;
    }();
    var streamkey = parameters['id'] ? parameters['id'] : 'emerzil';
    var settings;
    
    getJSON("../json/settings.json", function(data, status) {
        if (status != null) {
            console.log("JSON Error: " + status);
        }
        else {
            settings = data.settings;
            
            stream = videojs('video-stream');
            stream.src({type: "application/x-mpegURL", src: "https://" + settings.streamhost + settings.hlsport + "/hls/" + streamkey + ".m3u8" });
            
            
            // Custom seek controls/buttons
            function fullRewind() {
                if(!stream.seeking()) {
                    stream.currentTime(stream.seekable().start(0) + 15);
                }
                $('#live-indicator').removeClass('red');
            }
            
            function fullForward() {
                if(!stream.seeking()) {
                    stream.currentTime(stream.seekable().end(0));
                }
                $('#live-indicator').addClass('red');
            }
            
            function stepRewind() {
                if(!stream.seeking()) {
                    var seekTime = stream.currentTime() - 15;
                    if (seekTime < stream.seekable().start(0) + 15) {
                        seekTime = stream.seekable().start(0) + 15;
                    }
                    stream.currentTime(seekTime);
                }
                $('#live-indicator').removeClass('red');
            }
            
            function stepForward() {
                if(!stream.seeking()) {
                    var seekTime = stream.currentTime() + 15;
                    if (seekTime > stream.seekable().end(0)) {
                        seekTime = stream.seekable().end(0);
                        $('#live-indicator').addClass('red');
                    }
                    stream.currentTime(seekTime);
                }
                
            }
            
            $(".vjs-live-display").click(fullForward)
                .html("Live <span id='live-indicator' class='red'>&#9210;<span>")
                .prop('title', 'Go Live');
            
            $('<div/>', {
                style: 'padding-left: 15px; font-size: 20px',
                html: '&#9198;',
                title: 'Rewind 10m',
                click: fullRewind
            }).appendTo('.vjs-live-control.vjs-control');
            
            $('<div/>', {
                style: 'padding-left: 15px; font-size: 20px',
                html: '&#8630;',
                title: 'Step Back 15s',
                click: stepRewind
            }).appendTo('.vjs-live-control.vjs-control');
            
            $('<div/>', {
                style: 'padding-left: 15px; font-size: 20px',
                html: '&#8631;',
                title: 'Step Forward 15s',
                click: stepForward
            }).appendTo('.vjs-live-control.vjs-control');
        }
    });
});

