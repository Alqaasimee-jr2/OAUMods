'use client';

import React, { useState, useEffect } from 'react';
import { CLEARANCE_STAGES } from '../data/clearanceStages';
import { CheckCircle2, Circle, Clock, MapPin, AlertCircle, ChevronDown, ChevronUp, ShieldAlert, FileText } from 'lucide-react';

const STORAGE_KEY = 'oaumods_clearance_progress_v1';

export default function ClearanceChecklist() {
  const [completedStages, setCompletedStages] = useState<Record<string, boolean>>({});
  const [expandedStage, setExpandedStage] = useState<string | null>('health');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCompletedStages(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  function toggleStage(id: string) {
    const updated = { ...completedStages, [id]: !completedStages[id] };
    setCompletedStages(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  const completedCount = Object.values(completedStages).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / CLEARANCE_STAGES.length) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Clearance Progress Tracker Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-oau-navy via-campus-blue to-[#0E2845] p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-student-gold/40 bg-student-gold/20 px-3 py-1 text-xs font-bold text-student-gold mb-2">
              <FileText className="h-3.5 w-3.5" /> 5-Point Physical Clearance Pipeline
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">Freshman Clearance Docket</h2>
            <p className="text-xs text-white/80 mt-0.5">
              Complete each sequential stage to validate your matriculation eligibility.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-black text-student-gold">{progressPercent}%</div>
              <div className="text-[10px] uppercase tracking-wider text-white/60">{completedCount} of {CLEARANCE_STAGES.length} Cleared</div>
            </div>
            <div className="h-12 w-12 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center">
              {progressPercent === 100 ? (
                <CheckCircle2 className="h-6 w-6 text-fresh-green" />
              ) : (
                <Circle className="h-6 w-6 text-student-gold/70" />
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full bg-gradient-to-r from-campus-blue via-student-gold to-fresh-green transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Mandatory Pale Yellow File Callout */}
        <div className="mt-4 rounded-2xl border-2 border-student-gold/50 bg-[#FEF9C3] dark:bg-[#2A2312] p-3.5 flex items-start gap-3 text-xs text-amber-950 dark:text-student-gold">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-warn mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-amber-950 dark:text-amber-200 block text-xs font-extrabold uppercase tracking-wide">
              Official University Standard: Pale Yellow Manila Folder
            </strong>
            The official student clearance file jacket is strictly <strong>Pale Yellow</strong> across all 13 faculties and departments. Never purchase colored plastic or card folders—they will be returned by Faculty Officers.
          </div>
        </div>
      </div>

      {/* Stage Cards List */}
      <div className="space-y-3">
        {CLEARANCE_STAGES.map((stage) => {
          const isDone = Boolean(completedStages[stage.id]);
          const isExpanded = expandedStage === stage.id;

          return (
            <div
              key={stage.id}
              className={`rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden shadow-xs ${
                isDone
                  ? 'border-fresh-green/40 bg-fresh-green/5 dark:bg-fresh-green/10'
                  : 'border-soft-blue-gray dark:border-[#1C2D44] bg-pure-white dark:bg-[#0E1827] hover:border-campus-blue/40'
              }`}
            >
              {/* Header / Toggle Row */}
              <div
                onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer gap-3"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStage(stage.id);
                    }}
                    className={`h-7 w-7 shrink-0 rounded-xl border flex items-center justify-center transition-all ${
                      isDone
                        ? 'border-fresh-green bg-fresh-green text-white shadow-md shadow-fresh-green/20'
                        : 'border-soft-blue-gray dark:border-white/20 bg-pale-blue/50 dark:bg-white/5 text-transparent hover:border-campus-blue'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-slate dark:text-slate-400">Stage {stage.stageNumber}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${stage.colorBadge}`}>
                        {stage.category}
                      </span>
                    </div>
                    <h3 className={`text-sm font-bold truncate mt-0.5 ${isDone ? 'text-fresh-green dark:text-emerald-300 line-through' : 'text-deep-slate dark:text-white'}`}>
                      {stage.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-slate dark:text-slate-400">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-4 pb-5 pt-1 space-y-3.5 border-t border-soft-blue-gray/50 dark:border-white/5 text-xs text-deep-slate dark:text-slate-200 animate-in fade-in duration-200">
                  <p className="leading-relaxed text-muted-slate dark:text-slate-300">{stage.summary}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-start gap-2 rounded-xl bg-pale-blue/60 dark:bg-[#122033] p-2.5 border border-soft-blue-gray/50 dark:border-transparent">
                      <MapPin className="h-3.5 w-3.5 text-campus-blue dark:text-sky-blue shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-deep-slate dark:text-white block">Location:</strong>
                        <span className="text-muted-slate dark:text-slate-300">{stage.location}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-xl bg-pale-blue/60 dark:bg-[#122033] p-2.5 border border-soft-blue-gray/50 dark:border-transparent">
                      <Clock className="h-3.5 w-3.5 text-student-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-deep-slate dark:text-white block">Timeline / Hours:</strong>
                        <span className="text-muted-slate dark:text-slate-300">{stage.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Prerequisites Checklist */}
                  <div className="rounded-xl border border-soft-blue-gray dark:border-[#1C2D44] bg-pale-blue/40 dark:bg-[#09101A] p-3 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-oau-navy dark:text-sky-blue">
                      Required Documents &amp; Items:
                    </div>
                    <ul className="space-y-1 text-muted-slate dark:text-slate-300">
                      {stage.prerequisites.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-campus-blue dark:text-sky-blue font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pro-Tips */}
                  <div className="rounded-xl border border-campus-blue/20 bg-pale-blue/70 dark:bg-campus-blue/10 p-3 space-y-1 text-deep-slate dark:text-slate-200">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-campus-blue dark:text-sky-blue">
                      Freshman Insider Tips:
                    </div>
                    <ul className="space-y-1 text-muted-slate dark:text-slate-300">
                      {stage.proTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-campus-blue">💡</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Anti-Scam Advisory */}
      <div className="rounded-2xl border border-soft-red/30 bg-soft-red/10 p-4 flex items-start gap-3 text-xs text-deep-slate dark:text-slate-200">
        <ShieldAlert className="h-5 w-5 shrink-0 text-soft-red mt-0.5" />
        <div>
          <strong className="text-soft-red block text-sm font-bold mb-1">Clearance Anti-Scam Shield</strong>
          Clearance is 100% free. Never pay anyone loitering outside offering to &ldquo;speed up your file.&rdquo; Submit your documents only to designated officers inside faculty and department secretariats.
        </div>
      </div>
    </div>
  );
}
