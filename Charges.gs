/**
 * Function to call the generate termijnen command on the server.
 * @param {string} leaseId
 * @param {string} period
 */
function generateTerms(leaseId, period) {
  try {
    const result = google.script.run.withSuccessHandler(function(data) {
      console.log('Terms generated successfully:', data);
      // Display the generated terms in the UI.
      displayTerms(data);
    }).withFailureHandler(function(error) {
      console.error('Failed to generate terms:', error);
      // Display an error message to the user.
      alert('Error generating terms. Please check the console for details.');
    }).generateTerms(leaseId, period);
  } catch (e) {
    console.error('Error calling generateTerms:', e);
    alert('An unexpected error occurred while generating terms. Please check the console for details.');
  }
}

/**
 * Function to call the book betaling command on the server.
 * @param {number} leaseId
 * @param {string} paymentDate
 * @param {number} amount
 */
function bookPayment(leaseId, paymentDate, amount) {
  try {
    const result = google.script.run.withSuccessHandler(function(data) {
      console.log('Payment booked successfully:', data);
      // Display payment confirmation in the UI.
      displayPaymentConfirmation(data);
    }).withFailureHandler(function(error) {
      console.error('Failed to book payment:', error);
      // Display an error message to the user.
      alert('Error booking payment. Please check the console for details.');
    }).bookPayment(leaseId, paymentDate, amount);
  } catch (e) {
    console.error('Error calling bookPayment:', e);
    alert('An unexpected error occurred while booking payment. Please check the console for details.');
  }
}

/**
 * Function to call the reconciliation command on the server.
 */
function reconcile() {
  try {
    const result = google.script.run.withSuccessHandler(function(data) {
      console.log('Reconciliation complete:', data);
      // Display reconciliation results in the UI.
      displayReconciliationResults(data);
    }).withFailureHandler(function(error) {
      console.error('Reconciliation failed:', error);
      // Display an error message to the user.
      alert('Error during reconciliation. Please check the console for details.');
    }).reconcile();
  } catch (e) {
    console.error('Error calling reconcile:', e);
    alert('An unexpected error occurred during reconciliation. Please check the console for details.');
  }
}

/**
 * Function to call the generate watchlist command on the server.
 * @param {string} watchlistId
 */
function generateWatchlist(watchlistId) {
  try {
    const result = google.script.run.withSuccessHandler(function(data) {
      console.log('Watchlist generated successfully:', data);
      // Display the generated watchlist in the UI.
      displayWatchlist(data);
    }).withFailureHandler(function(error) {
      console.error('Failed to generate watchlist:', error);
      // Display an error message to the user.
      alert('Error generating watchlist. Please check the console for details.');
    }).generateWatchlist(watchlistId);
  } catch (e) {
    console.error('Error calling generateWatchlist:', e);
    alert('An unexpected error occurred while generating the watchlist. Please check the console for details.');
  }
}


/**
 * Function to call the update watchlist command on the server.
 * @param {string} watchlistId
 * @param {string} period
 */
function updateWatchlist(watchlistId, period) {
  try {
    const result = google.script.run.withSuccessHandler(function(data) {
      console.log('Watchlist updated successfully:', data);
      // Refresh the watchlist in the UI.
      }).withFailureHandler(function(error) {
      console.error('Failed to update watchlist:', error);
      // Display an error message to the user.
      alert('Error updating watchlist. Please check the console for details.');
    }).updateWatchlist(watchlistId, period);
  } catch (e) {
    console.error('Error calling updateWatchlist:', e);
    alert('An unexpected error occurred while updating the watchlist. Please check the console for details.');
  }
}


/**
 * Function to display the watchlist data in the UI.
 * @param {Array} data
 */
function displayWatchlist(data) {
  // Implement logic to update the UI with the watchlist data.
  console.log('Displaying watchlist data:', data);
}

/**
 * Function to display the generated terms in the UI.
 * @param {Array} data
 */
function displayTerms(data) {
  // Implement logic to update the UI with the terms data.
  console.log('Displaying terms data:', data);
}

/**
 * Function to display payment confirmation in the UI.
 * @param {object} data
 */
function displayPaymentConfirmation(data) {
  // Implement logic to update the UI with the payment confirmation.
  console.log('Displaying payment confirmation:', data);
}

/**
 * Function to display reconciliation results in the UI.
 * @param {object} data
 */
function displayReconciliationResults(data) {
  // Implement logic to update the UI with the reconciliation results.
  console.log('Displaying reconciliation results:', data);
}

/**
 * Function to display the watchlist data in the UI.
 * @param {Array} data
 */
function displayWatchlist(data) {
    console.log('Displaying watchlist data:', data);
}

/**
 * Function to get settings from the server.
 * @return {object}
 */
function getSettings() {
  try {
    const result = google.script.run.withSuccessHandler(function(data) {
      console.log('Settings retrieved successfully:', data);
      return data;
    }).getSettings();
    return result;
  } catch (e) {
    console.error('Error retrieving settings:', e);
    alert('Error retrieving settings. Please check the console for details.');
    return null;
  }
}

/**
 * Function to set settings on the server.
 * @param {object} settings
 */
function setSettings(settings) {
  try {
    const result = google.script.run.withSuccessHandler(function(data) {
      console.log('Settings updated successfully:', data);
    }).setSettings(settings);
  } catch (e) {
    console.error('Error setting settings:', e);
    alert('Error setting settings. Please check the console for details.');
  }
}


/**
 * Function to handle the initial setup of the spreadsheet.
 */
function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Rent Manager BE')
        .addItem('Open Sidebar', 'showSidebar')
        .addItem('Reconcile', 'reconcile')
        .addItem('Generate Watchlist', 'generateWatchlist')
        .addToUi();
}

/**
 * Function to create the sidebar UI.
 */
function showSidebar() {
    var html = HtmlService.createHtmlOutputFromFile('UI_Sidebar.html');
    SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Function to refresh the watchlist data.
 */
function refreshWatchlist() {
    try {
        const result = google.script.run.withSuccessHandler(function(data) {
            console.log('Watchlist refreshed successfully:', data);
            displayWatchlist(data);
        }).updateWatchlist('watchlist1', 'current'); // Replace 'watchlist1' with an actual watchlist ID
    } catch (e) {
        console.error('Error refreshing watchlist:', e);
        alert('Error refreshing watchlist. Please check the console for details.');
    }
}

/**
 * Function to get the current period.
 * @return {string}
 */
function getCurrentPeriod() {
  // Implement logic to get the current period (e.g., from a date picker in the UI).
  // For now, return a default value.
  return 'current';
}