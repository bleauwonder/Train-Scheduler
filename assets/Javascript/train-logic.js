    // Firebase
    var firebaseConfig = {
    apiKey: "AIzaSyAnzVVe8w7i1JniWgkp3JC85OjznmSqbMs",
    authDomain: "schedules-7124f.firebaseapp.com",
    databaseURL: "https://schedules-7124f.firebaseio.com",
    projectId: "schedules-7124f",
    storageBucket: "schedules-7124f.appspot.com",
    messagingSenderId: "381774024928",
    appId: "1:381774024928:web:4404217fae6c889b"
    };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Next Train
    $("#add-time").on("click", function(event) {
        event.preventDefault();

        var trainName = $("#train-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var start = $("#start-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        var schedule = {
            name: trainName,
            place: destination,
            start: start,
            frequency: frequency
          };
        
          database.ref().push(schedule);

          console.log(schedule.name);
          console.log(schedule.place);
          console.log(schedule.start);
          console.log(schedule.frequency);

          $("#train-input").val('');
          $("#destination-input").val('');
          $("#start-input").val('');
          $("#frequency-input").val('');
    });

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
      
        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().place;
        var start = childSnapshot.val().start;
        var frequency = childSnapshot.val().frequency;
      
        // Employee Info
        console.log(trainName);
        console.log(destination);
        console.log(start);
        console.log(frequency);
      
        // First Time (pushed back 1 year to make sure it comes before current time)
        var start = moment(start, "HH:mm").subtract(1, "years");
        console.log(start);

        // Difference between the times
        var diffTime = moment().diff(moment(start), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);
        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        // To calculate the next arrival
        var nextArrival = moment().add(tMinutesTillTrain, "minutes").format("h:mm");
      
        // Create the new row
        var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(destination),
          $("<td>").text(frequency),
          $("<td>").text(nextArrival),
          $("<td>").text(tMinutesTillTrain),
        );

        $("#train-table > tbody").append(newRow);
      });
// });