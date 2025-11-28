/* eslint-disable react-hooks/set-state-in-effect */
import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const colors = ["#16a34a", "#0284c7", "#9333ea", "#d97706", "#dc2626"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (e) => {
    e.preventDefault()
    setShowCreateResume(false)
    navigate(`/app/builder/res123`)
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    setShowUploadResume(false)
    navigate(`/app/builder/res123`)
  }

  const editTitle = async (e) => {
    e.preventDefault()
  }

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm('Are you sure you want to delete this resume?')
    if (confirm) {
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
    }
  }

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Resumes
          </h1>
          <p className="text-gray-600">
            Create, manage, and perfect your professional resumes
          </p>
        </div>

        {/* Action Cards */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button 
            onClick={() => setShowCreateResume(true)} 
            className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 group hover:shadow-lg hover:border-green-300 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <PlusIcon size={6} className=" text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                  Craft a Resume
                </h3>
                <p className="text-sm text-gray-600">
                  Build from scratch with our AI-powered builder
                </p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setShowUploadResume(true)} 
            className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 group hover:shadow-lg hover:border-green-300 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <UploadCloudIcon size={6} className=" text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                  Upload Existing
                </h3>
                <p className="text-sm text-gray-600">
                  Enhance your current resume with AI
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                key={index}
                className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-4 group hover:shadow-lg transition-all duration-300 cursor-pointer text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: baseColor + '20' }}>
                    <FilePenLineIcon size={5} style={{ color: baseColor }} />
                  </div>
                  <div 
                    onClick={e => e.stopPropagation()} 
                    className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity"
                  >
                    <PencilIcon 
                      onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} 
                      className="size-5 p-1 hover:bg-gray-100 rounded text-gray-600 transition-colors" 
                    />
                    <TrashIcon 
                      onClick={() => deleteResume(resume._id)} 
                      className="size-5 p-1 hover:bg-red-50 rounded text-red-500 transition-colors" 
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2" style={{ color: baseColor }}>
                  {resume.title}
                </h3>
                
                <p className="text-xs text-gray-500">
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {allResumes.length === 0 && (
          <div className="text-center py-12">
            <FilePenLineIcon size={16} className=" text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">Create your first resume to get started</p>
            <button 
              onClick={() => setShowCreateResume(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
            >
              Create Resume
            </button>
          </div>
        )}

        {/* Create Resume Modal */}
        {showCreateResume && (
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div onClick={e => e.stopPropagation()} className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create New Resume</h2>
                <XIcon  size={5}
                  className=" text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" 
                  onClick={() => { setShowCreateResume(false); setTitle('') }} 
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume Title
                </label>
                <input 
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title} 
                  type="text" 
                  placeholder="e.g., Software Engineer Resume" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  required 
                />
              </div>

              <button className="w-full py-3.5 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors shadow-lg shadow-green-200">
                Create Resume
              </button>
            </div>
          </form>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div onClick={e => e.stopPropagation()} className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Upload Resume</h2>
                <XIcon  size={5}
                  className=" text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" 
                  onClick={() => { setShowUploadResume(false); setTitle('') }} 
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume Title
                </label>
                <input 
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title} 
                  type="text" 
                  placeholder="e.g., My Current Resume" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all mb-4"
                  required 
                />

                <label htmlFor="resume-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
                  <input 
                    type="file" 
                    id='resume-input' 
                    accept=".pdf,.doc,.docx" 
                    hidden 
                    onChange={(e) => setResume(e.target.files[0])} 
                  />
                  {resume ? (
                    <div className="text-green-600">
                      <p className="font-medium">{resume.name}</p>
                      <p className="text-sm text-gray-500">Click to change file</p>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <UploadCloud size={8} className=" mx-auto mb-2" />
                      <p className="font-medium">Click to upload resume</p>
                      <p className="text-sm">PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <button className="w-full py-3.5 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors shadow-lg shadow-green-200">
                Upload & Enhance
              </button>
            </div>
          </form>
        )}

        {/* Edit Title Modal */}
        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div onClick={e => e.stopPropagation()} className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Resume Title</h2>
                <XIcon size={8}
                  className=" text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" 
                  onClick={() => { setEditResumeId(''); setTitle('') }} 
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume Title
                </label>
                <input 
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title} 
                  type="text" 
                  placeholder="Enter resume title" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  required 
                />
              </div>

              <button className="w-full py-3.5 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors shadow-lg shadow-green-200">
                Update Title
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;