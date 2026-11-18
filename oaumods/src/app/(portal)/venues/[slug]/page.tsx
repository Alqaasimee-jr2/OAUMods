import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VenueDetails from "@/components/venues/VenueDetails";
import { sampleVenues } from "@/data/venues";

type VenuePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return sampleVenues.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({ params }: VenuePageProps): Promise<Metadata> {
  const { slug } = await params;
  const venue = sampleVenues.find((item) => item.slug === slug);

  return {
    title: venue ? `${venue.name} | OAUMods Campus Places` : "Campus Place | OAUMods",
    description: venue?.description ?? "Campus venue details and student reviews.",
  };
}

export default async function VenuePage({ params }: VenuePageProps) {
  const { slug } = await params;
  const venue = sampleVenues.find((item) => item.slug === slug);

  if (!venue) notFound();

  return <VenueDetails venue={venue} />;
}
