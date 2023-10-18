// Convert the submittedAt timestamp to the EST (Eastern Standard Time) time zone
const submissionDate = new Date(inputData.submittedAt).toLocaleString('en-US', {
  timeZone: 'America/New_York'
});

// Get the current date and time in the EST time zone
const now = new Date();
const estOptions = {
  timeZone: 'America/New_York',
};
const estDate = new Date(now.toLocaleString('en-US', estOptions));
const hour = estDate.getHours();
const day = estDate.getDay();

// Create an array of day names
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayName = dayNames[day];

// Check if the current day is a weekend (Saturday or Sunday)
const isWeekend = [0, 6].includes(day);

// Check if it's operating hours (Monday to Friday, 9 AM to 5 PM)
const isOperatingHours = !isWeekend && hour >= 9 && hour <= 17;

// Check if it's after operating hours on a weekday
const isAfterHours = !isWeekend && !isOperatingHours;

// Return the results in an object, including the day name
return {
  isOperatingHours,
  isAfterHours,
  isWeekend,
  dayName,
  submissionDate
};
