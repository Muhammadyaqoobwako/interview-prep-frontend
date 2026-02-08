import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../Pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
  index = 1,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 12);
    } else {
      setHeight(0);
    }
  }, [isExpanded, answer]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-1 items-start gap-3">
          <span className="flex-shrink-0 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
            Q{String(index).padStart(2, "0")}
          </span>
          <h3
            className="cursor-pointer text-sm sm:text-base font-semibold leading-relaxed text-slate-900"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 group-hover:inline-flex md:inline-flex">
            <button
              onClick={onTogglePin}
              type="button"
              className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-amber-700 transition-all hover:border-amber-300"
              title={isPinned ? "Unpin question" : "Pin question"}
            >
              {isPinned ? <LuPinOff size={16} /> : <LuPin size={16} />}
            </button>

            <button
              onClick={() => {
                setIsExpanded(true);
                onLearnMore?.();
              }}
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-700 transition-all hover:border-teal-300"
              title="Learn more with AI"
            >
              <LuSparkles size={16} />
              <span className="hidden sm:inline">Learn More</span>
            </button>
          </div>

          <button
            className="rounded-lg p-2 text-slate-400 transition-all hover:bg-slate-100"
            onClick={toggleExpand}
            type="button"
            aria-label="Toggle answer"
          >
            <LuChevronDown
              size={20}
              className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
