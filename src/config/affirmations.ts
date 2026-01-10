export interface DailyAffirmation {
  id: string;
  affirmation: string;
  arabicText?: string;
  source: string;
  companionStory: {
    title: string;
    narrative: string;
    benefit: string;
  };
  category: "hadith" | "wisdom" | "virtue" | "health";
}

export const affirmations: DailyAffirmation[] = [
  {
    id: "1",
    affirmation: "Practice archery, for it is one of the best of your amusements.",
    arabicText: "عَلَيْكُمْ بِالرَّمْيِ فَإِنَّهُ مِنْ خَيْرِ لَهْوِكُمْ",
    source: "Prophet Muhammad ﷺ (Sahih Muslim)",
    companionStory: {
      title: "The Archers of Madinah",
      narrative: "The companions would gather at the archery grounds after Fajr prayer, their arrows flying true in the early morning light. The Prophet ﷺ would often watch them practice, encouraging their efforts and reminding them that this noble pursuit was beloved to Allah.",
      benefit: "Archery combines physical training with mental focus, creating discipline that extends to all aspects of life.",
    },
    category: "hadith",
  },
  {
    id: "2",
    affirmation: "Teach your children swimming, archery, and horse riding.",
    source: "Attributed to Umar ibn al-Khattab (RA)",
    companionStory: {
      title: "The Vision of the Second Caliph",
      narrative: "Umar (RA) understood that these three skills were not merely sports, but foundations of character. He saw how archery taught patience, focus, and the acceptance of outcomes—lessons that shaped the youth of the Ummah into capable leaders.",
      benefit: "These skills build confidence, self-reliance, and preparedness for life's challenges.",
    },
    category: "wisdom",
  },
  {
    id: "3",
    affirmation: "The space between the two targets is one of the gardens of Paradise.",
    arabicText: "مَا بَيْنَ الْغَرَضَيْنِ رَوْضَةٌ مِنْ رِيَاضِ الْجَنَّةِ",
    source: "Hadith",
    companionStory: {
      title: "Sacred Ground",
      narrative: "This profound hadith reveals that the archery range itself holds spiritual significance. When the archer walks between the targets, retrieving arrows and reflecting on each shot, they walk through blessed space—a reminder that practice with the right intention transforms the mundane into worship.",
      benefit: "The practice itself becomes an act of worship when done with proper intention (niyyah).",
    },
    category: "hadith",
  },
  {
    id: "4",
    affirmation: "Whoever learns archery then abandons it is not one of us.",
    arabicText: "مَنْ تَعَلَّمَ الرَّمْيَ ثُمَّ تَرَكَهُ فَلَيْسَ مِنَّا",
    source: "Prophet Muhammad ﷺ",
    companionStory: {
      title: "The Covenant of Consistency",
      narrative: "This strong reminder from the Prophet ﷺ emphasizes that archery is not a passing hobby but a lifelong commitment. The Sahaba understood that skills given by Allah must be maintained as a form of gratitude and readiness to serve the Ummah.",
      benefit: "Consistency in practice builds character and honors the blessing of capability.",
    },
    category: "hadith",
  },
  {
    id: "5",
    affirmation: "The strong believer is better and more beloved to Allah than the weak believer, while there is good in both.",
    arabicText: "الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ وَفِي كُلٍّ خَيْرٌ",
    source: "Prophet Muhammad ﷺ (Sahih Muslim)",
    companionStory: {
      title: "Strength in Service",
      narrative: "Physical strength, when paired with spiritual conviction, allows a believer to better serve their family, community, and faith. The companions trained their bodies not for vanity, but to be capable vessels for good works.",
      benefit: "Physical discipline strengthens spiritual resolve and enables greater service.",
    },
    category: "virtue",
  },
  {
    id: "6",
    affirmation: "And prepare against them whatever you are able of power and of steeds of war.",
    arabicText: "وَأَعِدُّوا لَهُم مَّا اسْتَطَعْتُم مِّن قُوَّةٍ وَمِن رِّبَاطِ الْخَيْلِ",
    source: "Quran 8:60",
    companionStory: {
      title: "The Divine Command",
      narrative: "When this verse was revealed, the Prophet ﷺ clarified that 'power' here refers specifically to archery. This elevated the art from mere skill to religious obligation—a means of protecting oneself, family, and the Ummah.",
      benefit: "Archery training fulfills a Quranic command to remain prepared and capable.",
    },
    category: "virtue",
  },
  {
    id: "7",
    affirmation: "The archer who misses his mark learns more than the one who hits by chance.",
    source: "Arab Archery Manuscript",
    companionStory: {
      title: "Wisdom in the Miss",
      narrative: "The classical masters taught that a mindful miss reveals more about technique than a lucky hit. Each arrow that strays from the target carries information—about grip, release, focus, and breath. The wise archer studies failure as intently as success.",
      benefit: "Embracing mistakes as teachers accelerates growth in archery and in life.",
    },
    category: "wisdom",
  },
  {
    id: "8",
    affirmation: "Before you can conquer the target, you must first conquer yourself.",
    source: "Saracen Archery",
    companionStory: {
      title: "The Inner Battle",
      narrative: "Mamluk masters understood that the greatest obstacle to accuracy was not distance or wind, but the archer's own mind. Impatience, ego, and fear of failure corrupt the shot before the arrow leaves the string. Mastery begins within.",
      benefit: "Archery becomes a practice of self-discipline and emotional regulation.",
    },
    category: "wisdom",
  },
  {
    id: "9",
    affirmation: "The bow is an extension of the heart; let your intention fly true.",
    source: "Mamluk Furusiyah Literature",
    companionStory: {
      title: "The Unity of Intent",
      narrative: "The Furusiyah tradition taught that equipment, body, and spirit must unite in a single purpose. When the heart is pure and the intention sincere, the arrow becomes a prayer released into the world.",
      benefit: "Aligning physical action with spiritual intention creates a meditative practice.",
    },
    category: "wisdom",
  },
  {
    id: "10",
    affirmation: "Sa'd ibn Abi Waqqas was the first to shoot an arrow in defense of Islam.",
    source: "Historical Account",
    companionStory: {
      title: "The First Arrow",
      narrative: "Sa'd (RA) holds the honor of being the first companion to draw blood in defense of the faith through archery. His skill was legendary, and the Prophet ﷺ made dua for his arrows to fly true. He represents the noble lineage of Muslim archers.",
      benefit: "Following in the footsteps of the Sahaba connects us to our blessed heritage.",
    },
    category: "virtue",
  },
  {
    id: "11",
    affirmation: "Archery sharpens the eyes and strengthens the limbs.",
    source: "Classical Islamic Medicine",
    companionStory: {
      title: "The Healer's Prescription",
      narrative: "Muslim physicians recognized archery as beneficial medicine. The focused gaze strengthens vision, the draw builds back and shoulder muscles, and the concentration calms the anxious mind. It was prescribed for both body and soul.",
      benefit: "Regular practice improves eyesight, posture, and muscular strength.",
    },
    category: "health",
  },
  {
    id: "12",
    affirmation: "In the stillness before release, find peace that transcends the range.",
    source: "Contemplative Archery Tradition",
    companionStory: {
      title: "The Moment of Stillness",
      narrative: "Masters speak of the sacred pause at full draw—when breath stops, thoughts quiet, and the world narrows to archer and target. This moment of complete presence is a form of dhikr, remembrance through absolute focus.",
      benefit: "Archery practice reduces anxiety and develops mindfulness skills.",
    },
    category: "health",
  },
  {
    id: "13",
    affirmation: "Every arrow released with bismillah carries baraka.",
    source: "Traditional Teaching",
    companionStory: {
      title: "The Blessed Arrow",
      narrative: "The practice of beginning each shot with 'Bismillah' transforms archery from sport to spiritual practice. When we invoke Allah's name, we acknowledge that our skill, our strength, and the arrow's flight are all by His permission.",
      benefit: "Incorporating dhikr into practice elevates the activity to worship.",
    },
    category: "virtue",
  },
  {
    id: "14",
    affirmation: "The patient archer waits for the perfect moment; haste is from Shaytan.",
    source: "Classical Teaching",
    companionStory: {
      title: "The Virtue of Patience",
      narrative: "Rushing the shot invariably leads to poor results. The classical masters taught that patience (sabr) in archery mirrors patience in life—waiting for the right moment, trusting in Allah's timing, and releasing only when truly ready.",
      benefit: "Archery training develops patience that benefits all areas of life.",
    },
    category: "wisdom",
  },
  {
    id: "15",
    affirmation: "Train as if you will live forever; shoot as if this is your last arrow.",
    source: "Warrior Wisdom",
    companionStory: {
      title: "Present Moment Awareness",
      narrative: "This teaching balances long-term dedication with immediate presence. We commit to a lifetime of practice while treating each individual arrow with complete attention and respect. Every shot matters.",
      benefit: "This mindset cultivates both perseverance and mindfulness.",
    },
    category: "wisdom",
  },
];

export function getAffirmationForDate(date: Date = new Date()): DailyAffirmation {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % affirmations.length;
  return affirmations[index];
}
