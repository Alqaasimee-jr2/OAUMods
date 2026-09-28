'use client';

import React from 'react';
import CampusMap from '@/components/CampusMap';

export default function AppMapPage() {
  return (
    <div className="space-y-6">
      <CampusMap isFreshmanContext={true} />
    </div>
  );
}
