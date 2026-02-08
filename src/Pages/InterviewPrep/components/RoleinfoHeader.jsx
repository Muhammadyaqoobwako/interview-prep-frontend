import React from "react";

const RoleinfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {role || "Interview Session"}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {topicsToFocus}
          </p>
          {description && (
            <p className="mt-3 text-sm text-slate-500">{description}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 border border-teal-200">
          Experience: {experience} {Number(experience) === 1 ? "Year" : "Years"}
        </span>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 border border-teal-200">
          {questions} Q&A
        </span>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 border border-teal-200">
          Last Updated: {lastUpdated}
        </span>
      </div>
    </div>
  );
};

export default RoleinfoHeader;
