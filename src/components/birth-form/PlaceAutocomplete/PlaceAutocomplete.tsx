'use client';

import { useEffect, useId, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import clsx from 'clsx';

import { Input } from '@/components/ui/Input';
import { useDebounce } from '@/hooks/useDebounce';
import { profileService } from '@/services/profileService';
import type { BirthPlace, PlaceSuggestion } from '@/types/profile.types';

import styles from './PlaceAutocomplete.module.css';

/** Коротші запити віддають надто багато міст — не смикаємо API */
const MIN_QUERY_LENGTH = 2;

const TOO_MANY_REQUESTS = 429;

/**
 * Чому підказок немає. Раніше будь-який збій показувався як «нічого не
 * знайдено» — і користувач не міг відрізнити порожній результат від
 * поламаного пошуку чи вичерпаного ліміту.
 */
type SearchFailure = 'error' | 'rateLimited' | null;

type PlaceAutocompleteProps = {
  label: string;
  placeholder?: string;
  searchingText: string;
  noResultsText: string;
  errorText: string;
  rateLimitedText: string;
  value: BirthPlace | null;
  onChange: (place: BirthPlace | null) => void;
  error?: string;
};

export const PlaceAutocomplete = ({
  label,
  placeholder,
  searchingText,
  noResultsText,
  errorText,
  rateLimitedText,
  value,
  onChange,
  error,
}: PlaceAutocompleteProps) => {
  const listId = useId();
  const [query, setQuery] = useState(value?.label ?? '');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [failure, setFailure] = useState<SearchFailure>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedQuery = useDebounce(query);
  const selectedLabel = value?.label;

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    // Місце вже обране — повторний запит тим самим рядком нічого не дасть
    if (trimmed.length < MIN_QUERY_LENGTH || trimmed === selectedLabel) {
      setSuggestions([]);
      setFailure(null);
      setIsSearching(false);
      return;
    }

    let ignore = false;
    setIsSearching(true);
    setFailure(null);

    profileService
      .searchPlaces(trimmed)
      .then((places) => {
        if (ignore) return;
        setSuggestions(places);
        setActiveIndex(-1);
      })
      .catch((searchError: unknown) => {
        if (ignore) return;
        setSuggestions([]);
        const isRateLimited =
          axios.isAxiosError(searchError) &&
          searchError.response?.status === TOO_MANY_REQUESTS;
        setFailure(isRateLimited ? 'rateLimited' : 'error');
      })
      .finally(() => {
        if (!ignore) setIsSearching(false);
      });

    // Гонка запитів: відповідь застарілого запиту ігноруємо
    return () => {
      ignore = true;
    };
  }, [debouncedQuery, selectedLabel]);

  const selectPlace = (place: PlaceSuggestion) => {
    onChange({
      label: place.label,
      latitude: place.latitude,
      longitude: place.longitude,
      timezone: place.timezone,
    });
    setQuery(place.label);
    setIsOpen(false);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsOpen(true);
    // Текст змінили — попередній вибір із координатами вже не відповідає полю
    if (value) onChange(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key === 'Enter' && isOpen && activeIndex >= 0) {
      const place = suggestions[activeIndex];
      if (place) {
        // Не даємо Enter засабмітити форму замість вибору підказки
        event.preventDefault();
        selectPlace(place);
      }
    }
  };

  const showList = isOpen && query.trim().length >= MIN_QUERY_LENGTH;

  return (
    <div className={styles.wrap}>
      <Input
        label={label}
        placeholder={placeholder}
        value={query}
        error={error}
        autoComplete="off"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined
        }
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      />

      {showList && (
        <ul id={listId} role="listbox" className={styles.list}>
          {isSearching && <li className={styles.hint}>{searchingText}</li>}

          {!isSearching && failure && (
            <li className={clsx(styles.hint, styles.hintError)} role="alert">
              {failure === 'rateLimited' ? rateLimitedText : errorText}
            </li>
          )}

          {!isSearching && !failure && suggestions.length === 0 && (
            <li className={styles.hint}>{noResultsText}</li>
          )}

          {!isSearching &&
            suggestions.map((place, index) => (
              <li
                key={place.id}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={clsx(
                  styles.option,
                  index === activeIndex && styles.optionActive,
                )}
                // onMouseDown, а не onClick: інакше blur закриє список раніше за вибір
                onMouseDown={(event) => {
                  event.preventDefault();
                  selectPlace(place);
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {place.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
