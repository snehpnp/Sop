



import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Info, Trash2, Bot } from "lucide-react"; // Lucide Icons

const SuggestedBotCard = ({ title, strategyType, description, onViewDetails, handleDeleteBot }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const Role = localStorage.getItem("Role");
  const maxDescriptionLength = 120;

  const isLongDescription = description && description.length > maxDescriptionLength;
  const displayedDescription = showFullDescription || !isLongDescription
    ? description
    : `${description.slice(0, maxDescriptionLength)}...`;

  return (
    <Card
      className="h-100 suggested-bot-card card-bg-color shadow themed-card card-border"
      style={{
        width: '93%',
        borderRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.12)'
      }}
    >
      <Card.Body style={{ display: 'flex', flexDirection: 'column', height: '95%' }}>
        {/* Header with icon and title */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <Bot className="card-text-Color" size={22} />
          <Card.Title className="fw-bold fs-5 card-text-Color mb-0">{title}</Card.Title>
        </div>

        {/* Description */}
        <Card.Text
          className="card-text-Color"
          style={{
            fontSize: "1.02rem",
            minHeight: "100px",
            lineHeight: 1.6,
            wordBreak: "break-word"
          }}
        >
          {displayedDescription}
          {isLongDescription && (
            <Button
              variant="link"
              size="sm"
              className="desc-link-btn card-text-Color"
              style={{ padding: 0, marginLeft: 6 }}
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Show less" : "Read more"}
            </Button>
          )}
        </Card.Text>

        {/* Strategy Type */}
       {/* <div className="mt-2 mb-3  text-muted card-text-Color" style={{ fontSize: "0.95rem" }}>
          <strong className="card-text-Color">Strategy Type: {strategyType} </strong> 
        </div>
*/}
        <div style={{ flexGrow: 1 }} />

        {/* Action Buttons */}
        {Role === "Admin" ? (
          <div className="d-flex justify-content-between gap-2 mt-2">
            <Button
              variant="outline-primary"
              onClick={onViewDetails}
              className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-4"
            >
              <Info size={18} />
              View Details
            </Button>

            <Button
              variant="outline-danger"
              onClick={() => handleDeleteBot(title)}
              className="d-flex align-items-center justify-content-center gap-2 rounded-4 px-3"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline-primary"
            onClick={onViewDetails}
            className="rounded-4 mt-2 d-flex align-items-center justify-content-center gap-2"
          >
            <Info size={18} />
            View Details & Add
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default SuggestedBotCard;
