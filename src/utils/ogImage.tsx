import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const SITE_NAME = 'Cosmogram';
const TAGLINE = 'Natal chart · Destiny Matrix · Pythagorean Square';
const FONT_WEIGHT = 500 as const;
// Fraunces — шрифт заголовків сайту, але кирилиці в ньому немає. Lora —
// схожа засічкова гарнітура з кирилицею: Satori бере з неї лише ті гліфи,
// яких бракує у Fraunces, тож «Олена» не випадає з загального стилю
const FONT_FAMILIES = ['Fraunces', 'Lora'] as const;

// Ті самі значення, що й токени в globals.css: Satori не читає CSS-змінні
const COLORS = {
  void: '#06060f',
  void2: '#0a0a1c',
  parchment: '#ede6d6',
  gold: '#d9b34d',
  goldSoft: '#f0d98a',
  muted: '#8a86a8',
};

const RING_SIZE = 380;

/**
 * Тягнемо з Google Fonts лише гліфи потрібного тексту (параметр text),
 * тож відповідь крихітна. Без мережі повертаємо null — картинка
 * збереться стандартним шрифтом next/og.
 */
const loadFont = async (
  family: string,
  text: string,
): Promise<ArrayBuffer | null> => {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${FONT_WEIGHT}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(cssUrl)).text();
    const fontUrl = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!fontUrl) return null;

    const response = await fetch(fontUrl);
    return response.ok ? await response.arrayBuffer() : null;
  } catch {
    return null;
  }
};

type OgCardProps = {
  /** Великий рядок по центру; без нього — назва сайту */
  title?: string;
  /** Рядки під заголовком */
  details?: string[];
};

export const renderOgImage = async ({ title, details = [] }: OgCardProps) => {
  const heading = title ?? SITE_NAME;
  const footer = title ? SITE_NAME : TAGLINE;
  const text = [heading, footer, ...details].join('');
  const loaded = await Promise.all(
    FONT_FAMILIES.map(async (name) => ({ name, data: await loadFont(name, text) })),
  );
  const fonts = loaded.flatMap(({ name, data }) =>
    data ? [{ name, data, weight: FONT_WEIGHT, style: 'normal' as const }] : [],
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: `radial-gradient(circle at 50% 45%, ${COLORS.void2} 0%, ${COLORS.void} 70%)`,
          color: COLORS.parchment,
          fontFamily: fonts.map(({ name }) => name).join(', ') || 'sans-serif',
        }}
      >
        {/* Золоте коло — та сама метафора, що й колесо натальної карти */}
        <div
          style={{
            position: 'absolute',
            width: RING_SIZE,
            height: RING_SIZE,
            borderRadius: '50%',
            border: `2px solid ${COLORS.gold}`,
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: RING_SIZE + 80,
            height: RING_SIZE + 80,
            borderRadius: '50%',
            border: `1px solid ${COLORS.gold}`,
            opacity: 0.15,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            padding: '0 80px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 84, color: COLORS.goldSoft, lineHeight: 1.1 }}>
            {heading}
          </div>
          {details.map((line) => (
            <div key={line} style={{ fontSize: 36, lineHeight: 1.3 }}>
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 48,
            fontSize: 26,
            letterSpacing: 2,
            color: COLORS.muted,
          }}
        >
          {footer}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fonts.length ? fonts : undefined,
    },
  );
};
