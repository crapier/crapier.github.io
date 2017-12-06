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
            
            stream = videojs('video-stream', {techOrder: ['flash'], flash: {swf: "video-js.swf"}});
            stream.src({type: "rtmp/mp4", src: "rtmp://" + settings.streamhost + settings.rtmpport + "/live/" + streamkey });
            
        }
    });
});

