
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
});

