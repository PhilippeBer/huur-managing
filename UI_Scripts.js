/**
 * UI_Scripts.js
 *
 * Handles google.script.run calls to server-side functions.
 * Manages UI state (loading indicators, error messages).
 * Handles events triggered by UI elements (button clicks, form submissions).
 */
(function() {
  /**
   * Function to call the setup function on the server.
   */
  function setupUI() {
    google.script.run.withSuccessHandler(function() {
      console.log('UI setup completed.');
    }).withFailureHandler(function(error) {
      console.error('UI setup failed:', error);
      // Display an error message to the user.
      alert('Error during UI setup. Please check the console for details.');
    }).setup();
  }

  /**
   * Function to call the refresh watchlist function on the server.
   */
  function refreshWatchlist() {
    google.script.run.withSuccessHandler(function(data) {
      console.log('Watchlist refreshed successfully:', data);
      // Update the UI with the new watchlist data.
      displayWatchlist(data);
    }).withFailureHandler(function(error) {
      console.error('Watchlist refresh failed:', error);
      // Display an error message to the user.
      alert('Error refreshing watchlist. Please check the console for details.');
    }).refreshWatchlist();
  }

  /**
   * Function to call the generate termijnen command on the server.
   * @param {string} leaseId
   * @param {string} period
   */
  function generateTerms(leaseId, period) {
    google.script.run.withSuccessHandler(function(data) {
      console.log('Terms generated successfully:', data);
      // Display the generated terms in the UI.
      displayTerms(data);
    }).withFailureHandler(function(error) {
      console.error('Failed to generate terms:', error);
      // Display an error message to the user.
      alert('Error generating terms. Please check the console for details.');
    }).generateTerms(leaseId, period);
  }

  /**
   * Function to call the book betaling command on the server.
   * @param {number} leaseId
   * @param {string} paymentDate
   * @param {number} amount
   */
  function bookPayment(leaseId, paymentDate, amount) {
    google.script.run.withSuccessHandler(function(data) {
      console.log('Payment booked successfully:', data);
      // Display payment confirmation in the UI.
      displayPaymentConfirmation(data);
    }).withFailureHandler(function(error) {
      console.error('Failed to book payment:', error);
      // Display an error message to the user.
      alert('Error booking payment. Please check the console for details.');
    }).bookPayment(leaseId, paymentDate, amount);
  }


  /**
   * Function to call the reconciliation command on the server.
   */
  function reconcile() {
    google.script.run.withSuccessHandler(function(data) {
      console.log('Reconciliation complete:', data);
      // Display reconciliation results in the UI.
      displayReconciliationResults(data);
    }).withFailureHandler(function(error) {
      console.error('Reconciliation failed:', error);
      // Display an error message to the user.
      alert('Error during reconciliation. Please check the console for details.');
    }).reconcile();
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
   * Called when the UI element is initialized.
   */
  function onUIInit(e) {
    console.log('UI initialized.');
    setupUI();
  }
})();