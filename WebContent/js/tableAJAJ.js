/**
 * Created by Richk on 04-Apr-17.
 */

function loadTable() {
    createTableHeader();

    $(document).ready(function () {
        $.get("DevicesListAJAJ", function (data, status) {
            var deviceJSON = data;
            //    alert (deviceJSON);
            //device = JSON.parse(DeviceJSON);
            //document.getElementById("Email").innerHTML = Person.email;

            loadDevicesJSONtoTable(deviceJSON);
        });
    });

    /* sc.onload = function () {
         document.getElementById("Logout").innerHTML = lang.logout;
         document.getElementById("Lang").innerHTML = lang.lang;
     };
     */
}


function EditField(name, IP, serverPort, lastConnection) {
    var editForm = document.getElementById("EditForm");
    editForm.style.display = "inline";

    var editButton = document.getElementById("AddForm");
    //editButton.style.display = "none";

    document.getElementById("name_OE").value = name;
    document.getElementById("name_E").value = name;
    document.getElementById("IP_OE").value = IP;
    document.getElementById("IP_E").value = IP;
    document.getElementById("serverPort_OE").value = serverPort;
    document.getElementById("serverPort_E").value = serverPort;
    document.getElementById("lastConnection_OE").value = lastConnection;
    document.getElementById("lastConnection_E").value = lastConnection;
    document.getElementById("encryptionKey_OE").value = lastConnection;
    document.getElementById("encryptionKey_E").value = lastConnection;

}

function createTableHeader() {
    var devicesTable = document.getElementById("devicesTable");
    devicesTable.innerHTML = "";

    var thead = document.createElement("thead");
    var row = document.createElement("tr");
    row.innerHTML = ( //"<th>Index</th>" +
        "<th>Name</th>" +
        "<th>IP</th>" +
        "<th>Server Port</th>" +
        "<th>Last Connection</th>" +
        "<th>Encryption Key</th>");

    thead.appendChild(row);
    devicesTable.appendChild(thead);
}

function loadDevicesJSONtoTable(devicesListJSON) {

    var devicesList = jQuery.parseJSON(devicesListJSON);


    var tbody = document.createElement("tbody");
    //var index = 0;
    //while (devicesList[index] != null) {
    //for(var device in devicesList){
    $.each(devicesList, function (index, value) {
        //var device = devicesList[index];
        var device = value;

        var name = device.name;
        var IP = device["IP"];
        var serverPort = device["serverPort"];
        var lastConnection = device["lastConnection"];
        var encryptionKey = device["encryptionKey"];

        var row = document.createElement("tr");
        row.innerHTML = (
            //"<td>" + (index + 1) + "</td>" +
            "<td>" + name + "</td>" +
            "<td>" + IP + "</td>" +
            "<td>" + serverPort + "</td>" +
            "<td>" + lastConnection + "</td>" +
            "<td>" + encryptionKey + "</td>" +
            "<td><button type=\"button\" class=\"btn btn-secondary\" onclick=\"EditField('" + name + "','" + IP + "','" + serverPort + "','" + lastConnection + "')\">Edit</button></td>" +
            "<td><button type=\"button\" class=\"btn btn-warning\" onclick=\"location.href=\'/Richkware-Manager-Server/RemoveDevice?name=" + name + "\';\">Remove</button></td>");

        tbody.appendChild(row);
        //      index++
    });
    devicesTable.appendChild(tbody);
}


function loadDevicesTable() {
    createTableHeader();

    request = null;

    // microsoft explorer
    if (window.XMLHttpRequest)
        request = new XMLHttpRequest();
    else
        request = new ActiveXObject("Microsoft.XMLHTTP");

    request.onreadystatechange = newConnection;
    request.open("GET", "/Richkware-Manager-Server/DevicesListAJAJ", true, null, null);

    request.send(null);
}


function newConnection() {
    if (request.readyState != 4) {
        //alert("request.readystate: "+ request.readystate)
        return;
    }
    if (request.status != 200) {
        alert("request.status :  " + request.status)
        return;
    }

    var JSON = request.responseText;
    var result;
    eval("result = " + JSON);

    loadDevicesJSONtoTable(result);

}
