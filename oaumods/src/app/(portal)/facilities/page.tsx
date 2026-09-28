import React from 'react';
import { PhoneCall } from 'lucide-react';
import { GeometricShape, WordAccent } from '@/components/GeometricShapes';

export default function FacilitiesPage() {
  const facilities = [
    {
      name: 'Hezekiah Oluwasanmi Library',
      category: 'Central Academic Facility',
      role: 'Main University Library & Research Center',
      shape: 'square' as const,
      shapeColor: 'navy' as const,
      details: [
        'Named after Professor Hezekiah Oluwasanmi, second Vice-Chancellor of the university.',
        'Houses over 700,000 volumes, periodicals, government documents, and digital databases.',
        'Includes dedicated reading rooms, law library annex, and postgraduate research spaces.',
        'Registration is mandatory for all students to borrow books and access e-resources.',
      ],
      rules: 'Quiet reading zones only. Bags must be checked in at the entrance cloakroom.',
    },
    {
      name: 'University Health Centre ("JAC")',
      category: 'Healthcare & Emergency',
      role: 'Primary Medical Care for Students & Staff',
      shape: 'circle' as const,
      shapeColor: 'emerald' as const,
      details: [
        'Commonly called "JAC" by students. Located along the central campus health corridor.',
        'Provides round-the-clock primary medical attention, outpatient consultation, pharmacy, and laboratory tests.',
        'Mandatory medical screening (including chest X-rays) for all admitted freshers.',
        'Severe emergencies are referred to Obafemi Awolowo University Teaching Hospitals Complex (OAUTHC).',
      ],
      rules: 'Students must present their university clinic registration card ("Green Card") for routine consultations.',
    },
    {
      name: 'Student Union Building (SUB)',
      category: 'Student Governance & Social Hub',
      role: 'Ken Saro-Wiwa Building & Student Headquarters',
      shape: 'hexagon' as const,
      shapeColor: 'gold' as const,
      details: [
        'The political, administrative, and commercial center for student life.',
        'Houses the offices of the Student Union Executive Council and Students’ Representative Council (SRC).',
        'Includes butteries, affordable student cafeterias, and photocopying/printing centres.',
        'The SUB car park is the primary boarding point for campus shuttle buses and tricycles (kekes).',
      ],
      rules: 'Official Student Union tickets are sold at the park ticketing booths.',
    },
    {
      name: 'Sports Complex',
      category: 'Recreation & Athletics',
      role: 'Campus Athletics & Fitness Arena',
      shape: 'triangle' as const,
      shapeColor: 'blue' as const,
      details: [
        'Standard synthetic running track and main football pitch.',
        'Indoor sports hall for badminton, table tennis, and basketball.',
        'Olympic-sized swimming pool used for training, competitions, and student recreation.',
        'Tennis courts and volleyball courts open for student training.',
      ],
      rules: 'Appropriate sportswear and footwear required for indoor courts and running tracks.',
    },
    {
      name: 'Central ICT Centre (Computer Centre)',
      category: 'Digital Infrastructure',
      role: 'University Network & CBT Examination Hub',
      shape: 'square' as const,
      shapeColor: 'blue' as const,
      details: [
        'Manages the university internet backbone, ePortal student records, and institutional email.',
        'Hosts computerized testing (CBT) for large general courses and post-UTME screening.',
        'Provides technical support for portal registration and course registration issues.',
      ],
      rules: 'Phones and unauthorized electronic devices strictly prohibited during official CBT exams.',
    },
    {
      name: 'Campus Security Unit',
      category: 'Safety & Security',
      role: 'Internal University Security Patrol',
      shape: 'triangle' as const,
      shapeColor: 'navy' as const,
      details: [
        'Headquartered near the Central Administration block with patrol posts across all gates and halls.',
        'Maintains campus peace, traffic control, and investigates security incidents.',
        'Enforces university vehicle registration and gate curfew rules.',
      ],
      rules: 'Report any security incident or suspicious activity immediately to the nearest security post.',
    },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Page Header */}
      <div className="relative border border-slate-200 bg-white p-6 sm:p-8 space-y-3 overflow-hidden">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="gold" size="lg" variant="outline" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800">
          <GeometricShape type="square" color="navy" size="sm" />
          <span>CAMPUS INFRASTRUCTURE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-oau-navy">
          <WordAccent shape="hexagon" color="gold">Campus Facilities</WordAccent> & Services
        </h1>
        <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
          Obafemi Awolowo University provides central facilities serving all students across every
          level. Here is the verified guide to the library, health center, sports complex, and
          essential university services.
        </p>
      </div>

      {/* Facilities Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facilities.map((fac, idx) => (
          <div key={idx} className="border border-slate-200 bg-white p-6 space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <GeometricShape type={fac.shape} color={fac.shapeColor} size="sm" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-campus-blue">
                  {fac.category}
                </span>
              </div>
              <h2 className="text-lg font-black text-oau-navy">{fac.name}</h2>
              <p className="text-xs text-slate-600 font-medium">{fac.role}</p>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block">Key Information:</span>
              <ul className="space-y-1.5 list-disc pl-4">
                {fac.details.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-oau-navy">Usage Note: </span>
              <span>{fac.rules}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Contact Strip */}
      <div className="border border-slate-200 bg-white p-6">
        <div className="border-b border-slate-200 pb-2 mb-3">
          <div className="flex items-center gap-2 text-oau-navy">
            <PhoneCall className="w-4 h-4 text-red-600" />
            <h3 className="text-base font-bold uppercase tracking-wide">
              Emergency Numbers On Campus
            </h3>
          </div>
          <p className="text-xs text-slate-600">Save these numbers on your phone for quick access during emergencies.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200">
            <p className="text-slate-500 font-semibold uppercase">Ambulance Service 1</p>
            <p className="text-base font-black text-oau-navy mt-1">0815 375 0977</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200">
            <p className="text-slate-500 font-semibold uppercase">Ambulance Service 2</p>
            <p className="text-base font-black text-oau-navy mt-1">0903 569 9725</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200">
            <p className="text-slate-500 font-semibold uppercase">Teaching Hospital Emergency</p>
            <p className="text-base font-black text-oau-navy mt-1">0815 209 2813</p>
          </div>
        </div>
      </div>
    </div>
  );
}
