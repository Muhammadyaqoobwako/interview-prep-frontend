import React from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSIONS.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions data:", error);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this session? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await axiosInstance.delete(API_PATHS.SESSIONS.DELETE(sessionId));
      toast.success("Session deleted successfully");
      fetchAllSessions(); // Refresh the list
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-6 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Your Interview <span className="text-teal-700">Sessions</span>
          </h1>
          <p className="text-slate-600 text-base">
            Manage and track your interview preparation journey
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 pt-1 pb-6">
          {sessions?.map((data, index) => {
            return (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || "-"}
                questions={data?.questions?.length || "-"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("DD MMM, YYYY")
                    : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => handleDeleteSession(data?._id)}
              />
            );
          })}
        </div>

        <button
          className="h-14 md:h-16 flex items-center justify-center gap-2 md:gap-3 bg-teal-700 text-sm sm:text-base font-semibold text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-teal-800 transition-all fixed bottom-6 md:bottom-20 right-4 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add New Session
        </button>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm
            onSuccess={() => {
              setOpenCreateModal(false);
              fetchAllSessions();
            }}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
