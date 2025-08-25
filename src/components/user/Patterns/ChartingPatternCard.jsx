import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChartingPatternCard = ({ data }) => {
  const pattern = data[0]; // Extract the first pattern object

  return (
    <div className="card mb-3 mx-auto" style={{ maxWidth: '1000px' }}>
      <div className="row g-0">
        <div className="col-md-5">
          <img
            src={`data:image/png;base64,${pattern?.image_data}`}
            className="img-fluid rounded-start w-100"
            alt={pattern?.Pattern}
            style={{ height: '100%' }}
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{pattern?.PatternType}</h5>
            <h6 className="planClass">{pattern?.Pattern}</h6>
            <p className="card-text">{pattern?.Description}</p>
            <p className="card-text">
              <small className="card-text">Trade Type: {pattern?.TType}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartingPatternCard;