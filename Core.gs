/**
 * Refresh the Te-bewaken watchlist.
 */
function refreshWatchlist() {
  try {
    var watchlistData = Watchlist.refreshWatchlist();
    // Assuming refreshWatchlist returns an array of objects.
    if (watchlistData && watchlistData.length > 0) {
      var html = HtmlService.createHtmlOutput(UI_Sidebar.watchlistTable, {
        watchlistData: watchlistData
      });
      SpreadsheetApp.getUi().showSidebar(html);
    } else {
      SpreadsheetApp.getUi().alert('No watchlist data found.');
    }
  } catch (e) {
    SpreadsheetApp.getUi().alert('Error refreshing watchlist. Please check the console for details.');
  }
}

/**
 * Generates terms for a lease and period.
 * @param {string} leaseId
 * @param {string} period
 */
function generateTerms(leaseId, period) {
  try {
    var terms = Charges.generateTerms(leaseId, period);
    SpreadsheetApp.getUi().alert('Terms generated successfully: ' + JSON.stringify(terms));
    displayTerms(terms);
  } catch (e) {
    SpreadsheetApp.getUi().alert('Failed to generate terms: ' + e);
  }
}

/**
 * Books a payment.
 * @param {number} leaseId
 * @param {string} paymentDate
 * @param {number} amount
 */
function bookPayment(leaseId, paymentDate, amount) {
  try {
    var payment = Payments.bookPayment(leaseId, paymentDate, amount);
    SpreadsheetApp.getUi().alert('Payment booked successfully: ' + JSON.stringify(payment));
    displayPaymentConfirmation(payment);
  } catch (e) {
    SpreadsheetApp.getUi().alert('Failed to book payment: ' + e);
  }
}

/**
 * Reconciles the accounts for the month.
 */
function reconcile() {
  try {
    var reconciliationResult = Reconcile.reconcile();
    SpreadsheetApp.getUi().alert('Reconciliation complete: ' + JSON.stringify(reconciliationResult));
    displayReconciliationResults(reconciliationResult);
  } catch (e) {
    SpreadsheetApp.getUi().alert('Reconciliation failed: ' + e);
  }
}

/**
 * Displays the watchlist data in the UI.
 * @param {Array} data
 */
function displayWatchlist(data) {
  UI_Sidebar.watchlistTable = data;
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('UI_Sidebar')
      .setWidth(600));
}

/**
 * Displays the generated terms in the UI.
 * @param {Array} data
 */
function displayTerms(data) {
  UI_Sidebar.termsTable = data;
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('UI_Sidebar')
      .setWidth(600));
}

/**
 * Displays payment confirmation in the UI.
 * @param {object} data
 */
function displayPaymentConfirmation(data) {
  SpreadsheetApp.getUi().alert('Payment confirmed: ' + JSON.stringify(data));
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('UI_Sidebar')
      .setWidth(600));
}

/**
 * Displays reconciliation results in the UI.
 * @param {object} data
 */
function displayReconciliationResults(data) {
  SpreadsheetApp.getUi().alert('Reconciliation results: ' + JSON.stringify(data));
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('UI_Sidebar')
      .setWidth(600));
}

/**
 * Generates terms for a lease and period.
 * @param {string} leaseId
 * @param {string} period
 */
function generateTerms(leaseId, period) {
  try {
    var terms = Charges.generateTerms(leaseId, period);
    SpreadsheetApp.getUi().alert('Terms generated successfully: ' + JSON.stringify(terms));
    displayTerms(terms);
  } catch (e) {
    SpreadsheetApp.getUi().alert('Failed to generate terms: ' + e);
  }
}

/**
 * Books a payment.
 * @param {number} leaseId
 * @param {string} paymentDate
 * @param {number} amount
 */
function bookPayment(leaseId, paymentDate, amount) {
  try {
    var payment = Payments.bookPayment(leaseId, paymentDate, amount);
    SpreadsheetApp.getUi().alert('Payment booked successfully: ' + JSON.stringify(payment));
    displayPaymentConfirmation(payment);
  } catch (e) {
    SpreadsheetApp.getUi().alert('Failed to book payment: ' + e);
  }
}

/**
 * Reconciles the accounts for the month.
 */
function reconcile() {
  try {
    var reconciliationResult = Reconcile.reconcile();
    SpreadsheetApp.getUi().alert('Reconciliation complete: ' + JSON.stringify(reconciliationResult));
    displayReconciliationResults(reconciliationResult);
  } catch (e) {
    SpreadsheetApp.getUi().alert('Reconciliation failed: ' + e);
  }
}

/**
 * Displays the watchlist data in the UI.
 * @param {Array} data
 */
function displayWatchlist(data) {
  UI_Sidebar.watchlistTable = data;
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('UI_Sidebar')
      .setWidth(600));
}

/**
 * Displays the generated terms in the UI.
 * @param {Array} data
 */
function displayTerms(data) {
  UI_Sidebar.termsTable = data;
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('UI_Sidebar')
      .setWidth(600));
}

/**
 * Displays payment confirmation in the UI.
 * @param {object} data
 */
function displayPaymentConfirmation(data) {
  SpreadsheetApp.getUi().alert('Payment confirmed: ' + JSON.stringify(data));
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('UI_Sidebar')
      .setWidth(600));
}

/**
 * Displays reconciliation results in the UI.
 * @param {object} data
 */
function displayReconciliationResults(data) {
  SpreadsheetApp.getUi().alert('Reconciliation results: ' + JSON.stringify(data));
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('UI_Sidebar')
      .setWidth(600));
}