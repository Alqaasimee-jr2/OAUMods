import React from 'react';
import type { Metadata } from 'next';
import CampusMap from '@/components/CampusMap';

export const metadata: Metadata = {
  title: 'Interactive Campus Map & Masterplan | OAU Campus Hub',
  description: 'Explore the 13,000-acre masterplan of Obafemi Awolowo University (OAU), Ile-Ife, designed by Arieh Sharon. Locate faculties, lecture amphitheatres, hostels, and transit corridors.',
};

export default function PortalMapPage() {
  return (
    <div className="space-y-6">
      <CampusMap />
    </div>
  );
}
