function showAlert() {
    const fullName = document.getElementById("fullName").value
    const address = document.getElementById("address").value
    const pincode = document.getElementById("pincode").value
    const caddress = document.getElementById("caddress").value
    const description = document.getElementById("description").value
    if (fullName.length > 0 && address.length > 0 && pincode.length > 0 && caddress.length > 0 && description.length > 0) document.getElementById("alert1").style.display = "block";
    else document.getElementById("alert2").style.display = "block";
}

function getLocation() {
    console.log("inside")
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(showPosition, hidePosition);
    else {
        console.log("Geolocation is not supported by this browser. Accessing location through your IP address.")
        ipPosition()
    }
}
function showPosition(position) {
    document.getElementById("lat").value = parseFloat(position.coords.latitude)
    document.getElementById("lon").value = parseFloat(position.coords.longitude)
}

function hidePosition(position) {
    console.log('User denied the access of the position. Now we trying to get your location through your IP address.')
    ipPosition()
}

function ipPosition() {
    $.ajax({
        url: "https://ipinfo.io/?token=" + process.env.IP_KEY,
        type: "GET",
        success: function (result) {
            var loc = result.loc.split(',');
            console.log(loc)
            document.getElementById("lat").value = parseFloat(loc[0])
            document.getElementById("lon").value = parseFloat(loc[1])
        }
    })
}