export interface ApodItem {
  title: string;
  explanation: string;
  url: string;
  date: string;
  copyright?: string;
  media_type: 'image' | 'video';
}

export interface NasaImageResult {
  nasa_id: string;
  title: string;
  description: string;
  imageUrl: string;
  date_created: string;
  keywords?: string[];
}

// Verified fallback APOD item in case rate-limits or offline
const FALLBACK_APOD: ApodItem = {
  title: 'Earth and the Moon from Deep Space',
  explanation: 'Captured by NASA spacecraft, this historic view reminds us of our home planet and the ancient celestial companion where Apollo left the first robotic sentinels and human footprints.',
  url: '/src/assets/images/hero_space_journey_1790365407516.jpg',
  date: '2026-09-25',
  copyright: 'NASA / JPL-Caltech',
  media_type: 'image'
};

export async function fetchApod(): Promise<ApodItem> {
  try {
    const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      title: data.title || FALLBACK_APOD.title,
      explanation: data.explanation || FALLBACK_APOD.explanation,
      url: data.url || FALLBACK_APOD.url,
      date: data.date || FALLBACK_APOD.date,
      copyright: data.copyright,
      media_type: data.media_type || 'image'
    };
  } catch {
    return FALLBACK_APOD;
  }
}

export async function searchNasaImages(query: string): Promise<NasaImageResult[]> {
  try {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const items = data.collection?.items || [];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.slice(0, 8).map((item: any) => {
      const info = item.data?.[0] || {};
      const link = item.links?.[0]?.href || '';
      return {
        nasa_id: info.nasa_id || String(Math.random()),
        title: info.title || query,
        description: info.description || 'NASA archival imagery.',
        imageUrl: link,
        date_created: info.date_created || '',
        keywords: info.keywords || []
      };
    }).filter((item: NasaImageResult) => Boolean(item.imageUrl));
  } catch (err) {
    console.warn('NASA images API fallback:', err);
    return [];
  }
}
