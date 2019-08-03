import "./scss/style.scss";

$(() => {
  // Timer
  // Getting Countdown Date
  let countdownDate = new Date(); // Current Date
  countdownDate.setDate(countdownDate.getDate() + 5); // Current Date + 5 days
  countdownDate.setHours(0, 0, 0, 0); // 5 Days from now at 12 AM
  // Set Timer
  setInterval(() => {
    timer(countdownDate);
  }, 1000);
  // Check for first checkbox
  $("#checkbox1").change(() => {
    // When checkbox1 is changed, checkbox2 takes the same property value for checked
    $("#checkbox2").prop("checked", $("#checkbox1").prop("checked"));
  });
  // Check for second checkbox
  $("#checkbox2").change(() => {
    // When checkbox2 is changed, checkbox1 takes the same property value for checked
    $("#checkbox1").prop("checked", $("#checkbox2").prop("checked"));
  });

  // Check for button clicks
  $(".btn").click(() => {
    // Checking to make sure both checkboxes are checked
    if (
      $("#checkbox1").prop("checked") == false ||
      $("#checkbox2").prop("checked") == false
    ) {
      alert("Check the checkboxes before proceeding!"); // Alert if checkboxes are not checked
    } else {
      $.getJSON(
        "https://bl45immth4.execute-api.us-east-1.amazonaws.com/production/"
      ).done(data => {
        let info = JSON.parse(data.body); // Getting info from data
        $(".response").html(info.submitok); // Adding response to span
        $(".response").css("display", "block");
      });
    }
  });
});

// Function that will process timer
function timer(finalDate) {
  // Getting time from finalDate and now
  let now = new Date();
  now = Date.parse(now) / 1000; // Getting the date now and turning it to milliseconds
  let final = Date.parse(finalDate) / 1000; // Getting the countdownDate and turning it to milliseconds
  let timeLeft = final - now; // Getting total millisecond difference between countdownDate and now

  // Converting timeleft to different units
  let days = Math.floor(timeLeft / 86400); // Converting to get days
  let hours = Math.floor((timeLeft - days * 86400) / 3600); // Converting to get hours
  let minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60); // Converting to get minutes
  let seconds = Math.floor(
    timeLeft - days * 86400 - hours * 3600 - minutes * 60
  ); // Converting to get seconds

  // Checked if units are less than 10 to add 0 for styling
  if (hours < "10") {
    hours = "0" + hours;
  }
  if (minutes < "10") {
    minutes = "0" + minutes;
  }
  if (seconds < "10") {
    seconds = "0" + seconds;
  }

  // Adding the units to page
  $("#days").html(days + "<span>Days</span>");
  $("#hours").html(hours + "<span>Hours</span>");
  $("#minutes").html(minutes + "<span>Minutes</span>");
  $("#seconds").html(seconds + "<span>Seconds</span>");
}
