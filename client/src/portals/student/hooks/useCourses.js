import { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchMyCourses,
  fetchCourseDetails,
  fetchCourseModules,
  fetchQuizzesByCourse,
  fetchCourseQuizzes,
  fetchAssignmentsByCourse,
  fetchCourseAssignments,
  fetchLeaderboard,
  selectCourses,
  selectCourseDetails,
  selectCourseModules,
  selectQuizzes,
  selectCourseQuizzes,
  selectAssignments,
  selectCourseAssignments,
  selectLeaderboard,
  selectNavigationTimestamp,
} from '@/redux/slices';
import {
  markModuleAccessed,
  getCourseProgress,
  getQuizQuestions,
  submitQuiz,
  submitAssignment,
} from '@/services/student/studentService';

/**
 * Hook for fetching enrolled courses (Redux-powered)
 * Refetches on every tab/navigation change
 */
export const useMyCourses = () => {
  const dispatch = useDispatch();
  const { list: courses, loading, error } = useSelector(selectCourses);
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const fetchCourses = useCallback(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  useEffect(() => {
    if (lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchCourses();
    }
  }, [navigationTimestamp, fetchCourses]);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  };
};

/**
 * Hook for fetching course details (Redux-powered with caching)
 * Refetches on every tab/navigation change
 */
