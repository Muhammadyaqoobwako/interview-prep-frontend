import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert } from "react-icons/lu";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import QuestionCard from "../../components/Cards/QuestionCard";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import AIResponsePreview from "./components/AIResponsePreview";
import RoleinfoHeader from "./components/RoleinfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const MotionDiv = motion.div;

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = useCallback(async () => {
    if (!sessionId) return;
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSIONS.GET_ONE(sessionId),
      );
      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.log("Error fetching session:", error);
      toast.error("Failed to load session.");
    }
  }, [sessionId]);

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question },
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation. Please try again.");
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionsPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTIONS.PIN(questionId),
      );

      if (response.data?.question) {
        fetchSessionDetailsById();
        toast.success("Question status updated.");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Unable to update pin status.");
    }
  };

  const uploadMoreQuestions = async () => {
    if (!sessionId || !sessionData) return;
    try {
      setIsUpdateLoader(true);

      // 1. Generate new questions from AI
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData.role,
          experience: sessionData.experience,
          topicsToFocus: sessionData.topicsToFocus,
          numberofQuestions: 10, // Or any number you want
        },
      );
      const generatedQuestions = aiResponse.data;

      // 2. Add the new questions to the session
      const response = await axiosInstance.post(
        API_PATHS.QUESTIONS.ADD_TO_SESSION,
        { sessionId, questions: generatedQuestions },
      );

      if (response.data) {
        fetchSessionDetailsById(); // Refetch session data to show new questions
        toast.success("Added more questions.");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to add more questions.");
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [fetchSessionDetailsById, sessionId]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 pb-12">
        <RoleinfoHeader
          role={sessionData?.role || ""}
          topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || "-"}
          questions={sessionData?.questions?.length || "-"}
          description={sessionData?.description || ""}
          lastUpdated={
            sessionData?.updatedAt
              ? moment(sessionData?.updatedAt).format("MMM DD, YYYY")
              : ""
          }
        />

        <div className="mt-8 space-y-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Interview <span className="text-teal-700">Q & A</span>
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {sessionData?.questions?.length || 0} questions to master
              </p>
            </div>
            <button
              type="button"
              onClick={uploadMoreQuestions}
              disabled={isUpdateLoader}
              className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 sm:px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {isUpdateLoader ? "Generating..." : "Generate More"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="space-y-4 xl:col-span-2">
              <AnimatePresence mode="popLayout">
                {sessionData?.questions &&
                sessionData?.questions?.length > 0 ? (
                  sessionData.questions.map((data, index) => (
                    <MotionDiv
                      key={data._id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                      }}
                      layout
                    >
                      <QuestionCard
                        index={index + 1}
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data?.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionsPinStatus(data._id)}
                      />
                    </MotionDiv>
                  ))
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                    <svg
                      className="mx-auto h-12 w-12 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="mt-4 text-slate-500">
                      No questions yet. Generate some to get started!
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <MotionDiv
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-fit sticky top-32 max-h-[calc(100vh-200px)] overflow-y-auto"
            >
              {isLoading || explanation ? (
                <>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                    <h3 className="text-sm font-semibold text-teal-700">
                      {isLoading
                        ? "Generating..."
                        : explanation?.title || "Explanation"}
                    </h3>
                    <button
                      onClick={() => {
                        setExplanation(null);
                        setErrorMsg("");
                      }}
                      className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                      aria-label="Close explanation"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  {errorMsg && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 mb-4">
                      <div className="flex gap-2">
                        <LuCircleAlert className="mt-0.5 flex-shrink-0 text-amber-600 text-sm" />
                        <p className="text-xs font-medium text-amber-800">
                          {errorMsg}
                        </p>
                      </div>
                    </div>
                  )}
                  {isLoading && <SkeletonLoader rows={3} />}
                  {!isLoading && explanation && (
                    <div className="text-sm space-y-3">
                      <AIResponsePreview content={explanation?.explanation} />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-sm font-semibold text-teal-700 mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Total Questions</span>
                      <span className="font-semibold text-slate-900">
                        {sessionData?.questions?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Pinned</span>
                      <span className="font-semibold text-slate-900">
                        {sessionData?.questions?.filter((q) => q.isPinned)
                          .length || 0}
                      </span>
                    </div>
                    <div className="border-t border-slate-200 pt-3">
                      <span className="text-xs text-slate-500">
                        Last updated:{" "}
                        {sessionData?.updatedAt
                          ? moment(sessionData.updatedAt).fromNow()
                          : "Never"}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </MotionDiv>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
