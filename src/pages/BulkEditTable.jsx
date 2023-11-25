import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectInvoiceList, updateInvoice } from "../redux/invoicesSlice";
import { Table, Row, Button } from "react-bootstrap";
import invoicesSlice from "./../redux/invoicesSlice";
import { useNavigate } from "react-router-dom";
const BulkEditTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const invoiceList = useSelector(selectInvoiceList);
  const dispatch = useDispatch();
  console.log("incoiceList", invoiceList);
  const [editStates, setEditStates] = useState(() => {
    const initialEditState = {};
    invoiceList.forEach((invoice) => {
      initialEditState[invoice.invoiceNumber] = {
        ...invoice,
        items: invoice.items.reduce((acc, item) => {
          acc[item.itemId] = { ...item };
          return acc;
        }, {}),
      };
    });
    return initialEditState;
  });
  console.log("location.state", location.state);
  console.log("editStates", editStates);
  const handleSave = () => {
    Object.keys(editStates).forEach((invoiceNumber) => {
      const invoice = invoiceList.find(
        (invoice) => invoice.invoiceNumber === parseInt(invoiceNumber)
      );
      if (invoice) {
        const invoiceId = invoice.id;
        dispatch(
          updateInvoice({
            id: invoiceId,
            updatedInvoice: editStates[invoiceNumber],
          })
        );
      }
    });

    console.log("Saved data:", editStates);
    setEditStates({});
    navigate("/");
  };
  //   console.log("loca", location.state);
  const filteredInvoices = invoiceList.filter((invoice) => {
    return location.state.includes(invoice.invoiceNumber);
  });
  console.log("filteredInvoices", filteredInvoices);
  const handleEdit = (field, invoiceNumber, value) => {
    setEditStates((prevState) => ({
      ...prevState,
      [invoiceNumber]: {
        ...prevState[invoiceNumber],
        [field]: value,
      },
    }));
  };
  const handleItemEdit = (field, invoiceNumber, itemId, value) => {
    setEditStates((prevState) => {
      const updatedInvoice = {
        ...prevState[invoiceNumber],
        //check is the items array an array or not
        items: Array.isArray(prevState[invoiceNumber]?.items)
          ? [...prevState[invoiceNumber].items]
          : [],
      };
      //update the edited values in items array
      updatedInvoice.items[itemId] = {
        ...prevState[invoiceNumber]?.items?.[itemId],
        [field]: value,
      };

      return {
        ...prevState,
        [invoiceNumber]: updatedInvoice,
      };
    });
  };
  const fieldDisplayNames = {
    itemName: "Item Name",
    itemDescription: "Item Description",
    itemPrice: "Item Price",
    itemQuantity: "Item Quantity",
  };
  const maxLengthItems = filteredInvoices
    .map((invoice) => invoice.items.length)
    .reduce((acc, currVal) => Math.max(acc, currVal), 0);

  // console.log('filteredInvoices', filteredInvoices)
  return (
    <>
      <div className="overflow-auto">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="m-2 p-2">Invoice Number</th>
              <th>Bill To</th>
              <th>Bill To Address</th>
              <th>Bill To Email</th>
              <th>Bill From</th>
              <th>Bill From Address</th>
              <th>Bill From Email</th>
              <th>Due Date</th>
              <th>Currency</th>
              <th>Current Date</th>
              <th>Discount Amount</th>
              <th>Discount Rate</th>
              {Array.apply(null, Array(maxLengthItems)).map((_, index) =>
                Object.keys(fieldDisplayNames).map((field) => {
                  // console.log("x", x);
                  return <th>{fieldDisplayNames[field]} {index+1}</th>;
                })
              )}
              <th>Tax Amount</th>

              <th>Tax Rate</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.invoiceNumber}>
                <td className="m-2 p-2">{invoice.invoiceNumber}</td>
                <td>
                  <input
                    type="text"
                    value={
                      editStates[invoice.invoiceNumber]?.billTo ||
                      invoice.billTo
                    }
                    onChange={(e) =>
                      handleEdit(
                        "billTo",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    // rows="3"
                    // cols="20"
                    type="text"
                    // className="overflowX: auto"
                    style={{ maxWidth: "500px" }}
                    value={
                      editStates[invoice.invoiceNumber]?.billToAddress ||
                      invoice.billToAddress
                    }
                    onChange={(e) =>
                      handleEdit(
                        "billToAddress",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={
                      editStates[invoice.invoiceNumber]?.billToEmail ||
                      invoice.billToEmail
                    }
                    onChange={(e) =>
                      handleEdit(
                        "billToEmail",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={
                      editStates[invoice.invoiceNumber]?.billFrom ||
                      invoice.billFrom
                    }
                    onChange={(e) =>
                      handleEdit(
                        "billFrom",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={
                      editStates[invoice.invoiceNumber]?.billFromAddress ||
                      invoice.billFromAddress
                    }
                    onChange={(e) =>
                      handleEdit(
                        "billFromAddress",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={
                      editStates[invoice.invoiceNumber]?.billFromEmail ||
                      invoice.billFromEmail
                    }
                    onChange={(e) =>
                      handleEdit(
                        "billFromEmail",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={
                      editStates[invoice.invoiceNumber]?.dateOfIssue ||
                      invoice.dateOfIssue
                    }
                    onChange={(e) =>
                      handleEdit(
                        "dateOfIssue",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <select
                    type="select"
                    value={
                      editStates[invoice.invoiceNumber]?.currency ||
                      invoice.currency
                    }
                    onChange={(e) =>
                      handleEdit(
                        "currency",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  >
                    <option value="$">USD (United States Dollar)</option>
                    <option value="£">GBP (British Pound Sterling)</option>
                    <option value="¥">JPY (Japanese Yen)</option>
                    <option value="$">CAD (Canadian Dollar)</option>
                    <option value="$">AUD (Australian Dollar)</option>
                    <option value="$">SGD (Singapore Dollar)</option>
                    <option value="¥">CNY (Chinese Renminbi)</option>
                    <option value="₿">BTC (Bitcoin)</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    // readonly="readonly"
                    disabled="disabled"
                    value={
                      editStates[invoice.invoiceNumber]?.currentDate ||
                      invoice.currentDate
                    }
                    onChange={(e) =>
                      handleEdit(
                        "currentDate",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={
                      editStates[invoice.invoiceNumber]?.discountAmount ||
                      invoice.discountAmount
                    }
                    onChange={(e) =>
                      handleEdit(
                        "discountAmount",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={
                      editStates[invoice.invoiceNumber]?.discountRate ||
                      invoice.discountRate
                    }
                    onChange={(e) =>
                      handleEdit(
                        "discountRate",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>

                {filteredInvoices.map((invoice) =>
                  invoice.items.map((item) =>
                    Object.keys(fieldDisplayNames).map((field, index) => (
                      <td key={index}>
                        <input
                          type="text"
                          value={
                            editStates[invoice.invoiceNumber]?.items?.[
                              item.itemId
                            ]?.[field] || item[field]
                          }
                          onChange={(e) =>
                            handleItemEdit(
                              field,
                              invoice.invoiceNumber,
                              item.itemId,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))
                  )
                )}

                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={
                      editStates[invoice.invoiceNumber]?.taxAmount ||
                      invoice.taxAmount
                    }
                    onChange={(e) =>
                      handleEdit(
                        "taxAmount",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={
                      editStates[invoice.invoiceNumber]?.taxRate ||
                      invoice.taxRate
                    }
                    onChange={(e) =>
                      handleEdit(
                        "taxRate",
                        invoice.invoiceNumber,
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    step="0.01"
                    disabled = "disabled"
                    value={
                      editStates[invoice.invoiceNumber]?.total || invoice.total
                    }
                    onChange={(e) =>
                      handleEdit("total", invoice.invoiceNumber, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Button variant="primary" onClick={handleSave}>
        Save Edited Data
      </Button>
    </>
  );
};

export default BulkEditTable;
