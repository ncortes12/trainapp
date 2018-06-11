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

  $("#addBtn").on("click", function run(){
    name = $("#trainName").val().trim();
    $("#trainName").val("");
    destination = $("#destination").val().trim();
    $("#destination").val("");
    frequency = $("#frequency").val().trim();
    $("#frequency").val("");
    next = $("#arrival").val().trim();
    $("#arrival").val("");

    console.log(name, destination, frequency, next);
  });

  database.ref().push({

    trainName: name,
    trainDestination: destination,
    trainFrequency: frequency,
    nextTrain: next,
});