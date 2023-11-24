import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
        );
        console.log('State before update:', state);

      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
      console.log('State after update:', state);
      console.log('Updated index:', index);
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
