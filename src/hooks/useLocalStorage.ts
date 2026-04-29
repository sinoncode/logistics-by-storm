import { useState, useCallback } from 'react';

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'Active' | 'Inactive';
  avatar: string;
  joinDate: string;
}

const STORAGE_KEY = 'team_members';

export const useLocalStorage = () => {
  const [members, setMembers] = useState<TeamMember[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  });

  const saveMembers = useCallback((newMembers: TeamMember[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMembers));
      setMembers(newMembers);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }, []);

  const addMember = useCallback((member: TeamMember) => {
    setMembers((prev) => {
      const updated = [...prev, member];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateMember = useCallback((id: string, updates: Partial<TeamMember>) => {
    setMembers((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, ...updates } : m));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteMember = useCallback((id: string) => {
    setMembers((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    members,
    saveMembers,
    addMember,
    updateMember,
    deleteMember,
    setMembers,
  };
};
