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

  
    var nextTime = parseInt(snap.nextTrain);
    var convFrequency = parseInt(snap.trainFrequency);
    var convert = moment(nextTime, "HH:mm").subtract(1, "years");
    var current = moment();
    var diff = moment().diff(moment(convert), "minutes");
    var remainder = diff % convFrequency;
    var minutesUntil = convFrequency - remainder;
    var nexTrain = moment().add(minutesUntil, "minutes");
    var timeDisplay = moment(nexTrain).format("hh:mm A");
    
    console.log(nextTime);
    console.log(convert)
    console.log(current);
    console.log(diff);
    console.log(remainder);
    console.log(minutesUntil);
    console.log(timeDisplay);

    var nextCell = $("<td></td>");
    nextCell.text(timeDisplay);
    newRow.append(nextCell);

    var trainCell = $("<td></td>");
    trainCell.text(minutesUntil);
    newRow.append(trainCell);




    $(".trainSchedule").append(newRow);

})





