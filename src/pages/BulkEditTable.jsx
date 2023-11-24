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
      console.log("ssd", invoice);
      initialEditState[parseInt(invoice.invoiceNumber)] = { ...invoice };
    });
    return initialEditState;
  });
  console.log("editStates", editStates);
  const handleSave = () => {
    console.log("asdf", Object.keys(editStates));
    Object.keys(editStates).forEach((invoiceNumber) => {
      // console.log("invoiceNumber", invoiceNumber)
      const invoice = invoiceList.find(
        (invoice) => invoice.invoiceNumber === parseInt(invoiceNumber)
      );
      // console.log('invoice', invoice)
      if (invoice) {
        const invoiceId = invoice.id;
        console.log("Invoice ID:", invoiceId);
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
  console.log("loca", location.state);
  const filteredInvoices = invoiceList.filter((invoice) => {
    console.log(invoice.invoiceNumber);
    return invoice.invoiceNumber == location.state;
  });
  const handleEdit = (field, invoiceNumber, value) => {
    setEditStates((prevState) => ({
      ...prevState,
      [invoiceNumber]: {
        ...prevState[invoiceNumber],
        [field]: value,
      },
    }));
  };
  const fieldDisplayNames = {
    itemId: "Item Number",
    itemName: "Item Name",
    itemDescription: "Item Description",
    itemPrice: "Item Price",
    itemQuantity: "Item Quantity",
  };

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
              {filteredInvoices.length > 0 &&
                filteredInvoices[0].items.length > 0 &&
                filteredInvoices[0].items.map((item) =>
                  Object.keys(item).map((field, index) => (
                    <th key={index}>{`${fieldDisplayNames[field]} ${item.itemId}`}</th>
                  ))
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
                  <textarea
                    rows="3"
                    cols="15"
                    type="text"
                    className="overflow-y: auto"
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
                  <input
                    type="text"
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
                  />
                </td>
                <td>
                  <input
                    type="text"
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
                    type="text"
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
                    type="text"
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
                    Object.keys(item).map((field, index) => (
                      <td key={index}>
                        <input
                          type="text"
                          value={
                            editStates[invoice.invoiceNumber]?.items?.[
                              item.itemId
                            ]?.[field] || item[field]
                          }
                          onChange={(e) =>
                            handleEdit(
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
                    type="text"
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
                    type="text"
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
                    type="text"
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
