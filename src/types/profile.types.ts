import type {
  DestinyMatrix,
  NatalChart,
  PythagoreanSquare,
} from './astrology.types';

export interface BirthPlace {
  /** Людиночитний рядок, який бачить юзер: "Київ, Україна" */
  label: string;
  latitude: number;
  longitude: number;
  /** IANA timezone, напр. "Europe/Kyiv" */
  timezone: string;
}

export interface BirthData {
  name: string;
  /** ISO-дата, yyyy-MM-dd */
  birthDate: string;
  /** Локальний час народження, HH:mm; null — час невідомий */
  birthTime: string | null;
  place: BirthPlace;
}

/** Усе, що бекенд рахує з даних народження */
export interface CosmogramBlocks {
  chart: NatalChart;
  destinyMatrix: DestinyMatrix;
  pythagoreanSquare: PythagoreanSquare;
}

export interface Profile extends BirthData, CosmogramBlocks {
  id: string;
  ownerId: string;
  createdAt: string;
  updatedAt?: string;
  /** Токен публічного посилання; null — доступ за посиланням вимкнено */
  shareId?: string | null;
}

/**
 * Мінімум, потрібний для показу результату. Під нього підходять і власний
 * профіль, і гостьовий розрахунок, і чужа карта за посиланням — у двох
 * останніх немає id, власника та координат місця.
 */
export type CosmogramView = Pick<BirthData, 'name' | 'birthDate' | 'birthTime'> &
  CosmogramBlocks & {
    place: Pick<BirthPlace, 'label'>;
  };

/** Відповідь POST /preview: розрахунок для гостя, нічого не зберігається */
export type PreviewResult = BirthData & CosmogramBlocks;

/** Відповідь GET /share/:shareId — без id, власника й точних координат */
export type SharedProfile = CosmogramView;

/** PATCH /profiles/:id — будь-яка підмножина даних народження */
export type UpdateProfilePayload = Partial<BirthData>;

/** Елемент списку в кабінеті — backend віддає без важких розрахунків */
export type ProfileSummary = Pick<
  Profile,
  'id' | 'name' | 'birthDate' | 'createdAt'
> & {
  place: Pick<BirthPlace, 'label'>;
};

export type CreateProfilePayload = BirthData;

/** Підказка з геокодера для автокомпліту місця народження */
export interface PlaceSuggestion extends BirthPlace {
  id: string;
}
