/**
 * Performs a monthly reconciliation.
 */
function reconcile() {
    try {
        // TODO: Implement the reconciliation logic (e.g., comparing total charges vs. total payments).\n
        let reconciliationData = {\n
            totalCharges: SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Charges").getDataRange().getValues().filter(row => row[0] !== 'Total')[0][1], // Assuming 'Total' is in the first column of the Charges sheet
            totalPayments: SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Payments").getDataRange().getValues().filter(row => row[0] !== 'Total')[0][1], // Assuming 'Total' is in the first column of the Payments sheet
            reconciliationResult: SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reconcile").getRange("B2").getValue() // Get the result from the Reconcile sheet, cell B2
        };\n

        google.script.run.withSuccessHandler(function (data) {
            console.log('Reconciliation complete:', data);\
            displayReconciliationResults(data);\
        }).withFailureHandler(function (error) {
            console.error('Reconciliation failed:', error);\
            alert('Error during reconciliation. Please check the console for details.');\
        }).reconcile();\
    } catch (e) {
        console.error('Error in reconcile:', e);\
        alert('Error during reconciliation: ' + e.message);\
    }\
}