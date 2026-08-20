import React from 'react';
import ResearchInnovationCorner from './ResearchInnovationCorner';
import FacultyDirectory from './FacultyDirectory';

/**
 * Zone 4 Wrapper Component.
 * Renders the Research & Innovation Corner, followed by the Faculty Directory
 * (fetched live from GET /api/zone4).
 */
const Zone4 = () => {
  return (
    <div className="zone-wrapper zone4 bg-slate-50/50">
      <FacultyDirectory/>
    </div>
  );
};

export default Zone4;