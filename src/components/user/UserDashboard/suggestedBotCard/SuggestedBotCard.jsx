// // components/StrategyCard.jsx
// import React from "react";
// import { Card, Button } from "react-bootstrap";

// const SuggestedBotCard = ({ title, strategyType, description, onViewDetails, handleDeleteBot }) => {
//   const [showFullDescription, setShowFullDescription] = React.useState(false);
//   const Role = localStorage.getItem("Role");
//   const maxDescriptionLength = 120; // Adjust for your design
//   const isLongDescription = description && description.length > maxDescriptionLength;
//   const displayedDescription = showFullDescription || !isLongDescription
//     ? description
//     : description.slice(0, maxDescriptionLength) + '...';

//   return (
//     <Card className="h-100 suggested-bot-card card-bg-color shadow-lg border-0" style={{ width: '100%', borderRadius: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)' }}>
       
//       <Card.Body style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem' }}>
//         <Card.Title className="fw-bold card-text-Color">{title}</Card.Title>
//         <div style={{ flexGrow: 0 }}>
//           <Card.Text className="card-text-Color" style={{ fontSize: "1.02rem", minHeight: "100px", marginBottom: 0, lineHeight: 1.6, wordBreak: 'break-word' }}>
//             {displayedDescription}
//             {isLongDescription && !showFullDescription && (
//               <Button
//                 variant="link"
//                 size="sm"
//                 className="desc-link-btn card-text-Color"
//                 style={{ padding: 0 }}
//                 onClick={() => setShowFullDescription(true)}
//               >
//                 Read more
//               </Button>
//             )}
//             {isLongDescription && showFullDescription && (
//               <Button
//                 variant="link"
//                 size="sm"
//                 className="desc-link-btn card-text-Color"
//                 style={{ padding: 0 }}
//                 onClick={() => setShowFullDescription(false)}
//               >
//                 Show less
//               </Button>
//             )}
//           </Card.Text>
//           <Card.Text className="card-text-Color" style={{ fontSize: "0.98rem", marginTop: 12, fontWeight: 500, marginBottom: 0 }}>
//             <span style={{ fontWeight: 600 }}>Strategy Type:</span> {strategyType}
//           </Card.Text>
//         </div>
//         <div style={{ flexGrow: 1 }} />
//         {/* Action Buttons */}
//         {Role === "Admin" ? (
//           <div className="d-flex flex-row align-items-center justify-content-between gap-2" style={{ width: '100%', marginTop: 8 }}>
//             <div style={{ flex: 1 }}>
//               <Button
//                 variant="outline-primary"
//                 onClick={onViewDetails}
//                 className="w-100 rounded-4"
//               >
//                 <i className="bi bi-info-circle-fill me-2"></i>
//                 View Details
//               </Button>
//             </div>
//             <div>
//               <button className="del-button" onClick={() => handleDeleteBot(title)}>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" className="svgIcon bin-top">
//                   <g clipPath="url(#clip0_35_24)">
//                     <path fill="black" d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z" />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_35_24">
//                       <rect fill="white" height={14} width={69} />
//                     </clipPath>
//                   </defs>
//                 </svg>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" className="svgIcon bin-bottom">
//                   <g clipPath="url(#clip0_35_22)">
//                     <path fill="black" d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z" />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_35_22">
//                       <rect fill="white" height={57} width={69} />
//                     </clipPath>
//                   </defs>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="d-flex flex-row justify-content-between align-items-center" style={{ height: '100%', marginTop: 8 }}>
//             <Button
//               variant="outline-primary"
//               onClick={onViewDetails}
//               className="rounded-4"
//               style={{ flex: 1, marginRight: '10px' }}
//             >
//               <i className="bi bi-info-circle-fill me-2"></i>
//               View Details & Add
//             </Button>
//           </div>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default SuggestedBotCard;



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
        <div className="mt-2 mb-3  text-muted card-text-Color" style={{ fontSize: "0.95rem" }}>
          <strong className="card-text-Color">Strategy Type: {strategyType} </strong> 
        </div>

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
