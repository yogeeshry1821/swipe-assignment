import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectInvoiceList } from "../redux/invoicesSlice";
import { useNavigate } from "react-router-dom";

const BulkEdit = () => {
  const navigate = useNavigate();
  const invoiceList = useSelector(selectInvoiceList);
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  const handleContinue = () => {
    navigate("/bulkEditTable", { state: selectedInvoices });
  };
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="my-5">
        <Button variant="link" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="p-2 m-2">
              <Form.Check
                type="checkbox"
                label="Select All"
                checked={selectedInvoices.length === invoiceList.length}
                onChange={() => {
                  setSelectedInvoices(
                    selectedInvoices.length === invoiceList.length
                      ? []
                      : invoiceList.map((invoice) => invoice.invoiceNumber)
                  );

                }}
              />
            </th>
            <th>Bill To</th>
            <th>Due Date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceList.map((invoice) => (
            <tr key={invoice.id}>
              <td className="p-2 m-2">
                <Form.Check
                  type="checkbox"
                  label={invoice.invoiceNumber}
                  checked={selectedInvoices.includes(invoice.invoiceNumber)}
                  onChange={(event) => {
                    if (!event.target.checked) {
                      setSelectedInvoices(
                        selectedInvoices.filter((inv) => {
                          return inv !== invoice.invoiceNumber;
                        })
                      );
                    } else {
                      setSelectedInvoices([
                        ...selectedInvoices,
                        invoice.invoiceNumber,
                      ]);
                    }
                  }}
                />
              </td>
              <td>{invoice.billTo}</td>
              <td>{invoice.dateOfIssue}</td>
              <td>{invoice.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedInvoices.length !== 0 && (
        <Button variant="primary" onClick={handleContinue}>
          Continue
        </Button>
      )}
    </div>
  );
};

export default BulkEdit;
