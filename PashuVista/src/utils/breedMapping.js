// Static breed mapping for demo purposes (with origin, milk yield, age of production, and generation capacity)
export const breedMapping = [
  { keyword: 'sahiwal', breed: 'Sahiwal', origin: 'Punjab / Haryana', milkYield: '8–10 liters/day', milkAge: '3–4 years onwards', generationCapacity: '10–12 years', confidence: 90 },
  { keyword: 'jersey', breed: 'Jersey', origin: 'Jersey Island (adapted in India)', milkYield: '12–15 liters/day', milkAge: '2.5–3 years onwards', generationCapacity: '10 years', confidence: 92 },
  { keyword: 'gir', breed: 'Gir', origin: 'Gujarat', milkYield: '10–12 liters/day', milkAge: '3 years onwards', generationCapacity: '12–15 years', confidence: 91 },
  { keyword: 'hallilar', breed: 'Hallilar', origin: 'South India', milkYield: '2–5 liters/day', milkAge: '3 years onwards', generationCapacity: '8–10 years', confidence: 94 },
  { keyword: 'holstein', breed: 'Holstein Friesian', origin: 'Netherlands (adapted in Punjab)', milkYield: '20–25 liters/day', milkAge: '2.5 years onwards', generationCapacity: '7–9 years', confidence: 93 },
  // Add more breeds if needed
];

export function detectBreedFromFilename(filename) {
  const lower = filename.toLowerCase();

  // Handle camera-captured images (common generic names)
  if (lower.startsWith('image') || lower.startsWith('photo') || lower.startsWith('img_') || lower.startsWith('dsc_')) {
    return {
      breed: 'Camera Image (Breed Not Detected)',
      origin: 'Manual review needed',
      milkYield: 'Not Available',
      milkAge: 'Not Available',
      generationCapacity: 'Not Available',
      confidence: 0
    };
  }

  // Robust breed detection: allow partial matches and ignore extra characters
  for (const entry of breedMapping) {
    const cleanFilename = lower.replace(/[^a-z]/g, '');
    const cleanKeyword = entry.keyword.replace(/[^a-z]/g, '');
    if (cleanFilename.includes(cleanKeyword)) {
      return {
        breed: entry.breed,
        origin: entry.origin,
        milkYield: entry.milkYield,
        milkAge: entry.milkAge,
        generationCapacity: entry.generationCapacity,
        confidence: entry.confidence
      };
    }
  }

  // Default fallback
  return {
    breed: 'Unknown Breed',
    origin: 'Not Available',
    milkYield: 'Not Available',
    milkAge: 'Not Available',
    generationCapacity: 'Not Available',
    confidence: 50
  };
}
