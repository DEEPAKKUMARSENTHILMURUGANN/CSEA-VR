import React from 'react';
import ResearchInnovationCorner from './ResearchInnovationCorner';

/**
 * Zone 4 Wrapper Component.
 * This component now serves as the front end for the Research & Innovation Corner.
 */
const Zone4 = () => {
  return (
    <div className="zone-wrapper zone4">
      {/* The ResearchInnovationCorner now dictates the entire content of Zone 4 */}
      <ResearchInnovationCorner />
    </div>
  );
};

export default Zone4;