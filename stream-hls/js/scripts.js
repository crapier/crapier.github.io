
var stream;

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

    stream = videojs('video-stream');
    stream.src({type: "application/x-mpegURL", src: "http://emerzil.chickenkiller.com:8080/hls/" + streamkey + ".m3u8" });
    
    
    // Custom seek controls/buttons
    function fullRewind() {
        if(!stream.seeking()) {
            stream.currentTime(stream.seekable().start(0) + 15);
        }
    }
    
    function fullForward() {
        if(!stream.seeking()) {
            stream.currentTime(stream.seekable().end(0));
        }
    }
    
    function stepRewind() {
        if(!stream.seeking()) {
            var seekTime = stream.currentTime() - 15;
            if (seekTime < stream.seekable().start(0) + 15) {
                seekTime = stream.seekable().start(0) + 15;
            }
            stream.currentTime(seekTime);
        }
    }
    
    function stepForward() {
        if(!stream.seeking()) {
            var seekTime = stream.currentTime() + 15;
            if (seekTime > stream.seekable().end(0)) {
                seekTime = stream.seekable().end(0);
            }
            stream.currentTime(seekTime);
        }
    }
    
    $(".vjs-live-display").click(fullForward);
    
    $('<div/>', {
        style: 'padding-left: 15px',
        text: '<<<<Rewind',
        click: fullRewind
    }).appendTo('.vjs-live-control.vjs-control');
    
    $('<div/>', {
        style: 'padding-left: 15px',
        text: '<<Step Back',
        click: stepRewind
    }).appendTo('.vjs-live-control.vjs-control');
    
    $('<div/>', {
        style: 'padding-left: 15px',
        text: 'Step Forward>>',
        click: stepForward
    }).appendTo('.vjs-live-control.vjs-control');
});

