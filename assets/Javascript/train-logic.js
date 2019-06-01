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
    // Assumptions
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

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
            rate: frequency
          };
        
          database.ref().push(schedule);

          console.log(schedule.name);
          console.log(schedule.destination);
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
        var destination = childSnapshot.val().role;
        var start = childSnapshot.val().start;
        var frequency = childSnapshot.val().rate;
      
        // Employee Info
        console.log(trainName);
        console.log(destination);
        console.log(start);
        console.log(frequency);
      
        // Prettify the employee start
        var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
      
        // Calculate the months worked using hardcore math
        // To calculate the months worked
        var empMonths = moment().diff(moment(empStart, "X"), "months");
        console.log(empMonths);
      
        // Calculate the total billed rate
        var empBilled = empMonths * empRate;
        console.log(empBilled);
      
        // Create the new row
        var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(destination),
          $("<td>").text(frequency),
          $("<td>").text(nextArrival),
          $("<td>").text(minAway),
        );
      
        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
      });
// });