import type { Metadata } from "next";
import VenueDirectory from "@/components/venues/VenueDirectory";

export const metadata: Metadata = {
  title: "Campus Places & Reviews | OAUMods",
  description: "Discover campus venues and compare student experiences around Obafemi Awolowo University.",
};

export default function VenuesPage() {
  return <VenueDirectory />;
}
