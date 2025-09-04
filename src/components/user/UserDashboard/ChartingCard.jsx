import React, { useState } from "react";
// import "./ChartingCard.css";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import { IconButton, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";


const ChartingCard = ({ data, HandleContinueDiscontinue, getChartingScript, fetchChartingData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;

  if (!data || data.length === 0) {
    return <NoDataFound />;
  }

  // Calculate the indices for slicing the data
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(data.length / cardsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Ensure currentPage cannot be negative
  if (currentPage < 1) {
    setCurrentPage(1);
  }

  return (
    <div>
      {/* {currentCards.map((item, index) => (
        <div className="trade-card" key={index}>
          <div className="card-header">
            <h2>{item.TSymbol}</h2>
            <span
              className={`status ${item.Status === "Executed" ? "executed" : "not-executed"
                }`}>
              {item.Status}
            </span>
          </div>
          <div className="card-body">
            <div className="card-row">
              <div>
                <strong>Order:</strong> {item.TType}
              </div>

              <div>
                <strong>Exchange:</strong> {item.Exchange}
              </div>
              <div>
                <strong>Plan:</strong> {item.Planname}
              </div>
            </div>
            <div className="card-row">
              <div>
                <strong>Token:</strong> {item.Token}
              </div>
              <div>
                <strong>Price:</strong> ₹{item.Price}
              </div>
              <div>
                <strong>Type:</strong> {item.Ordertype}
              </div>
            </div>
            <div className="card-row">
              <div>
                <strong>Option Type:</strong> {item.Optiontype}
              </div>
              <div>
                <strong>SL:</strong> {item.Sl}
              </div>
              <div>
                <strong>Target:</strong> {item.Target}
              </div>
            </div>
            <div className="card-row">
              <div>
                <strong>Exit Time:</strong> {item.Exittime}
              </div>
              <div>
                <strong>Date:</strong> {item.Date}
              </div>
              <div>
                <strong>Manual Exit:</strong> {item.ManuallyExit ? "Yes" : "No"}
              </div>
            </div>
            <div className="card-row">
              <div>
                <strong>Username:</strong> {item.Username}
              </div>
              <div>
                <strong>Account:</strong> {item.AccType}
              </div>
              <div>
                <strong>Trading:</strong> {item.Trading ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>
      ))} */}

      {currentCards.map((item, index) => (
        <div className="trade-card" key={index}>
          <div className="card-header">
            <h2>{item.TSymbol}</h2>
            <span
              className={`status ${item.Status === "Executed" ? "executed" : "not-executed"}`}>
              {item.Status}
            </span>
          </div>

          <div className="card-body">

            <div className="card-row">
              <div><strong>Order:</strong> {item.TType}</div>
              <div><strong>Exchange:</strong> {item.Exchange}</div>
              <div><strong>Plan:</strong> {item.Planname}</div>
            </div>

            <div className="card-row">
              <div><strong>Token:</strong> {item.Token}</div>
              <div><strong>Price:</strong> ₹{item.Price}</div>
              <div><strong>Type:</strong> {item.Ordertype}</div>
            </div>

            <div className="card-row">
              <div><strong>Option Type:</strong> {item.Optiontype || "-"}</div>
              <div><strong>SL:</strong> {item.Sl}</div>
              <div><strong>Target:</strong> {item.Target}</div>
            </div>

            <div className="card-row">
              <div><strong>Entry Price:</strong> ₹{item.EntryPrice}</div>
              <div><strong>Entry Time:</strong> {item.EntryTime}</div>
              <div><strong>Exit Time:</strong> {item.Exittime}</div>
            </div>


            <div className="card-row">
              <div><strong>Date:</strong> {item.Date}</div>
              <div><strong>Manual Exit:</strong>
                {
                  item.Status === "Open" && <IconButton onClick={() => {
                    HandleContinueDiscontinue(item, true);
                    fetchChartingData();
                  }}>
                    <ExitToAppIcon color="error" />
                  </IconButton>

                }
              </div>

              <div><strong>Strategy:</strong> {item.StrategyTag}</div>
              
            </div>

            <div className="card-row">
              <div><strong>Username:</strong> {item.Username}</div>
              <div><strong>Sent by:</strong> {item.AccType}</div>
              <div><strong>Trading:</strong> {item.Trading ? "Yes" : "No"}</div>
            </div>

          </div>
        </div>
      ))}


      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ChartingCard;
