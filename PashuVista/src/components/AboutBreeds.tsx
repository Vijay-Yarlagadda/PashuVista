import React from 'react';
import { Link } from 'react-router-dom';

// List all breed images (excluding background, male, female avatars)
const breedImages = [
  'WhatsApp Image 2025-09-21 at 20.41.59_54391ab3_sihiwal.jpg',
  'WhatsApp Image 2025-09-21 at 20.39.39_87747390_redsindhicattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.36.40_c6b8a86d_reddanecattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.36.06_4947e5e1_pulikulamcattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.35.42_fdcb8cf0_ongolecattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.35.25_33d56b79_nimaricattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.35.03_8d4588b5_nilliravi.jpg',
  'WhatsApp Image 2025-09-21 at 20.34.23_b5f19cae_nagapuribuff.jpg',
  'WhatsApp Image 2025-09-21 at 20.33.54_2ead4287_murrrah.jpg',
  'WhatsApp Image 2025-09-21 at 20.33.27_da79f5a2_meshanabuffaloes.jpg',
  'WhatsApp Image 2025-09-21 at 20.33.07_8d46c8e3_krishnavalleycattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.31.33_0709b954_kankrejcattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.31.02_c640e7de_kangayamcattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.30.40_3c1e6c5d_jaffrabadibuffaloes.jpg',
  'WhatsApp Image 2025-09-21 at 20.30.12_3af4bdbc_hariana.jpg',
  'WhatsApp Image 2025-09-21 at 20.29.48_7e1f6861_deonicattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.29.27_cdfe1386_brownSwisscattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.28.37_4a1929f8_bhadawaribuffaloes.jpg',
  'WhatsApp Image 2025-09-21 at 20.28.17_a52f608d_bargurcattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.27.37_9eacf38f_ayrishirecattle.jpg',
  'WhatsApp Image 2025-09-21 at 20.27.03_779de1e6_amritmahal.jpg',
  'WhatsApp Image 2025-09-21 at 20.23.37_d3ed9e7a_alambadicattle.jpg',
  'WhatsApp Image 2025-09-17 at 09.24.11_9ec584f8_holsteinfreistan.jpg',
  'WhatsApp Image 2025-09-17 at 09.24.11_9ec584f8_hallilar.jpg',
  'WhatsApp Image 2025-09-17 at 09.24.11_9ec584f8_gir.jpg',
  'WhatsApp Image 2025-09-17 at 09.24.11_8f24a0b7_jersey.jpg',
];

// Helper to extract breed name from filename
function getBreedName(filename: string): string {
  const match = filename.match(/_([a-zA-Z]+)\.(jpg|jpeg|png)$/);
  if (match) {
    // Remove trailing 'cattle', 'buffaloes', etc.
    let breed = match[1].replace(/(cattle|buffaloes|buff|cows|bulls)$/i, '');
    // Capitalize first letter
    return breed.charAt(0).toUpperCase() + breed.slice(1);
  }
  // Try to extract from the last underscore
  const parts = filename.split('_');
  if (parts.length > 1) {
    let breed = parts[parts.length - 1].split('.')[0];
    breed = breed.replace(/(cattle|buffaloes|buff|cows|bulls)$/i, '');
    return breed.charAt(0).toUpperCase() + breed.slice(1);
  }
  return 'Unknown';
}


