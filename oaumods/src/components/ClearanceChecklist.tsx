'use client';

import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, ChevronDown, ChevronUp, AlertCircle, FileText } from 'lucide-react';
import { GeometricShape, WordAccent } from './GeometricShapes';

const STAGES = [
  {
    id: 'fees',
    stepNumber: '01',
    title: 'Pay School Fees on ePortal (via Remita)',
    location: 'Online at eportal.oauife.edu.ng',
    brief: 'Generate Remita RRR on your student portal and pay your verified tuition and acceptance charges.',
    documentsNeeded: [
      'JAMB Admission Letter (Original & Copies)',
      'Remita Retrieval Reference (RRR) slip',
      'Bank payment teller or debit card payment receipt (print 4 copies)',
    ],
    tips: 'Ensure the name on your Remita slip matches your official admission letter exactly. Keep at least 4 printed copies of the verified ePortal receipt.',
  },
  {
    id: 'biodata',
    stepNumber: '02',
    title: 'Fill & Print ePortal Bio-Data Form',
    location: 'Online at eportal.oauife.edu.ng',
    brief: 'Complete your personal data, home address, next of kin, and uploaded O’Level credentials on the student portal.',
    documentsNeeded: [
      'Original O’Level Result (WAEC/NECO/NABTEB)',
      'JAMB Result Slip',
      'Recent passport photographs (red or white background)',
    ],
    tips: 'Double check your date of birth and state of origin before submitting. Once submitted, changes require formal administrative approval at Computer Centre.',
  },
  {
    id: 'health',
    stepNumber: '03',
    title: 'Medical Screening at University Health Centre ("JAC")',
    location: 'University Health Centre (JAC), Central Campus',
    brief: 'Complete mandatory medical laboratory tests and chest X-ray to receive your permanent clinic card ("Green Card").',
    documentsNeeded: [
      'ePortal Medical Screening Form',
      'Chest X-Ray film and radiologist report',
      'Laboratory urine and blood test report',
      'Two (2) recent passport photographs',
    ],
    tips: 'Arrive early in the morning to join the entry queue. The Health Centre issues your official "Green Card", which gives you free medical access on campus.',
  },
  {
    id: 'faculty',
    stepNumber: '04',
    title: 'Faculty Screening & File Endorsement',
    location: 'Your Faculty Office (e.g. Science White House, Tech Spider House)',
    brief: 'Present your physical documents to your Faculty Officer for verification and signing of your clearance certificate.',
    documentsNeeded: [
      'Pale Yellow Manila File Jacket (Buy at campus bookshops)',
      'JAMB Admission Letter (original + 3 photocopies)',
      'WAEC/NECO Certificate or Statement of Result',
      'Birth Certificate or Statutory Declaration of Age',
      'Certificate of Local Government Origin',
      'Printed School Fees and Bio-data receipts',
      'Six (6) passport photographs',
    ],
    tips: 'Buy the standard Pale Yellow Manila file. Faculty officers will reject green or blue files. Arrange your documents in the exact order requested on the faculty notice board.',
  },
  {
    id: 'department',
    stepNumber: '05',
    title: 'Departmental File Submission & Course Advising',
    location: 'Your Departmental Office (Head of Department / Secretary)',
    brief: 'Submit a duplicate file of your verified documents to your Department Secretary and meet your Staff Course Adviser.',
    documentsNeeded: [
      'Signed Faculty Clearance Certificate (Original + Copy)',
      'Departmental File Jacket',
      'Approved Course Registration Form',
      'Four (4) passport photographs',
    ],
    tips: 'Meet your assigned Departmental Course Adviser to review your 100-level course list before clicking final submission on ePortal.',
  },
  {
    id: 'hostel',
    stepNumber: '06',
    title: 'Hostel Bed Space Clearance (Angola, Moz & Other Halls)',
    location: 'Allocated Hall Porter Office (Angola, Moz, Fajuyi, Moremi, Awolowo, Alumni)',
    brief: 'For students who successfully balloted for on-campus accommodation on ePortal. When Angola or Moz are filled up, freshers are allocated to other halls.',
    documentsNeeded: [
      'Printed ePortal Bed Space Allocation Slip',
      'Accommodation maintenance fee payment receipt',
      'Two (2) passport photographs',
    ],
    tips: 'Report directly to the Hall Porter’s office of your assigned hall. When Angola or Moz are filled up, 100L allocations in other halls follow the exact same verified porter clearance steps. Never buy from private individuals.',
  },
  {
    id: 'library',
    stepNumber: '07',
    title: 'Hezekiah Oluwasanmi Library Registration',
    location: 'Hezekiah Library, Ground Floor (Readers’ Services)',
    brief: 'Register your details to obtain your barcoded university library borrower card.',
    documentsNeeded: [
      'Faculty Clearance Slip or Bio-Data Form',
      'One (1) passport photograph',
    ],
    tips: 'Library registration allows you to borrow physical textbooks and access e-learning journals for your courses.',
  },
];

