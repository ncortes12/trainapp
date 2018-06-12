// Initialize Firebase
var config = {
    apiKey: "AIzaSyDxt2AWQHtPqWfWKDXydINSbiEYCK-SjuY",
    authDomain: "njc-trainapp.firebaseapp.com",
    databaseURL: "https://njc-trainapp.firebaseio.com",
    projectId: "njc-trainapp",
    storageBucket: "",
    messagingSenderId: "890560295211"
};
firebase.initializeApp(config);

var name;
var destination;
var frequency;
var next;
var database = firebase.database();

function trainTime() {

    var convert = moment(next, "HH:mm").subtract(1, "years");
    var current = moment();
    var diff = moment().diff(moment(convert), "minutes");
    var remainder = diff % frequency;
    var minutesUntil = frequency - remainder;
    var timeUntil = moment().add(minutesUntil, "minutes");
}

$("#addBtn").on("click", function run() {
    name = $("#trainName").val().trim();
    $("#trainName").val("");
    destination = $("#destination").val().trim();
    $("#destination").val("");
    frequency = $("#frequency").val().trim();
    $("#frequency").val("");
    next = $("#arrival").val().trim();
    $("#arrival").val("");

    console.log(name, destination, frequency, next);
    database.ref().push({

        trainName: name,
        trainDestination: destination,
        trainFrequency: frequency,
        nextTrain: next,
    });
});

database.ref().on("child_added", function (snapshot) {
    var snap = snapshot.val();

    var newRow = $("<tr></tr>");

    var nameCell = $("<td></td>");
    nameCell.text(snap.trainName);
    newRow.append(nameCell);

    var destinationCell = $("<td></td>");
    destinationCell.text(snap.trainDestination);
    newRow.append(destinationCell);

    var frequencyCell = $("<td></td>");
    frequencyCell.text(snap.trainFrequency);
    newRow.append(frequencyCell);

    var nextCell = $("<td></td>");
    nextCell.text(snap.nextTrain);
    newRow.append(nextCell);

    var trainCell = $("<td></td>");
    var nextTime = parseInt(snap.nextTrain)
    console.log(nextTime);
    var convert = moment(nextTime, "HH:mm").subtract(1, "years");
    console.log(convert)
    var current = moment();
    console.log(current);
    var diff = moment().diff(moment(convert), "minutes");
    console.log(diff);
    var convFrequency = parseInt(snap.trainFrequency);
    var remainder = diff % convFrequency;
    console.log(remainder);
    var minutesUntil = convFrequency - remainder;
    console.log(minutesUntil);
    
    trainCell.text(minutesUntil);
    newRow.append(trainCell);


    $(".trainSchedule").append(newRow);

})



