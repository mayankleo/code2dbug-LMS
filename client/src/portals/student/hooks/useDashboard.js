import { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchDashboard,
  selectDashboard,
  invalidateDashboard,
  selectNavigationTimestamp,
} from '@/redux/slices';

/**
 * Hook for fetching dashboard data (Redux-powered)
 * Refetches on every tab/navigation change
 */
export const useDashboard = () => {
  const dispatch = useDispatch();
  const { data: dashboardData, loading, error } = useSelector(selectDashboard);
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const fetchDashboardData = useCallback(
    (force = false) => {
      dispatch(fetchDashboard());
    },
    [dispatch],
  );

  // Refetch when navigation timestamp changes (tab change)
  useEffect(() => {
    if (lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchDashboardData(true);
    }
  }, [navigationTimestamp, fetchDashboardData]);

  const invalidate = useCallback(() => {
    dispatch(invalidateDashboard());
  }, [dispatch]);

  return {
    dashboardData,
    loading,
    error,
    refetch: () => fetchDashboardData(true),
    invalidate,
  };
};