export default function ClearanceChecklist() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>('fees');

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem('oau_clearance_progress');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCompleted(parsed);
          }
        }
      } catch {
        // fallback
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  function toggle(id: string) {
    let updated: string[];
    if (completed.includes(id)) {
      updated = completed.filter((item) => item !== id);
    } else {
      updated = [...completed, id];
    }
    setCompleted(updated);
    try {
      localStorage.setItem('oau_clearance_progress', JSON.stringify(updated));
      // Keep secondary key in sync
      const obj: Record<string, boolean> = {};
      updated.forEach((k) => (obj[k] = true));
      localStorage.setItem('oaumods_clearance_progress_v1', JSON.stringify(obj));
    } catch {
      // ignore
    }
  }

  const percent = Math.round((completed.length / STAGES.length) * 100);

  return (
    <div className="space-y-6 text-left">
      {/* Progress Box */}
      <div className="relative border border-slate-200 bg-white p-5 space-y-3 overflow-hidden">
        <div className="absolute top-2 right-4 pointer-events-none opacity-20 hidden sm:block">
          <GeometricShape type="hexagon" color="emerald" size="lg" variant="outline" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div>
            <h2 className="text-base font-black text-oau-navy uppercase tracking-wide">
              Freshman Physical <WordAccent shape="square" color="navy">Clearance Pipeline</WordAccent>
            </h2>
            <p className="text-xs text-slate-600">
              Check off each stage as you complete it. Your progress is saved on this device.
            </p>
          </div>
          <div className="text-xs font-bold text-oau-navy bg-slate-100 px-3 py-1 border border-slate-300 self-start sm:self-auto flex items-center gap-1.5">
            <GeometricShape type="circle" color="emerald" size="sm" />
            <span>{completed.length} of {STAGES.length} Completed ({percent}%)</span>
          </div>
        </div>

        {/* Progress Bar (Sharp Rectangular) */}
        <div className="w-full bg-slate-100 h-3 border border-slate-300 overflow-hidden">
          <div
            className="bg-emerald-600 h-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      {/* Mandatory File Jacket Notice */}
      <div className="border border-amber-400 bg-amber-50 p-4 space-y-1 text-xs text-slate-800">
        <div className="flex items-center gap-1.5 font-bold text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          <span>Mandatory Folder Requirement for Faculty Screening</span>
        </div>
        <p className="leading-relaxed">
          Faculty officers strictly require a <strong>Pale Yellow Manila File</strong>. Do not buy
          green, blue, or plastic folders. Buy at campus bookshops around SUB or your faculty quadrangle.
        </p>
      </div>

      {/* Stages List */}
      <div className="space-y-3">
        {STAGES.map((stage, idx) => {
          const isDone = completed.includes(stage.id);
          const isExpanded = expanded === stage.id;
          const stageShapes: Array<{ type: 'square' | 'triangle' | 'hexagon' | 'circle'; color: 'navy' | 'blue' | 'emerald' | 'gold' | 'amber' }> = [
            { type: 'square', color: 'navy' },
            { type: 'hexagon', color: 'blue' },
            { type: 'circle', color: 'emerald' },
            { type: 'triangle', color: 'gold' },
            { type: 'square', color: 'amber' },
            { type: 'hexagon', color: 'emerald' },
            { type: 'triangle', color: 'navy' },
          ];
          const curShape = stageShapes[idx % stageShapes.length];

          return (
            <div
              key={stage.id}
              className={`border transition-colors bg-white ${
                isDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
              }`}
            >
              {/* Header row */}
              <div className="p-4 flex items-start sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <button
                    onClick={() => toggle(stage.id)}
                    className="mt-0.5 sm:mt-0 text-slate-700 hover:text-emerald-700 focus:outline-hidden"
                    title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                  >
                    {isDone ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <GeometricShape type={curShape.type} color={curShape.color} size="sm" />
                      <span className="text-[11px] font-black text-slate-500 uppercase">
                        Stage {stage.stepNumber}
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Cleared
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm sm:text-base font-bold ${isDone ? 'line-through text-slate-500' : 'text-oau-navy'}`}>
                      {stage.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">{stage.location}</p>
                  </div>
                </div>

                <button
                  onClick={() => setExpanded(isExpanded ? null : stage.id)}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 flex items-center gap-1 shrink-0"
                >
                  <span>{isExpanded ? 'Hide' : 'Details'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-3 text-xs text-slate-700 bg-slate-50">
                  <p className="leading-relaxed">{stage.brief}</p>

                  <div className="space-y-1.5 p-3 bg-white border border-slate-200">
                    <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-campus-blue" />
                      Documents Required:
                    </span>
                    <ul className="space-y-1 list-disc pl-4 text-slate-700">
                      {stage.documentsNeeded.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 bg-amber-50 border border-amber-200 text-slate-800">
                    <strong className="text-amber-900 font-bold">Important Tip: </strong>
                    <span>{stage.tips}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
