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
  /** Локальний час народження, HH:mm */
  birthTime: string;
  place: BirthPlace;
}

export interface Profile extends BirthData {
  id: string;
  ownerId: string;
  createdAt: string;
  chart: NatalChart;
  destinyMatrix: DestinyMatrix;
  pythagoreanSquare: PythagoreanSquare;
}

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
