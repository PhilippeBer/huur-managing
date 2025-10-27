/**
 * Matching.gs
 *
 * This script implements the matching functionality for the rent management system.
 * It allows for direct assignment of payments and later matching via a separate screen.
 */

// --- Core Functionality ---

/**
 * Books a payment.
 * @param {number} leaseId The ID of the lease.
 * @param {string} paymentDate The date of the payment (YYYY-MM-DD).
 * @param {number} amount The amount of the payment.
 * @return {object} Payment confirmation data.
 */
function bookPayment(leaseId, paymentDate, amount) {
  try {
    //TODO: Implement logic to store the payment details.
    let paymentData = {
      leaseId: leaseId,
      paymentDate: paymentDate,
      amount: amount
    };
    
    // Call the DataModel to store the payment.  We'll assume a bookPayment function 
    // exists on DataModel.gs.
    let result = google.script.run.withSuccessHandler(function(data) {
      console.log('Payment booked successfully:', data);
      displayPaymentConfirmation(data);
    }).withFailureHandler(function(error) {
      console.error('Failed to book payment:', error);
      alert('Error booking payment. Please check the console for details.');
    }).bookPayment(paymentData);

    return result;
  } catch (e) {
    console.error('Error in bookPayment:', e);
    alert('Error booking payment: ' + e.message);
  }
}

/**
 * Performs auto-allocation of payments.
 * @param {number} leaseId The ID of the lease.
 * @param {number} amount The amount of the payment.
 * @return {object} Auto-allocation results.  Should contain details of allocations.
 */
function autoAllocatePayment(leaseId, amount) {
    try {
        // Implement the auto-allocation logic here.
        // This would involve calculating the 'huur eerst' amount, 
        // applying it to the lease, and handling any remaining balance.
        // This is a placeholder; actual implementation depends on the data model.

        let allocationData = {
            leaseId: leaseId,
            amount: amount,
            huurEerst: amount, // Placeholder - First the rent money
            restBedrag: 0 // Placeholder - Remaining balance
        };

        //Call the DataModel to persist allocation data
        let result = google.script.run.withSuccessHandler(function(data) {
            console.log("Auto allocation successful:" + data);
            displayAutoAllocationConfirmation(data);
        }).withFailureHandler(function(error) {
            console.error("Failed to auto allocation payment:" + error);
                alert("Error during auto allocation. Please check the console for details");
        }).autoAllocate(allocationData)

        return result;
    } catch (e) {
        console.error("Error in autoAllocatePayment:" + e);
        alert("Error during auto allocation. Please check the console for details");
    }
}


// --- UI Functions ---

/**
 * Displays a payment confirmation message in the UI.
 * @param {object} data Payment confirmation data.
 */
function displayPaymentConfirmation(data) {
  console.log('Displaying payment confirmation:', data);
  // Implement logic to update the UI with the confirmation message.
  // This will involve accessing the UI and updating its elements.
  // For example, you might show a success notification or redirect 
  // to a payment details page.

  //Placeholder: show message directly on console 
  console.log ("Payment Confirmation: " + JSON.stringify(data));
    
}

/**
 * Displays Auto Allocation Confirmation UI message.
 * @param {object} data Auto Allocation data.
 */
function displayAutoAllocationConfirmation(data){
    console.log("Auto allocation Confirmation: " + JSON.stringify(data));
}




// ---  Initialization (called on UI initialization) ---\
/**
 * Called when the UI element is initialized.
 */
function onUIInit(e) {
  console.log('UI initialized.');
  setupUI();
}

/**
 *  Sets up the UI elements.  Placeholder for actual UI setup logic.
 */
function setupUI() {
  //Implement UI setup here.  This might involve creating buttons, 
  //input fields, and other UI elements.
  // Example: let button = document.createElement('button'); button.textContent = 'Book Payment';
  // Display the button on the UI.
}


/**
 * Example of a function that would be called when a user clicks a button in the UI.
 */
function handleBookPaymentButtonClick() {
  // Get the lease ID and payment amount from the UI.
  // Get the payment date from the UI.
  // Call the bookPayment function to book the payment.
  // Display the payment confirmation message.

  //Dummy data for testing
  let leaseId = 123;
  let paymentDate = new Date().toISOString().slice(0, 10);  //Today's date
  let amount = 100;

  bookPayment(leaseId, paymentDate, amount);

}