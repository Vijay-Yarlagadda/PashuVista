// Static breed mapping for demo purposes (with origin, milk yield, age of production, and generation capacity)
export const breedMapping = [
  { keyword: 'sahiwal', breed: 'Sahiwal', origin: 'Punjab / Haryana', milkYield: '8–10 liters/day', milkAge: '3–4 years onwards', generationCapacity: '10–12 years' },
  { keyword: 'jersey', breed: 'Jersey', origin: 'Jersey Island (adapted in India)', milkYield: '12–15 liters/day', milkAge: '2.5–3 years onwards', generationCapacity: '10 years' },
  { keyword: 'gir', breed: 'Gir', origin: 'Gujarat', milkYield: '10–12 liters/day', milkAge: '3 years onwards', generationCapacity: '12–15 years' },
  { keyword: 'hallilar', breed: 'Hallilar', origin: 'South India', milkYield: '2–5 liters/day', milkAge: '3 years onwards', generationCapacity: '8–10 years' },
  { keyword: 'holstein', breed: 'Holstein Friesian', origin: 'Netherlands (adapted in Punjab)', milkYield: '20–25 liters/day', milkAge: '2.5 years onwards', generationCapacity: '7–9 years' },
  { keyword: 'alambadi', breed: 'Alambadi Cattle', origin: 'Tamil Nadu (India)', milkYield: '2–5 liters/day', milkAge: '3 years onwards', generationCapacity: '8–10 years' },
  { keyword: 'amritmahal', breed: 'Amritmahal', origin: 'Karnataka (India)', milkYield: '1–3 liters/day', milkAge: '3–3.5 years onwards', generationCapacity: '10–12 years' },
  { keyword: 'ayrshire', breed: 'Ayrshire Cattle', origin: 'Scotland (adapted in India)', milkYield: '15–20 liters/day', milkAge: '2.5 years onwards', generationCapacity: '8–10 years' },
  { keyword: 'bargur', breed: 'Bargur Cattle', origin: 'Tamil Nadu (India)', milkYield: '2–5 liters/day', milkAge: '3 years onwards', generationCapacity: '8–10 years' },
  { keyword: 'bhadawari', breed: 'Bhadawari Buffalo', origin: 'Uttar Pradesh & Madhya Pradesh (India)', milkYield: '4–6 liters/day', milkAge: '3–3.5 years onwards', generationCapacity: '12–15 years' },
  { keyword: 'brownswiss', breed: 'Brown Swiss Cattle', origin: 'Switzerland (adapted in India)', milkYield: '15–20 liters/day', milkAge: '2.5 years onwards', generationCapacity: '9–10 years' },
  { keyword: 'deoni', breed: 'Deoni Cattle', origin: 'Maharashtra (India)', milkYield: '3–8 liters/day', milkAge: '3 years onwards', generationCapacity: '10–12 years' },
  { keyword: 'hariana', breed: 'Hariana Cattle', origin: 'Haryana (India)', milkYield: '8–10 liters/day', milkAge: '3 years onwards', generationCapacity: '10–12 years' },
  { keyword: 'jaffrabadi', breed: 'Jaffrabadi Buffalo', origin: 'Gujarat (India)', milkYield: '10–15 liters/day', milkAge: '3 years onwards', generationCapacity: '15–18 years' },
  { keyword: 'kangayam', breed: 'Kangayam Cattle', origin: 'Tamil Nadu (India)', milkYield: '3–6 liters/day', milkAge: '3 years onwards', generationCapacity: '10–12 years' },
  { keyword: 'kankrej', breed: 'Kankrej Cattle', origin: 'Gujarat & Rajasthan (India)', milkYield: '8–12 liters/day', milkAge: '3 years onwards', generationCapacity: '12–14 years' },
  { keyword: 'mehsana', breed: 'Mehsana Buffalo', origin: 'Gujarat (India)', milkYield: '8–10 liters/day', milkAge: '3 years onwards', generationCapacity: '12–15 years' },
  { keyword: 'murrah', breed: 'Murrah Buffalo', origin: 'Haryana & Punjab (India)', milkYield: '10–16 liters/day', milkAge: '3 years onwards', generationCapacity: '15–18 years' },
  { keyword: 'nagpuri', breed: 'Nagpuri Buffalo', origin: 'Maharashtra (India)', milkYield: '4–6 liters/day', milkAge: '3–3.5 years onwards', generationCapacity: '12–15 years' },
  { keyword: 'nilliravi', breed: 'Nili-Ravi Buffalo', origin: 'Punjab (India & Pakistan)', milkYield: '10–15 liters/day', milkAge: '3 years onwards', generationCapacity: '15 years' },
  { keyword: 'nimari', breed: 'Nimari Cattle', origin: 'Madhya Pradesh (India)', milkYield: '2–5 liters/day', milkAge: '3 years onwards', generationCapacity: '8–10 years' },
  { keyword: 'ongole', breed: 'Ongole Cattle', origin: 'Andhra Pradesh (India)', milkYield: '5–8 liters/day', milkAge: '3 years onwards', generationCapacity: '12–15 years' },
  { keyword: 'pulikulam', breed: 'Pulikulam Cattle', origin: 'Tamil Nadu (India)', milkYield: '2–4 liters/day', milkAge: '3 years onwards', generationCapacity: '8–10 years' },
  { keyword: 'reddane', breed: 'Red Dane Cattle', origin: 'Denmark (adapted in India)', milkYield: '15–20 liters/day', milkAge: '2.5 years onwards', generationCapacity: '8–10 years' },
  { keyword: 'redsindhi', breed: 'Red Sindhi Cattle', origin: 'Sindh (Pakistan, also in India)', milkYield: '10–12 liters/day', milkAge: '3 years onwards', generationCapacity: '12–15 years' },
  { keyword: 'sihiwal', breed: 'Sahiwal', origin: 'Punjab / Haryana (India & Pakistan)', milkYield: '8–10 liters/day', milkAge: '3–4 years onwards', generationCapacity: '10–12 years' },

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
  // confidence removed
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
  // confidence removed
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
  // confidence removed
  };
}
