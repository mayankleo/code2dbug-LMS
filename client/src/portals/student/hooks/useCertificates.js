import { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCertificates, selectCertificates, selectNavigationTimestamp } from '@/redux/slices';
import { getCourseCertificate } from '@/services/student/studentService';

/**
 * Hook for fetching certificates (Redux-powered)
 * Refetches on every tab/navigation change
 */
export const useCertificates = () => {
  const dispatch = useDispatch();
  const { list: certificates, loading, error } = useSelector(selectCertificates);
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const fetchCertificatesData = useCallback(() => {
    dispatch(fetchCertificates());
  }, [dispatch]);

  useEffect(() => {
    if (lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchCertificatesData();
    }
  }, [navigationTimestamp, fetchCertificatesData]);

  return {
    certificates,
    loading,
    error,
    refetch: fetchCertificatesData,
  };
};

/**
 * Hook for fetching a single course certificate
 */
export const useCourseCertificate = courseSlug => {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const fetchCertificate = useCallback(async () => {
    if (!courseSlug) return;

    setLoading(true);
    setError(null);
    setPaymentStatus(null);

    try {
      const response = await getCourseCertificate(courseSlug);
      setCertificate(response.data);
    } catch (err) {
      const errorData = err.response?.data;
      // Check if error is payment related
      if (errorData?.paymentStatus) {
        setPaymentStatus(errorData.paymentStatus);
      }
      setError(errorData?.message || 'Failed to fetch certificate');
    } finally {
      setLoading(false);
    }
  }, [courseSlug]);

  useEffect(() => {
    fetchCertificate();
  }, [fetchCertificate]);

  return {
    certificate,
    loading,
    error,
    paymentStatus,
    refetch: fetchCertificate,
  };
};
