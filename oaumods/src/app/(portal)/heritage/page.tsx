import React from 'react';
import { ExternalLink, BookOpen, Clock, ShieldCheck, MapPin, Award, Quote, Music } from 'lucide-react';
import { GeometricShape, WordAccent } from '@/components/GeometricShapes';
import {
  SCHOOL_IDENTITY,
  HISTORICAL_MILESTONES,
  SPATIAL_NICKNAMES,
  CAMPUS_MYTHBUSTERS,
} from '@/data/campusHistoryAndActivities';

export default function HeritagePage() {
  const architecturalFeatures = [
    {
      title: 'Inverted Pyramid Geometry',
      feature: 'Cantilevered Concrete Overhangs',
      description:
        'Prominently seen on the Humanities Blocks, White House, and Civil Engineering buildings. Upper stories extend outward further than ground floors, naturally casting cooling shadows over lower floors and walkways to block fierce tropical solar radiation.',
      shape: 'triangle' as const,
      shapeColor: 'navy' as const,
    },
    {
      title: 'Pedestrian Colonnades',
      feature: 'Covered Walkway Network',
      description:
        'A continuous, shaded network of covered concrete walkways connecting student hostels, dining centers, and academic lecture theatres, ensuring students can walk across the central campus shielded from blazing sun and tropical downpours.',
      shape: 'square' as const,
      shapeColor: 'blue' as const,
    },
    {
      title: 'Breeze Channels & Cross-Ventilation',
      feature: 'Micro-Climate Wind Orientation',
      description:
        'Sharon oriented all academic buildings along prevailing regional wind axes with open-air corridors and louvred vents, enabling continuous natural cooling and air circulation without relying on air conditioning.',
      shape: 'circle' as const,
      shapeColor: 'emerald' as const,
    },
    {
      title: 'Topographical Contour Integration',
      feature: 'Natural Terrace Stepping',
      description:
        'Buildings, open-air amphitheatres, and garden courtyards follow the natural sloping contours of the ancient Ife hills, integrating native forest vegetation directly into the modern architectural matrix.',
      shape: 'hexagon' as const,
      shapeColor: 'gold' as const,
    },
  ];

  const iconicLandmarks = [
    {
      name: 'Hezekiah Oluwasanmi Library Building',
      role: 'Intellectual & Architectural Anchor',
      location: 'Central Campus Core',
      description:
        'Named after Professor Hezekiah Oluwasanmi (Vice-Chancellor 1966–1975), the visionary builder of Great Ife. Commands the central quadrangle with towering concrete pillars, tiered mezzanine study floors, and multi-story natural light wells.',
      shape: 'square' as const,
      shapeColor: 'navy' as const,
    },
    {
      name: 'Oduduwa Hall & Afrika Amphitheatre',
      role: 'Ceremonial & Cultural Headquarters',
      location: 'Central Campus Quadrangle',
      description:
        'Named after the legendary progenitor of the Yoruba people. Houses an indoor grand theatre and an adjoining 5,000-seat stepped open-air bowl renamed in eternal honor of student martyr George Iwilade ("Afrika"). Host to matriculations, convocations, and historic student congresses.',
      shape: 'hexagon' as const,
      shapeColor: 'gold' as const,
    },
    {
      name: 'The Senate Building (Secretariat)',
      role: 'Administrative Command Center',
      location: 'Overlooking Motion Ground',
      description:
        'The administrative tower of university governance, elevated on pilotis (stilts) with panoramic views across the academic belt, Motion Ground, and residential corridors.',
      shape: 'triangle' as const,
      shapeColor: 'blue' as const,
    },
    {
      name: 'The Pit Theatre',
      role: 'Dramatic Arts Arena',
      location: 'Faculty of Arts / Humanities Complex',
      description:
        'A sunken circular theatre designed by Arieh Sharon with stepped concentric seating tiers. The historic performance home of Nobel Laureate Wole Soyinka, Ola Rotimi, and groundbreaking African theatrical productions.',
      shape: 'circle' as const,
      shapeColor: 'emerald' as const,
    },
    {
      name: 'Natural History Museum of Nigeria',
      role: 'National Scientific & Archaeological Repository',
      location: 'Road 1 / Leventis Complex',
      description:
        'A sculptural concrete monument designed by James Cubitt Architects, housing millions of scientific specimens, paleontological fossils, and Nigeria’s natural heritage.',
      shape: 'square' as const,
      shapeColor: 'gold' as const,
    },
    {
      name: 'Spider House (Faculty of Technology)',
      role: 'Engineering & Industrial Studios',
      location: 'Technology Axis',
      description:
        'Known for its bold diagonal external steel trusses projecting outward like giant spider legs, designed to accommodate expansive column-free civil and mechanical engineering workshops.',
      shape: 'hexagon' as const,
      shapeColor: 'navy' as const,
    },
  ];

  return (
    <div className="space-y-10 text-left">
      {/* Page Header */}
      <div className="relative border border-slate-200 bg-white p-6 sm:p-8 space-y-4 overflow-hidden">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="gold" size="xl" variant="outline" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800">
          <GeometricShape type="square" color="navy" size="sm" />
          <span>INSTITUTIONAL HERITAGE & ARCHITECTURE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-oau-navy leading-tight">
          School History, <WordAccent shape="hexagon" color="gold">The Great Ife Anthem</WordAccent> & Sharon Architecture
        </h1>
        <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
          Founded in 1961 as the University of Ife, Obafemi Awolowo University stands as an intellectual fortress and an international architectural masterpiece. Masterplanned by Bauhaus architect Arieh Sharon and Nigerian associate A.A. Egbor across 13,000 acres, it is celebrated as Africa’s most beautiful campus.
        </p>
      </div>

      {/* Institutional Identity Card */}
      <div className="border border-slate-200 bg-white p-6 space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            Institutional Foundation & Identity
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-slate-200 bg-slate-50 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Founded</p>
            <p className="font-black text-sm text-slate-900">{SCHOOL_IDENTITY.founded}</p>
            <p className="text-xs text-slate-600">{SCHOOL_IDENTITY.movedToIfe}</p>
          </div>

          <div className="p-4 border border-slate-200 bg-slate-50 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Motto</p>
            <p className="font-black text-sm text-oau-navy">{SCHOOL_IDENTITY.mottoEnglish}</p>
            <p className="text-xs italic text-slate-600 font-medium">Yoruba: &ldquo;{SCHOOL_IDENTITY.mottoYoruba}&rdquo;</p>
          </div>

          <div className="p-4 border border-slate-200 bg-slate-50 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Official Colors</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-3.5 h-3.5 bg-[#0B1B3D] border border-slate-300 inline-block" />
              <span className="text-xs font-bold text-slate-900">Royal Cobalt Blue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-[#EAA812] border border-slate-300 inline-block" />
              <span className="text-xs font-bold text-slate-900">Great Ife Gold</span>
            </div>
          </div>

          <div className="p-4 border border-slate-200 bg-slate-50 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Renamed in 1987</p>
            <p className="font-bold text-xs text-slate-900">In honor of Chief Obafemi Awolowo</p>
            <p className="text-[11px] text-slate-600">Visionary statesman and founding Chancellor (1909–1987).</p>
          </div>
        </div>
      </div>

      {/* Cultural Monument: The Great Ife Anthem */}
      <div className="border border-blue-200 bg-blue-50/70 p-6 space-y-4">
        <div className="border-b border-blue-200 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-oau-navy" />
            <h2 className="text-base font-black text-oau-navy uppercase tracking-wide">
              The Great Ife Anthem (Cultural Monument)
            </h2>
          </div>
          <span className="text-xs font-bold text-blue-900 bg-white border border-blue-200 px-2 py-0.5">
            Solemn Tradition
          </span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed max-w-2xl">
          Sung standing at full attention at every formal university matriculation, convocation, student congress, and international alumni assembly. It embodies Great Ife’s uncompromising commitment to intellectual vigilance, athletic vigor, and social justice.
        </p>

        <div className="bg-white border border-blue-300 p-5 shadow-xs max-w-lg">
          <div className="space-y-1 text-sm font-serif italic text-slate-900 leading-relaxed">
            {SCHOOL_IDENTITY.anthemLyrics.map((line, idx) => (
              <p
                key={idx}
                className={
                  idx === 0 || idx === 6 || idx === 9
                    ? 'font-bold font-sans not-italic text-oau-navy text-base pt-1'
                    : ''
                }
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Milestones Timeline */}
      <div className="border border-slate-200 bg-white p-6 space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-700" />
            Chronological Milestones in Great Ife History
          </h2>
          <p className="text-xs text-slate-600">
            From the 1960 Ashby Commission protest to modern global architectural conservation.
          </p>
        </div>

        <div className="space-y-4">
          {HISTORICAL_MILESTONES.map((m, idx) => (
            <div key={idx} className="border-l-2 border-oau-navy pl-4 py-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white bg-oau-navy px-2 py-0.5">
                  {m.year}
                </span>
                <h3 className="font-black text-sm text-slate-900">{m.title}</h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">{m.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sharon Architectural Masterplan & Philosophy */}
      <div className="border border-slate-200 bg-white p-6 space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-700" />
            Arieh Sharon Tropical Modernism & Design Philosophy
          </h2>
          <p className="text-xs text-slate-600">
            Winner of the international Getty Foundation &ldquo;Keeping It Modern&rdquo; conservation grant.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {architecturalFeatures.map((arch) => (
            <div key={arch.title} className="p-4 border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GeometricShape type={arch.shape} color={arch.shapeColor} size="sm" />
                  <h3 className="font-black text-sm text-oau-navy">{arch.title}</h3>
                </div>
                <span className="text-[10px] font-semibold text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5">
                  {arch.feature}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-5">{arch.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Iconic Campus Landmarks */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-700" />
            Iconic Campus Architectural Landmarks
          </h2>
          <p className="text-xs text-slate-600">Physical anchors that define the Great Ife built environment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {iconicLandmarks.map((landmark) => (
            <div
              key={landmark.name}
              className="border border-slate-200 bg-white p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5">
                    {landmark.location}
                  </span>
                  <GeometricShape type={landmark.shape} color={landmark.shapeColor} size="sm" />
                </div>
                <h3 className="font-black text-base text-oau-navy leading-snug">{landmark.name}</h3>
                <p className="text-xs font-semibold text-amber-700">{landmark.role}</p>
                <p className="text-xs text-slate-700 leading-relaxed">{landmark.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spatial Nicknames & Decoders */}
      <div className="border border-slate-200 bg-white p-6 space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-oau-navy uppercase tracking-wide flex items-center gap-2">
            <Quote className="w-4 h-4 text-emerald-700" />
            Campus Spatial Nicknames & Slang Decoders
          </h2>
          <p className="text-xs text-slate-600">
            How students refer to buildings, lecture theatres, and campus rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SPATIAL_NICKNAMES.map((n, idx) => (
            <div key={idx} className="p-3 border border-slate-200 bg-slate-50 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-xs text-oau-navy">{n.nickname}</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-white border border-slate-300 text-slate-600">
                  {n.category}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-700">{n.officialName}</p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-200">
                {n.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Myth-Busters */}
      <div className="border border-red-300 bg-red-50/70 p-6 space-y-4">
        <div className="border-b border-red-200 pb-2 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-red-700" />
          <h2 className="text-base font-bold text-red-950 uppercase tracking-wide">
            Great Ife Institutional Myth-Busters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAMPUS_MYTHBUSTERS.map((m, idx) => (
            <div key={idx} className="bg-white border border-red-200 p-4 space-y-1.5">
              <p className="font-black text-xs text-red-800">❌ Myth: {m.myth}</p>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-emerald-800">✓ Fact: </strong>
                {m.truth}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA to Freshman Guide */}
      <div className="border border-amber-400 bg-amber-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-oau-navy">Need Practical Help as a Fresher?</h3>
          <p className="text-xs text-slate-700">
            The OAUMods Companion App provides step-by-step guidance on clearance, 100L lecture rooms, and hostel rules.
          </p>
        </div>
        <a
          href="/app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-oau-navy font-bold text-xs border border-amber-500 shrink-0"
        >
          <span>Open Freshman Guide</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
