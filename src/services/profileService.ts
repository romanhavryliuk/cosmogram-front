import { api } from './api';

import type {
  CreateProfilePayload,
  PlaceSuggestion,
  Profile,
  ProfileSummary,
} from '@/types/profile.types';

export const profileService = {
  getAll: async (): Promise<ProfileSummary[]> => {
    const { data } = await api.get<ProfileSummary[]>('/profiles');
    return data;
  },

  getById: async (id: string): Promise<Profile> => {
    const { data } = await api.get<Profile>(`/profiles/${id}`);
    return data;
  },

  create: async (payload: CreateProfilePayload): Promise<Profile> => {
    const { data } = await api.post<Profile>('/profiles', payload);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/profiles/${id}`);
  },

  /** Автокомпліт місця народження — дьоргається з BirthDataForm через useDebounce */
  searchPlaces: async (query: string): Promise<PlaceSuggestion[]> => {
    const { data } = await api.get<PlaceSuggestion[]>('/places', {
      params: { query },
    });
    return data;
  },
};
