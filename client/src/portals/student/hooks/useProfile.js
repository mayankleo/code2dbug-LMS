import { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProfile, selectProfile, updateProfileLocal, invalidateProfile, selectNavigationTimestamp } from '@/redux/slices';
import {
  updateProfile,
  updateAvatar,
  updatePrivacy,
  changePassword,
} from '@/services/student/studentService';

/**
 * Hook for fetching and managing student profile (Redux-powered)
 * Refetches on every tab/navigation change
 */
export const useProfile = () => {
  const dispatch = useDispatch();
  const { data: profile, loading, error } = useSelector(selectProfile);
  const navigationTimestamp = useSelector(selectNavigationTimestamp);
  const lastFetchedTimestamp = useRef(null);

  const fetchProfileData = useCallback(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (lastFetchedTimestamp.current !== navigationTimestamp) {
      lastFetchedTimestamp.current = navigationTimestamp;
      fetchProfileData();
    }
  }, [navigationTimestamp, fetchProfileData]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfileData,
  };
};

/**
 * Hook for updating student profile
 */
export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async profileData => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateProfile(profileData);

      // Update local Redux state on success
      if (response.success) {
        dispatch(updateProfileLocal(profileData));
      }

      return response;
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

/**
 * Hook for updating avatar
 */
export const useUpdateAvatar = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async avatarUrl => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateAvatar(avatarUrl);

      // Update local Redux state on success
      if (response.success) {
        dispatch(updateProfileLocal({ avatar: avatarUrl }));
      }

      return response;
    } catch (err) {
      console.error('Failed to update avatar:', err);
      setError(err.response?.data?.message || 'Failed to update avatar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

/**
 * Hook for updating privacy settings
 */
export const useUpdatePrivacy = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async isProfileLocked => {
    try {
      setLoading(true);
      setError(null);
      const response = await updatePrivacy(isProfileLocked);

      // Update local Redux state on success
      if (response.success) {
        dispatch(updateProfileLocal({ isProfileLocked }));
      }

      return response;
    } catch (err) {
      console.error('Failed to update privacy:', err);
      setError(err.response?.data?.message || 'Failed to update privacy settings');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

/**
 * Hook for changing password
 */
export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const change = async passwordData => {
    try {
      setLoading(true);
      setError(null);
      const response = await changePassword(passwordData);
      return response;
    } catch (err) {
      console.error('Failed to change password:', err);
      setError(err.response?.data?.message || 'Failed to change password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { change, loading, error };
};
