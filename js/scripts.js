
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

document.addEventListener("DOMContentLoaded", function (event) {
    var container = document.getElementById("container");
    var template = document.getElementById("template");
    var settings;

    getJSON("json/settings.json", function(data, status) {
        if (status != null) {
            console.log("JSON Error: " + status);
        }
        else {
            settings = data.settings;

            settings.users.forEach(function(element){
                var copy = template.cloneNode(true);
                copy.id = "user" + element.username;

                copy.innerHTML = copy.innerHTML.replace(/!username/g, element.username)
                    .replace(/!avatar/g, element.avatar)
                    .replace(/!streamkey/g, element.streamkey)
                    .replace(/!streamhost/g, settings.streamhost)
                    .replace(/!rtmpport/g, settings.rtmpport)
                    .replace(/!hlsport/g, settings.hlsport);

                container.insertBefore(copy, template);
            });

            document.querySelectorAll(".link>a").forEach(function(element){
                element.addEventListener('click',function(event){
                    event.preventDefault();
                    var video = document.getElementById("video-container");
                    if (video) {
                        video.parentElement.removeChild(video);
                    }
                    video = document.createElement("div");
                    video.id = "video-container";
                    var video_frame = document.createElement("iframe");
                    video_frame.src = event.target.href;
                    video_frame.id = "video-frame";
                    video.appendChild(video_frame);
                    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.appendChild(video);
                });
            });
        }
    });
});
