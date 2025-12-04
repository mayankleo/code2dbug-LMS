import { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSupportQueries, selectSupport, selectNavigationTimestamp } from '@/redux/slices';
import { createSupportQuery } from '@/services/student/studentService';

/**
 * Hook for fetching support queries (Redux-powered)
 * Refetches on every tab/navigation change
 */
export const useSupportQueries = () => {
  const dispatch = useDispatch();
  const { queries, loading, error } = useSelector(selectSupport);
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const fetchQueries = useCallback(() => {
    dispatch(fetchSupportQueries());
  }, [dispatch]);

  useEffect(() => {
    if (lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchQueries();
    }
  }, [navigationTimestamp, fetchQueries]);

  return {
    queries,
    loading,
    error,
    refetch: fetchQueries,
  };
};

/**
 * Hook for creating a support query
 */
export const useCreateSupportQuery = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async queryData => {
    try {
      setLoading(true);
      setError(null);
      const response = await createSupportQuery(queryData);

      // Refetch support queries after creating new one
      if (response.success) {
        dispatch(fetchSupportQueries());
      }

      return response;
    } catch (err) {
      console.error('Failed to create support query:', err);
      setError(err.response?.data?.message || 'Failed to submit support query');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};
