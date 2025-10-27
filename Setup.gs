/**
 * Setup.gs - Initializes the Google Sheet for the Rent Manager BE script.
 */

/**
 * Initializes the spreadsheet by creating necessary tabs, setting up column headers, data validation,
 * and named ranges. This function is triggered when the spreadsheet is opened or the
 * "Instellingen controleren" menu item is selected.
 */
function onOpen() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Create tabs in the specified order
    createTabs(ss);

    //Set some basic settings
    Settings.init();
}

/**
 * Creates the necessary tabs in the spreadsheet.
 * @param {Spreadsheet} ss The spreadsheet object.
 */
function createTabs(ss) {
    var tabNames = [
        "Settings",
        "Properties",
        "Tenants",
        "Leases",
        "Charges",
        "Payments",
        "Allocations",
        "Adjustments",
        "Te?bewaken",
        "Te?bewaken Archief",
        "ContactLog",
        "Dashboard",
        "SettingsLog",
        "ChargesLog"
    ];

    for (var i = 0; i < tabNames.length; i++) {
        var tab = ss.getSheetByName(tabNames[i]);
        if (!tab) {
            tab = ss.insertSheet(tabNames[i]);
        }
    }
}

/**
 * This function is called to initialize custom settings.
 */
function Settings.init() {
  // Set default values for settings
  Settings.set("Valuta", "EUR");
  Settings.set("CommunicationsEnabled", false);
  Settings.set("ReferenceMode", "None");
  Settings.set("ArchiveDelayDays", "");
}

/**
 *  Performs a monthly reconciliation.
 */
function reconcile() {
    try {
        // TODO: Implement the reconciliation logic (e.g., comparing total charges vs. total payments).

        let reconciliationData = {
            totalCharges: SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Charges").getDataRange().getValues().filter(row => row[0] !== 'Total')[0][1], // Assuming 'Total' is in the first column of the Charges sheet
            totalPayments: SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Payments").getDataRange().getValues().filter(row => row[0] !== 'Total')[0][1], // Assuming 'Total' is in the first column of the Payments sheet
            reconciliationResult: SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reconcile").getRange("B2").getValue() // Get the result from the Reconcile sheet, cell B2
        };

        google.script.run.withSuccessHandler(function (data) {
            console.log('Reconciliation complete:', data);
            displayReconciliationResults(data);
        }).withFailureHandler(function (error) {
            console.error('Reconciliation failed:', error);
            alert('Error during reconciliation. Please check the console for details.');
        }).reconcile();
    } catch (e) {
        console.error('Error in reconcile:', e);
        alert('Error during reconciliation: ' + e.message);
    }
}

/**
 * Displays reconciliation results in the UI.
 * @param {Object} data The reconciliation results data.
 */
function displayReconciliationResults(data) {
    console.log('Displaying reconciliation results:', data);
    // Assuming you have UI elements to display the results
    if (data && data.reconciliationResult !== undefined) {
        SpreadsheetApp.getUi().alert('Reconciliation Result: ' + data.reconciliationResult);
    } else {
        SpreadsheetApp.getUi().alert('Reconciliation data is empty or incomplete.');
    }
}