// Function to create a new date at 1:00 PM in the same time zone
function createClickUpDate(date) {
  const clickUpDate = new Date(date);
  clickUpDate.setHours(13, 0, 0, 0);
  return clickUpDate;
}

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

// Check if the current day is a weekend (Saturday or Sunday)
const isWeekend = [0, 6].includes(day);

// Check if it's operating hours (Monday to Friday, 9 AM to 5 PM)
const isOperatingHours = !isWeekend && hour >= 9 && hour <= 17;

// Check if it's after operating hours on a weekday
const isAfterHours = !isWeekend && !isOperatingHours;

// Create a common date object for ClickUp calculations
const clickUpDate = createClickUpDate(estDate);

// Calculate the ClickUp operating hours date
const clickUpOHDate = createClickUpDate(clickUpDate);

// Calculate the ClickUp after-hours date
const clickUpAHDate = createClickUpDate(hour < 9 || hour > 17 ? new Date(clickUpDate.setDate(clickUpDate.getDate() + 1)) : clickUpDate);

// Calculate the ClickUp weekend hours date
const clickUpWHDate = createClickUpDate(day === 0 ? new Date(clickUpDate.setDate(clickUpDate.getDate() + 1)) : day === 6 ? new Date(clickUpDate.setDate(clickUpDate.getDate() + 2)) : clickUpDate);

// Return the results in an object
return {
  isOperatingHours,
  isAfterHours,
  isWeekend,
  clickUpOHDate,
  clickUpAHDate,
  clickUpWHDate,
  submissionDate
};
