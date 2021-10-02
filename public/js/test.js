function showAlert() {
    const category = document.getElementById("emailVal").value
    const name = document.getElementById("nameVal").value
    const price = document.getElementById("reasonVal").value
    if (price.length > 0 && name.length > 0 && category.length > 0) document.getElementById("alert1").style.display = "block";
    else document.getElementById("alert2").style.display = "block";
}