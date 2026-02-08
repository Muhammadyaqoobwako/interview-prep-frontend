import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";

const CreateSessionForm = ({ onSuccess }) => {
  const [fromData, setFormData] = React.useState({
    role: "",
    topicsToFocus: "",
    experience: "",
    description: "",
  });

  const [isloading, setIsloading] = React.useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = fromData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields");
      return;
    }

    setError("");
    setIsloading(true);

    try {
      // Call AI API to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberofQuestions: 10,
        },
      );
      // Should be array Like [{question, answer},...]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSIONS.CREATE, {
        ...fromData,
        generatedQuestions,
      });

      if (response.data.session?._id) {
        toast.success("Session created successfully!");
        onSuccess?.(); // Call the success callback to close modal and refresh
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      console.error("Error creating session:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
      toast.error("Failed to create session");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="w-full max-w-[90vw] md:max-w-[35vw] p-2 sm:p-3 flex flex-col justify-center">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Start a New Interview Journey
        </h3>
        <p className="text-sm text-slate-600 mt-2">
          Fill out a few quick details and unlock your personalized interview
          session.
        </p>
      </div>
      <form onSubmit={handleCreateSession} className="flex flex-col gap-5">
        <Input
          id="target-role"
          name="role"
          value={fromData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          label="Target Role"
          placeholder="e.g., Frontend Developer, Data Scientist, UI/UX Designer"
          type="text"
        />

        <Input
          id="years-experience"
          name="experience"
          value={fromData.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          label="Years of Experience"
          placeholder="e.g., 0-1 years, 3 years, 5+ years"
          type="number"
        />

        <Input
          id="topics-focus"
          name="topicsToFocus"
          value={fromData.topicsToFocus}
          onChange={(e) => handleChange("topicsToFocus", e.target.value)}
          label="Topics to Focus"
          placeholder="e.g., React, Node.js, System Design"
          type="text"
        />

        <Input
          id="description"
          name="description"
          value={fromData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          label="Additional Details"
          placeholder="Any specific areas or context you want to focus on"
          type="text"
        />

        {error && (
          <div className="bg-rose-50 text-rose-700 text-sm p-4 rounded-xl border border-rose-200 flex items-start gap-2 shadow-sm">
            <span className="text-rose-500 text-lg flex-shrink-0">⚠</span>
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 text-base font-semibold text-white bg-teal-700 py-3.5 rounded-lg transition-all hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          disabled={isloading}
        >
          {isloading && <SpinnerLoader />}
          {isloading ? "Creating Session..." : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