export const useCourseDetails = slug => {
  const dispatch = useDispatch();
  const courseData = useSelector(selectCourseDetails(slug));
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const { data: course, loading, error } = courseData || {};

  const fetchDetails = useCallback(() => {
    if (slug) {
      dispatch(fetchCourseDetails(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (slug && lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchDetails();
    }
  }, [slug, navigationTimestamp, fetchDetails]);

  return {
    course,
    loading: loading ?? true,
    error,
    refetch: fetchDetails,
  };
};

/**
 * Hook for fetching course modules (Redux-powered with caching)
 * Refetches on every tab/navigation change
 */
export const useCourseModules = slug => {
  const dispatch = useDispatch();
  const moduleData = useSelector(selectCourseModules(slug));
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const { modules, courseTitle, loading, error } = moduleData || {};

  const fetchModules = useCallback(() => {
    if (slug) {
      dispatch(fetchCourseModules(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (slug && lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchModules();
    }
  }, [slug, navigationTimestamp, fetchModules]);

  return {
    modules: modules || [],
    courseTitle: courseTitle || '',
    loading: loading ?? true,
    error,
    refetch: fetchModules,
  };
};

/**
 * Hook for marking module as accessed (action-based, no Redux state needed)
 */
export const useMarkModuleAccessed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const markAccessed = async (courseId, moduleId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await markModuleAccessed({ courseId, moduleId });
      return response;
    } catch (err) {
      console.error('Failed to mark module accessed:', err);
      setError(err.response?.data?.message || 'Failed to mark module accessed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { markAccessed, loading, error };
};

/**
 * Hook for fetching course progress
 */
export const useCourseProgress = slug => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getCourseProgress(slug);
      if (response.success) {
        setProgress(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch course progress:', err);
      setError(err.response?.data?.message || 'Failed to load progress');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progress, loading, error, refetch: fetchProgress };
};

/**
 * Hook for fetching quiz questions
 */
export const useQuizQuestions = (slug, quizId) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuiz = useCallback(async () => {
    if (!slug || !quizId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getQuizQuestions(slug, quizId);
      if (response.success) {
        setQuiz(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch quiz:', err);
      setError(err.response?.data?.message || 'Failed to load quiz');
    } finally {
      setLoading(false);
    }
  }, [slug, quizId]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  return { quiz, loading, error, refetch: fetchQuiz };
};

/**
 * Hook for submitting quiz
 */
export const useSubmitQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const submit = async quizData => {
    try {
      setLoading(true);
      setError(null);
      const response = await submitQuiz(quizData);
      if (response.success) {
        setResult(response.data);
      }
      return response;
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      setError(err.response?.data?.message || 'Failed to submit quiz');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, result };
};

/**
 * Hook for fetching course quizzes (Redux-powered)
 * Refetches on every tab/navigation change
 */
export const useCourseQuizzes = slug => {
  const dispatch = useDispatch();
  const quizData = useSelector(selectCourseQuizzes(slug));
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const { quizzes, courseId, courseTitle, loading, error } = quizData || {};

  const fetchQuizzes = useCallback(() => {
    if (slug) {
      dispatch(fetchCourseQuizzes(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (slug && lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchQuizzes();
    }
  }, [slug, navigationTimestamp, fetchQuizzes]);

  return {
    quizzes: quizzes || [],
    courseId,
    courseTitle: courseTitle || '',
    loading: loading ?? true,
    error,
    refetch: fetchQuizzes,
  };
};

/**
 * Hook for fetching course assignments (Redux-powered)
 * Refetches on every tab/navigation change
 */
export const useCourseAssignments = slug => {
  const dispatch = useDispatch();
  const assignmentData = useSelector(selectCourseAssignments(slug));
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const { assignments, courseId, courseTitle, loading, error } = assignmentData || {};

  const fetchAssignments = useCallback(() => {
    if (slug) {
      dispatch(fetchCourseAssignments(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (slug && lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchAssignments();
    }
  }, [slug, navigationTimestamp, fetchAssignments]);

  return {
    assignments: assignments || [],
    courseId,
    courseTitle: courseTitle || '',
    loading: loading ?? true,
    error,
    refetch: fetchAssignments,
  };
};

/**
 * Hook for submitting assignment
 */
export const useSubmitAssignment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async assignmentData => {
    try {
      setLoading(true);
      setError(null);
      const response = await submitAssignment(assignmentData);
      return response;
    } catch (err) {
      console.error('Failed to submit assignment:', err);
      setError(err.response?.data?.message || 'Failed to submit assignment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};

/**
 * Hook for fetching all courses with quiz progress (Redux-powered)
 * Refetches on every tab/navigation change
 */
export const useQuizzesByCourse = () => {
  const dispatch = useDispatch();
  const { byCourse: courses, loading, error } = useSelector(selectQuizzes);
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const fetchCourses = useCallback(() => {
    dispatch(fetchQuizzesByCourse());
  }, [dispatch]);

  useEffect(() => {
    if (lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchCourses();
    }
  }, [navigationTimestamp, fetchCourses]);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  };
};

/**
 * Hook for fetching all courses with assignment progress (Redux-powered)
 * Refetches on every tab/navigation change
 */
export const useAssignmentsByCourse = () => {
  const dispatch = useDispatch();
  const { byCourse: courses, loading, error } = useSelector(selectAssignments);
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const fetchCourses = useCallback(() => {
    dispatch(fetchAssignmentsByCourse());
  }, [dispatch]);

  useEffect(() => {
    if (lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchCourses();
    }
  }, [navigationTimestamp, fetchCourses]);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  };
};

/**
 * Hook for fetching leaderboard data (Redux-powered)
 * Refetches on every tab/navigation change
 */
export const useLeaderboard = (type = 'global', courseId = null) => {
  const dispatch = useDispatch();
  const {
    data: leaderboard,
    userRank,
    userEntry,
    pagination,
    loading,
    error,
  } = useSelector(selectLeaderboard);
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const fetchLeaderboardData = useCallback(
    (page = 1) => {
      const params = { type, limit: 50, page };
      if (type === 'course' && courseId) {
        params.courseId = courseId;
      }
      dispatch(fetchLeaderboard(params));
    },
    [dispatch, type, courseId],
  );

  useEffect(() => {
    if (lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchLeaderboardData();
    }
  }, [navigationTimestamp, fetchLeaderboardData]);

  return {
    leaderboard,
    userRank,
    userEntry,
    pagination,
    loading,
    error,
    refetch: fetchLeaderboardData,
  };
};