// Breed descriptions mapped by breed name (as extracted by getBreedName)
const breedDescriptions: Record<string, string> = {
  Alambadi: `Alambadi is an indigenous cattle breed from Tamil Nadu and parts of Karnataka in India. Traditionally used more for draught work than for milk. The breed is now rare and considered nearly extinct, with conservation efforts ongoing. They are horned, sturdy animals typical of Bos indicus cattle.`,
  Amritmahal: `Amritmahal is a draught breed from Karnataka, India. Known for endurance and speed, often used for military and agricultural transport. They are grey or white in color with long horns. Milk production is low, and they are mainly valued for strength.`,
  Ayrishire: `Ayrshire is a dairy cattle breed from Scotland, later introduced in India. They are hardy, adaptable, and suitable for a variety of climates. Milk yield is relatively high with good fat content. Their coat is usually red and white with spotted patterns.`,
  Bargur: `Bargur is a draught cattle breed from Tamil Nadu, India. Traditionally reared in forested areas by pastoral communities. They are reddish-brown with white markings and have strong horns. Known for speed, hardiness, and good resistance to diseases.`,
  Bhadawari: `Bhadawari is a buffalo breed found in Uttar Pradesh and Madhya Pradesh, India. They are prized for high-fat milk, often exceeding 8%. Coat color is copper brown with two white lines on the lower jaw. Used both for milk and draught power.`,
  BrownSwiss: `Brown Swiss originated in Switzerland and is one of the oldest dairy breeds. Known for high milk yield with good protein-to-fat ratio, ideal for cheese production. They have a solid brown or grey coat with a calm temperament. Adaptable to varied climates, making them popular worldwide.`,
  Deoni: `Deoni is a dual-purpose cattle breed from Maharashtra, India. They provide both milk and draught power. Milk yield is moderate but fat content is good. They have a white coat with black spots on the head and legs.`,
  Hariana: `Hariana is a prominent dairy and draught breed from Haryana, India. Cows produce a fair quantity of milk, while bulls are strong for field work. They are usually white or light grey. Hardy and well adapted to northern Indian conditions.`,
  Jaffrabadi: `Jaffrabadi is a large buffalo breed from Gujarat, India. One of the heaviest breeds with massive horns. Produces good quantities of milk with high butterfat. Known for hardiness and long productive life.`,
  Kangayam: `Kangayam is a draught cattle breed from Tamil Nadu, India. Medium-sized, usually grey or white in color. Renowned for strength, used for ploughing and transport. Low milk yield but highly valued for work.`,
  Kankrej: `Kankrej is a dual-purpose cattle breed from Gujarat and Rajasthan. Known for strength and endurance, also fair milk producers. Coat is grey to silver with large, lyre-shaped horns. Resistant to heat and common cattle diseases.`,
  Mehsana: `Mehsana is a buffalo breed developed in Gujarat, India. It is a cross between Murrah and Surti breeds. Milk yield is good, with high fat percentage. Adaptable and widely used for dairy purposes.`,
  Murrrah: `Murrah is the most popular dairy buffalo breed, native to Haryana and Punjab, India. Known worldwide for high milk yield and high butterfat. They are black in color with tightly curled horns. Widely used for improving other buffalo breeds.`,
  Nagapuri: `Nagpuri is a buffalo breed from Maharashtra, India. Well adapted to hot, dry regions. Milk yield is moderate but fat content is good. They are black with long, flat, backward-curved horns.`,
  Nilliravi: `Nili-Ravi is a buffalo breed from Punjab region of India and Pakistan. Famous for high milk production and long lactation. Usually black with a white mark on the forehead and tail switch. Often called the “Black Gold” of Asia due to dairy importance.`,
  Nimari: `Nimari is a dual-purpose cattle breed from Madhya Pradesh, India. Used both for draught and moderate milk yield. They are usually red with white patches. Hardy and adapted to local climate conditions.`,
  Ongole: `Ongole is a cattle breed from Andhra Pradesh, India. Large animals used for draught, dairy, and export. They are white or grey with prominent hump. Bulls are famous for strength and stamina.`,
  Pulikulam: `Pulikulam is an indigenous cattle breed from Tamil Nadu, India. Traditionally associated with Jallikattu (bull sport). Small to medium sized, grey or white in color. Mainly used for draught and cultural purposes.`,
  RedDane: `Red Dane is a dairy breed developed in Denmark. Known for good milk yield with high protein content. Medium to large animals with reddish-brown coats. Adapted to crossbreeding programs for improving milk yield.`,
  RedSindhi: `Red Sindhi is a dairy cattle breed originating in Sindh, now Pakistan. Popular in tropical regions for heat tolerance and disease resistance. Milk has good fat content and cows are fairly productive. Coat color ranges from dark red to yellowish red.`,
  Sihiwal: `Sahiwal is one of the best dairy zebu breeds, native to Punjab (India and Pakistan). Famous for high milk yield among Indian breeds. Coat is reddish-brown with varying shades. Adapted to hot climates and resistant to many diseases.`
};

const AboutBreeds: React.FC = () => {
  return (
    <div className="p-6">
      {/* Back to Home link */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between mb-2">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-900 dark:hover:text-green-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          <span className="font-medium">Back to Home</span>
        </Link>
        <div className="w-24"></div>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-center text-green-900 dark:text-green-400">About Breeds</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {breedImages.map((img) => {
          const breed = getBreedName(img);
          // Try to match breed name to description (case-insensitive, ignore spaces)
          const descKey = Object.keys(breedDescriptions).find(
            (key) => key.replace(/\s+/g, '').toLowerCase() === breed.replace(/\s+/g, '').toLowerCase()
          );
          const description = descKey ? breedDescriptions[descKey] : `This is a brief description about the ${breed} breed. (Details coming soon.)`;
          return (
            <div key={img} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center">
              <img src={`/images/${img}`} alt={breed} className="w-full max-w-xs h-48 object-contain rounded mb-4" />
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-400 mb-2">{breed}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutBreeds;
