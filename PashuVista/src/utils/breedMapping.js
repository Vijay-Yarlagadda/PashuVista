// Static breed mapping for demo purposes (with confidence)
export const breedMapping = [
  { keyword: 'sahiwal', breed: 'Sahiwal', locality: 'Punjab / Haryana', confidence: 90 },
  { keyword: 'jersey', breed: 'Jersey', locality: 'Origin: Jersey Island (adapted in India)', confidence: 92 },
  { keyword: 'gir', breed: 'Gir', locality: 'Gujarat', confidence: 91 },
  { keyword: 'holstein', breed: 'Holstein Friesian', locality: 'Punjab (imported from Netherlands)', confidence: 93 },
  // Add more breeds if needed
];

export function detectBreedFromFilename(filename) {
  const lower = filename.toLowerCase();
  for (const entry of breedMapping) {
    if (lower.includes(entry.keyword)) {
      return { 
        breed: entry.breed, 
        locality: entry.locality, 
        confidence: entry.confidence 
      };
    }
  }
  return { 
    breed: 'Unknown Breed', 
    locality: 'Not Available', 
    confidence: 50 
  };
}
