
var streamhost = "emerzil.chickenkiller.com";
var rtmpport = "";
var hlsport = ":8080";

var users = [{
    username: "Emerzil",
    avatar: "emerzil.jpg",
    streamkey: "emerzil"
}, {
    username: "Sygge",
    avatar: "default.png",
    streamkey: "sygge"
}];

document.addEventListener("DOMContentLoaded", function (event) {
    var container = document.getElementById("container");
    var template = document.getElementById("template");

    users.forEach(function (element) {
        var copy = template.cloneNode(true);
        copy.id = "user" + element.username;

        copy.innerHTML = copy.innerHTML.replace(/!username/g, element.username)
            .replace(/!avatar/g, element.avatar)
            .replace(/!streamkey/g, element.streamkey)
            .replace(/!streamhost/g, streamhost)
            .replace(/!rtmpport/g, rtmpport)
            .replace(/!hlsport/g, hlsport);

        container.insertBefore(copy, template);
    });
});