# Swipe Assignment

## Installation

To install and run the project locally, follow these steps:

1. Clone this repository and run it:

   ```bash
   git clone https://github.com/yogeeshry1821/swipe-assignment.git
   cd swipe-assignment
   npm install
   npm start

The assignment will start running locally.

# Bulk Edit Feature Implementation
## Overview
The bulk edit feature in this project allows users to edit multiple invoice details simultaneously.

### Implementation Details
#### State Management:

Used React's useState hook to manage component state.
Utilized Redux for managing global state and handling asynchronous actions.


**Data Retrieval**:
Utilized React-Redux hooks such as useSelector to fetch invoice data from the Redux store.
Used useLocation from react-router-dom to get the current location details.

**Initialization of Edit States:**
Initialized the edit states using the useState hook.
Iterated through the invoice list to set initial edit states.


**Editing Fields**:
Implemented input fields for each editable property in the invoice.
Provided input fields for each item in the invoice, dynamically rendering based on the number of items.


**Handling Edits:**
Implemented handleEdit function to update the edit states when users modify the input fields.
Ensured proper mapping of edited values to the corresponding invoice and item.
**Saving Edits:**

Implemented the handleSave function to save the edited data.
Dispatched Redux actions to update the global state.
**Rendering Table:**

Rendered a table with dynamic headers based on the items in the invoice.
Provided input fields for each item, allowing users to edit item details.
Usage
Access the bulk edit feature by navigating to the appropriate route.

Edit the desired fields for each invoice and item.

Click the "Save Edited Data" button to persist the changes.

Navigate back to the main page to see the updated data.

