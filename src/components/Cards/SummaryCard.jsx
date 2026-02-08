import React from "react";
import { getInitials } from "../../utils/helper";
import { LuTrash2 } from "react-icons/lu";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white p-3 overflow-hidden cursor-pointer shadow-sm border border-slate-200 relative group transition-all duration-300 hover:shadow-md"
      onClick={onSelect}
    >
      <div
        className="rounded-xl p-4 sm:p-5 cursor-pointer relative overflow-hidden border border-slate-200 bg-slate-50"
        style={{
          background: colors.bgcolor,
        }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-sm border border-slate-200">
            <span className="text-base sm:text-xl font-bold text-slate-900">
              {getInitials(role)}
            </span>
          </div>

          {/* Content Container */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              {/* Title and Skills */}
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {role}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
                  {topicsToFocus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-600 font-semibold bg-white px-3 py-2 rounded-lg text-nowrap border border-rose-200 hover:border-rose-300 hover:bg-rose-50 cursor-pointer absolute top-0 right-0 m-3 shadow-sm transition-all"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete && typeof onDelete === "function") {
              onDelete();
            }
          }}
        >
          <LuTrash2 />
        </button>
      </div>
      <div className="px-3 sm:px-4 pb-4">
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="text-[10px] sm:text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 border border-teal-200 rounded-full whitespace-nowrap">
            {experience} {experience == 1 ? "Year" : "Years"}
          </div>

          <div className="text-[10px] sm:text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 border border-teal-200 rounded-full whitespace-nowrap">
            {questions} Q&A
          </div>

          <div className="text-[10px] sm:text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 border border-teal-200 rounded-full whitespace-nowrap">
            {lastUpdated}
          </div>
        </div>
        {/*Description*/}
        <p className="text-xs sm:text-sm text-slate-600 font-medium line-clamp-3 mt-4 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
