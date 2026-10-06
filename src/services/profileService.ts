import { api } from './api';

import type {
  CreateProfilePayload,
  PlaceSuggestion,
  PreviewResult,
  Profile,
  ProfileSummary,
  SharedProfile,
  UpdateProfilePayload,
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

  /** Нові дані народження бекенд перераховує сам — у відповіді вже свіжа карта */
  update: async (id: string, payload: UpdateProfilePayload): Promise<Profile> => {
    const { data } = await api.patch<Profile>(`/profiles/${id}`, payload);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/profiles/${id}`);
  },

  /** Розрахунок без збереження — для гостя, якому не потрібен акаунт */
  preview: async (payload: CreateProfilePayload): Promise<PreviewResult> => {
    const { data } = await api.post<PreviewResult>('/preview', payload);
    return data;
  },

  /** Повторний виклик повертає той самий shareId — посилання не ламається */
  enableShare: async (id: string): Promise<string> => {
    const { data } = await api.post<{ shareId: string }>(`/profiles/${id}/share`);
    return data.shareId;
  },

  disableShare: async (id: string): Promise<void> => {
    await api.delete(`/profiles/${id}/share`);
  },

  /** Публічна карта за посиланням — без авторизації */
  getShared: async (shareId: string): Promise<SharedProfile> => {
    const { data } = await api.get<SharedProfile>(`/share/${shareId}`);
    return data;
  },

  /** Автокомпліт місця народження — дьоргається з BirthDataForm через useDebounce */
  searchPlaces: async (query: string): Promise<PlaceSuggestion[]> => {
    const { data } = await api.get<PlaceSuggestion[]>('/places', {
      params: { query },
    });
    return data;
  },
};
