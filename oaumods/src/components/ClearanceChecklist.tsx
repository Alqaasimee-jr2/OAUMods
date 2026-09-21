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
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 mb-2">
              <FileText className="h-3.5 w-3.5" /> 5-Point Physical Clearance Pipeline
            </div>
            <h2 className="text-xl font-black tracking-tight text-white">Freshman Clearance Docket</h2>
            <p className="text-xs text-white/60 mt-0.5">
              Complete each sequential stage to validate your matriculation eligibility.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-black text-amber-400">{progressPercent}%</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">{completedCount} of {CLEARANCE_STAGES.length} Cleared</div>
            </div>
            <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
              {progressPercent === 100 ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              ) : (
                <Circle className="h-6 w-6 text-amber-400/60" />
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Mandatory Pale Yellow File Callout */}
        <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-500/10 p-3 flex items-start gap-2.5 text-xs text-amber-200/90">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <strong>Institutional Mandate:</strong> The official student clearance file jacket is strictly <strong>Pale Yellow</strong> across all 13 faculties and departments. Do not buy multi-colored folders.
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
              className={`rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
                isDone
                  ? 'border-emerald-500/30 bg-emerald-950/20'
                  : 'border-white/10 bg-slate-900/60 hover:border-white/20'
              }`}
            >
              {/* Header / Toggle Row */}
              <div
                onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                className="flex items-center justify-between p-4 cursor-pointer gap-3"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStage(stage.id);
                    }}
                    className={`h-7 w-7 shrink-0 rounded-xl border flex items-center justify-center transition-all ${
                      isDone
                        ? 'border-emerald-500 bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                        : 'border-white/20 bg-white/5 text-transparent hover:border-white/40'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Stage {stage.stageNumber}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${stage.colorBadge}`}>
                        {stage.category}
                      </span>
                    </div>
                    <h3 className={`text-sm font-bold truncate ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                      {stage.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white/40">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3.5 border-t border-white/5 text-xs text-white/80 animate-in fade-in duration-200">
                  <p className="leading-relaxed text-white/70">{stage.summary}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-start gap-2 rounded-xl bg-white/5 p-2.5">
                      <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white/90 block">Location:</strong>
                        <span className="text-white/60">{stage.location}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-xl bg-white/5 p-2.5">
                      <Clock className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white/90 block">Timeline / Hours:</strong>
                        <span className="text-white/60">{stage.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Prerequisites Checklist */}
                  <div className="rounded-xl border border-white/5 bg-slate-950/50 p-3 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      Required Documents &amp; Items:
                    </div>
                    <ul className="space-y-1 text-white/70">
                      {stage.prerequisites.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pro-Tips */}
                  <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-3 space-y-1 text-blue-200">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                      Freshman Insider Tips:
                    </div>
                    <ul className="space-y-1">
                      {stage.proTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-400">💡</span>
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
      <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-4 flex items-start gap-3 text-xs text-red-200">
        <ShieldAlert className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
        <div>
          <strong className="text-red-300 block text-sm font-bold mb-1">Clearance Anti-Scam Shield</strong>
          Clearance is 100% free. Never pay anyone loitering outside offering to &ldquo;speed up your file.&rdquo; Submit your documents only to designated officers inside faculty and department secretariats.
        </div>
      </div>
    </div>
  );
}
