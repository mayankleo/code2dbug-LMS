import { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchReferralInfo, selectReferral, selectNavigationTimestamp } from '@/redux/slices';
import { applyReferralCode } from '@/services/student/studentService';

/**
 * Hook for fetching referral information (Redux-powered)
 * Refetches on every tab/navigation change
 */
export const useReferralInfo = () => {
  const dispatch = useDispatch();
  const { data: referralInfo, loading, error } = useSelector(selectReferral);
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const fetchReferral = useCallback(() => {
    dispatch(fetchReferralInfo());
  }, [dispatch]);

  useEffect(() => {
    if (lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchReferral();
    }
  }, [navigationTimestamp, fetchReferral]);

  return {
    referralInfo,
    loading,
    error,
    refetch: fetchReferral,
  };
};

/**
 * Hook for applying a referral code
 */
export const useApplyReferralCode = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apply = async code => {
    try {
      setLoading(true);
      setError(null);
      const response = await applyReferralCode(code);

      // Refetch referral info after applying code
      if (response.success) {
        dispatch(fetchReferralInfo());
      }

      return response;
    } catch (err) {
      console.error('Failed to apply referral code:', err);
      setError(err.response?.data?.message || 'Failed to apply referral code');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { apply, loading, error };
};
