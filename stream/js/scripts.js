
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

    var stream = videojs('video-stream', {techOrder: ['flash'], flash: {swf: "video-js.swf"}});
    stream.src({type: "rtmp/mp4", src: "rtmp://emerzil.chickenkiller.com/live/" + streamkey });
});

