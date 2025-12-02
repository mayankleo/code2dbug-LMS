import React, { useState } from 'react';
import { Award, Loader2, AlertCircle, BookOpen, Download, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useCertificates, useMyCourses, useCourseDetails, useProfile } from '../hooks';
import { downloadModuleCertificate } from '../utils/downloadModuleCertificate';

// Component to show completed modules for a single course
const CourseModulesCertificates = ({ course, studentName }) => {
  const { course: courseDetails, loading } = useCourseDetails(course.slug);
  const [downloading, setDownloading] = useState(null);

  const handleDownload = async module => {
    setDownloading(module.id || module._id);
    try {
      await downloadModuleCertificate({
        studentName,
        courseName: course.title,
        moduleTitle: module.title,
      });
      toast.success('Certificate downloaded!');
    } catch {
      toast.error('Failed to download certificate');
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return null;
  }

  const completedModules = courseDetails?.modules?.filter(m => m.isCompleted) || [];

  if (completedModules.length === 0) {
    return null;
  }

  return (
    <>
      {completedModules.map(module => (
        <div
          key={module.id || module._id}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-amber-500/30 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <Award size={24} className="text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">
                  Module
                </span>
                <CheckCircle size={14} className="text-green-500" />
              </div>
              <h3 className="font-semibold text-white truncate">{module.title}</h3>
              <p className="text-sm text-zinc-500 truncate">{course.title}</p>
            </div>
            <button
              onClick={() => handleDownload(module)}
              disabled={downloading === (module.id || module._id)}
              className="shrink-0 flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 disabled:opacity-50 rounded-lg transition-colors"
            >
              {downloading === (module.id || module._id) ? (
                <Loader2 size={16} className="text-amber-400 animate-spin" />
              ) : (
                <Download size={16} className="text-amber-400" />
              )}
              <span className="text-sm text-amber-400 font-medium hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

const StudentCertificatesPage = () => {
  const { certificates, loading: certificatesLoading, error, refetch } = useCertificates();
  const { courses, loading: coursesLoading } = useMyCourses();
  const { profile } = useProfile();

  const loading = certificatesLoading || coursesLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 bg-black text-white">
        <AlertCircle size={48} className="text-red-400" />
        <p className="text-red-400">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Filter enrolled courses (those with progress)
  const enrolledCourses = courses?.filter(c => c.progress > 0) || [];
  const hasCourseCertificates = certificates && certificates.length > 0;
  const hasEnrolledCourses = enrolledCourses.length > 0;

  if (!hasCourseCertificates && !hasEnrolledCourses) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black text-white">
        <BookOpen size={64} className="text-zinc-600 mb-4" />
        <p className="text-zinc-400">No certificates available yet</p>
        <p className="text-zinc-500 text-sm mt-2">Complete modules and courses to earn certificates</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 h-full overflow-y-auto custom-scrollbar bg-black text-white w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Certificates</h1>
        <p className="text-zinc-400">Your earned achievements and certifications</p>
      </div>

      {/* Course Completion Certificates */}
      {hasCourseCertificates && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award size={20} className="text-yellow-400" />
            Course Completion Certificates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map(cert => (
              <Link
                key={cert._id || cert.id}
                to={`/student/certificates/${cert.course?.slug}`}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-yellow-500/30 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <Award size={24} className="text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">
                        Course
                      </span>
                      <CheckCircle size={14} className="text-green-500" />
                    </div>
                    <h3 className="font-semibold text-white truncate group-hover:text-yellow-400 transition-colors">
                      {cert.course?.title || cert.courseNameSnapshot}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {cert.issueDate
                        ? new Date(cert.issueDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'Completed'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Module Certificates */}
      {hasEnrolledCourses && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award size={20} className="text-amber-400" />
            Module Certificates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map(course => (
              <CourseModulesCertificates
                key={course.id}
                course={course}
                studentName={profile?.name || 'Student'}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCertificatesPage;
