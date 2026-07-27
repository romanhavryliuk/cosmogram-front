import { api } from './api';

export type ExportFormat = 'pdf' | 'png';

export interface ExportResult {
  /** Посилання на згенерований файл у Cloudinary */
  url: string;
  format: ExportFormat;
}

export const exportService = {
  /** Backend рендерить картку і кладе її в Cloudinary, повертає посилання */
  createExport: async (
    profileId: string,
    format: ExportFormat,
  ): Promise<ExportResult> => {
    const { data } = await api.post<ExportResult>(
      `/profiles/${profileId}/export`,
      { format },
    );
    return data;
  },
};
