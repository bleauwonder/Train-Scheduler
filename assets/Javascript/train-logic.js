 // Assume the following situations.
// $(document).ready( {
    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Firebase
      // Your web app's Firebase configuration
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
    // // Assumptions
    // var tFrequency = 3;

    // // Time is 3:30 AM
    // var firstTime = "03:30";



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
        console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

        // Calculate how many minutes until arrival
        // var minAway = moment(start, 'HH:mm').add(frequency, 'minutes').format("HH:mm")
        // console.log(minAway);
      
        // Create the new row
        var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(destination),
          $("<td>").text(frequency),
          $("<td>").text(nextArrival),
          $("<td>").text(tMinutesTillTrain),
        );
      
        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
      });
// });