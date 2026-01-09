import { Book, ScrollText } from "lucide-react";

export interface Chapter {
  id: string;
  number: number;
  title: string;
  arabicTitle?: string;
  content: string;
  keyPoints?: string[];
}

export interface Manuscript {
  id: string;
  title: string;
  subtitle: string;
  author?: string;
  translator?: string;
  year?: string;
  description: string;
  icon: typeof ScrollText | typeof Book;
  chapters: Chapter[];
}

export const manuscripts: Manuscript[] = [
  {
    id: "arab-archery",
    title: "Arab Archery",
    subtitle: "A 15th Century Moroccan Manuscript",
    translator: "Nabih Amin Faris & Robert Potter Elmer",
    year: "1945",
    description: "Comprehensive treatise covering all aspects of traditional archery, from bow construction to advanced shooting techniques.",
    icon: ScrollText,
    chapters: [
      {
        id: "aa-1",
        number: 1,
        title: "Introduction to the Art of Archery",
        arabicTitle: "مقدمة في فن الرماية",
        content: `Archery is among the noblest of arts, combining physical discipline with spiritual focus. The ancient masters taught that the bow is an extension of the archer's will, and the arrow carries forth their intention.

This manuscript preserves the wisdom of generations of archers who refined their craft through devoted practice and careful observation. What follows is a complete guide to the art, from the selection of materials to the achievement of mastery.

The archer must approach this art with humility and patience. As the masters say, "The bow teaches those who listen." No amount of reading can replace the hours of practice required, but proper understanding of principles can guide that practice toward excellence.`,
        keyPoints: [
          "Archery combines physical and spiritual discipline",
          "The bow extends the archer's will",
          "Humility and patience are essential virtues"
        ]
      },
      {
        id: "aa-2",
        number: 2,
        title: "On the Selection of the Bow",
        arabicTitle: "في اختيار القوس",
        content: `The selection of a bow is the foundation upon which all archery skill is built. A poorly chosen bow will hinder even the most talented archer, while a well-matched bow becomes a trusted companion in the pursuit of excellence.

First, consider the draw weight. The bow should be strong enough to send arrows with authority, yet not so heavy that it causes trembling or fatigue. A bow that exhausts the archer cannot be drawn consistently.

The length of the bow must suit the archer's draw length. Too short a bow will stack, becoming progressively harder to draw. Too long a bow becomes unwieldy and slow.

Examine the limbs carefully. They should be free of twists, cracks, or uneven tiller. When drawn, both limbs should bend in harmony, like two dancers moving as one.

The grip must feel natural in the hand, neither too thick nor too thin. The archer's hand should wrap around it without strain, finding the same position shot after shot.`,
        keyPoints: [
          "Draw weight must match the archer's strength",
          "Bow length must suit the archer's draw length",
          "Limbs must be free of defects and tiller evenly",
          "The grip must fit naturally in the hand"
        ]
      },
      {
        id: "aa-3",
        number: 3,
        title: "On the Arrow",
        arabicTitle: "في السهم",
        content: `The arrow is the messenger of the archer's intent. Where the bow provides power, the arrow provides precision. No element of archery equipment deserves more careful attention.

The shaft must be straight and true. Roll it across a flat surface and watch for wobble. Sight down its length to detect any curve. Even slight imperfections will be magnified over distance.

The spine of the arrow—its stiffness—must match the bow's draw weight. An arrow too stiff will fly left (for a right-handed archer); too weak and it will fly right. This matching, called paradox, is essential for accuracy.

Fletching guides the arrow in flight. Three feathers are traditional, though four may be used. The cock feather must be positioned to clear the bow as the arrow leaves. Helical fletching imparts spin, stabilizing the arrow like a thrown spear.

The point determines the arrow's purpose: target points for practice, broadheads for hunting, blunts for small game. Weight forward steadies the arrow; too much weight slows it.`,
        keyPoints: [
          "Arrow shafts must be perfectly straight",
          "Spine must match bow draw weight",
          "Fletching stabilizes flight through spin",
          "Point weight affects trajectory and stability"
        ]
      },
      {
        id: "aa-4",
        number: 4,
        title: "The Stance",
        arabicTitle: "الوقفة",
        content: `The stance is the foundation from which all shooting flows. A weak foundation produces weak shooting. The masters devoted great attention to the positioning of the feet and the alignment of the body.

Stand with feet shoulder-width apart, perpendicular to the target. The front foot may angle slightly toward the target—no more than the width of a finger. Weight should be distributed evenly between both feet.

The knees remain unlocked but not bent. Tension in the legs transmits to the upper body, disturbing the shot. Stand as if rooted to the earth, stable yet not rigid.

The hips face perpendicular to the target. Rotating the hips toward the target is a common error that restricts the draw and weakens the shot. The body forms a T-shape when viewed from above.

The spine remains straight, neither leaning forward nor back. Imagine a string pulling upward from the crown of the head, elongating the spine. This posture allows the strongest engagement of the back muscles.`,
        keyPoints: [
          "Feet shoulder-width apart, perpendicular to target",
          "Weight distributed evenly between feet",
          "Hips face perpendicular to target",
          "Spine straight, pulled upward from crown"
        ]
      },
      {
        id: "aa-5",
        number: 5,
        title: "The Grip",
        arabicTitle: "القبضة",
        content: `The grip connects the archer to the bow. It must be firm enough to control the bow, loose enough to allow clean release. The masters called this the "living grip"—responsive but not grasping.

Place the bow in the web between thumb and forefinger. The pressure point should be on the meaty pad below the thumb, not on the palm. This prevents torque during the shot.

The fingers wrap lightly around the grip, as if holding a small bird—firmly enough that it cannot escape, gently enough not to harm it. Gripping too tightly introduces tension that disturbs the shot.

At full draw, the knuckles should angle approximately 45 degrees to the bow. This alignment engages the bones of the forearm to bear the bow's weight, reducing muscle fatigue.

Upon release, the bow should jump forward naturally. Some archers allow a slight forward cant; others prefer the bow to remain vertical. Either is acceptable if consistent.`,
        keyPoints: [
          "Pressure point on pad below thumb",
          "Fingers wrap lightly, like holding a bird",
          "Knuckles angle 45 degrees at full draw",
          "Bow should jump forward on release"
        ]
      },
      {
        id: "aa-6",
        number: 6,
        title: "Drawing the Bow",
        arabicTitle: "شد القوس",
        content: `The draw is where power is gathered for the shot. Proper drawing technique distinguishes the master from the novice. The draw must be smooth, controlled, and repeatable.

Begin with the bow arm extended toward the target, not fully locked but nearly straight. The draw hand takes the string with the chosen grip—three fingers below the nock for the Mediterranean draw, thumb hook for the Eastern draw.

Draw by engaging the back muscles, not the arm. Imagine pulling the shoulder blade toward the spine. The elbow of the draw arm swings around and back, not straight back. This circular motion engages the strongest muscles.

The bow arm remains stationary as the draw hand moves. Pushing and pulling simultaneously divides the attention and weakens both movements. Let the bow arm be an anchor while the back does the work.

At full draw, the draw hand anchors at a consistent point—beneath the chin, at the corner of the mouth, or at the ear, depending on the style. This anchor ensures that every shot begins from the same position.`,
        keyPoints: [
          "Engage back muscles, not arm muscles",
          "Elbow moves in circular motion, not straight back",
          "Bow arm remains stationary during draw",
          "Anchor point must be consistent"
        ]
      },
      {
        id: "aa-7",
        number: 7,
        title: "The Anchor",
        arabicTitle: "نقطة الثبات",
        content: `The anchor is the foundation of consistency. Without a reliable anchor, the archer guesses at full draw, and guessing produces scattered arrows. The masters developed several anchor points, each with its merits.

The chin anchor brings the arrow beneath the dominant eye, allowing the archer to sight directly down the shaft. The tab or glove rests against the jawbone, providing a solid reference point.

The corner-of-mouth anchor was favored by horse archers who needed quick shots. The index finger touches the corner of the mouth, bringing the arrow higher for instinctive shooting at close range.

The ear anchor, used with thumb draw, brings the draw hand to the earlobe or behind it. This allows maximum draw length and power, favored for long-range shooting and heavy bows.

Whichever anchor is chosen, it must be practiced until it becomes automatic. The archer should feel immediately if the anchor is incorrect, as a musician feels a wrong note.`,
        keyPoints: [
          "Chin anchor allows sighting down the shaft",
          "Corner-of-mouth anchor favors quick, instinctive shots",
          "Ear anchor maximizes draw length and power",
          "Anchor must become automatic through practice"
        ]
      },
      {
        id: "aa-8",
        number: 8,
        title: "The Release",
        arabicTitle: "الإطلاق",
        content: `The release is the moment of truth. All preparation leads to this instant when the arrow leaves the bow. A flawed release undoes the work of perfect form.

The release should not be a conscious action but a letting go. The fingers do not open the string; rather, they relax until the string pulls itself free. This distinction is crucial.

Tension in the release hand is the enemy. As the draw hand anchors, the fingers should feel the string's pressure but not fight it. At the moment of release, this tension simply dissolves.

The draw hand continues its motion after release, moving back along the face toward the ear or shoulder. This follow-through ensures that the hand does not jerk forward, disturbing the arrow's flight.

Practice the release without arrows until it becomes smooth and unconscious. Draw, hold briefly, and release, feeling the string slip away naturally. Only when this motion is ingrained should live shooting resume.`,
        keyPoints: [
          "Release is letting go, not opening fingers",
          "Tension in release hand disturbs the shot",
          "Follow-through continues back toward ear",
          "Practice release without arrows first"
        ]
      },
      {
        id: "aa-9",
        number: 9,
        title: "Aiming Methods",
        arabicTitle: "طرق التصويب",
        content: `The question of aiming has occupied archers throughout history. Some shoot by instinct alone; others employ precise methods. Both approaches have produced masters.

Instinctive shooting relies on the body's natural coordination, like throwing a stone. The archer looks at the target, not the arrow, and the subconscious mind calculates the shot. This method is fast but requires thousands of repetitions to develop.

Gap shooting uses the arrow point as a reference. The archer notes where the point appears relative to the target at various distances and adjusts accordingly. This method is more analytical but highly effective.

String walking adjusts the position of the draw hand on the string. For close targets, the fingers move down the string; for far targets, up. This changes the arrow's trajectory without changing the sight picture.

Face walking moves the anchor point instead. A low anchor for close targets, a high anchor for distant ones. The principle is the same as string walking, but the adjustment is made at the anchor.

Whichever method is chosen, consistency remains paramount. The method that is practiced most becomes the most reliable.`,
        keyPoints: [
          "Instinctive shooting relies on subconscious calculation",
          "Gap shooting uses arrow point as reference",
          "String walking adjusts finger position for distance",
          "Consistency matters more than method chosen"
        ]
      },
      {
        id: "aa-10",
        number: 10,
        title: "Breathing and Focus",
        arabicTitle: "التنفس والتركيز",
        content: `The breath is the bridge between body and mind. Proper breathing calms the nerves, steadies the hands, and focuses the attention. The masters integrated breathing into every shot.

Before drawing, take a deep breath to center yourself. As you draw, exhale slowly and steadily. At full draw, hold the breath briefly—no more than a few seconds—maintaining a natural pause.

Release during this respiratory pause, when the body is most still. The heartbeat itself causes the body to move; shooting between heartbeats produces the steadiest shots.

Mental focus must be complete. The mind that wanders finds its arrows wandering also. At the moment of release, there should be only the target—no thoughts of form, no analysis, no self-criticism.

The masters spoke of "empty mind" at the moment of release. This does not mean thinking of nothing, but rather being so absorbed in the act that conscious thought falls away. The arrow flies itself.`,
        keyPoints: [
          "Exhale slowly during the draw",
          "Hold breath briefly at full draw",
          "Release during respiratory pause",
          "Empty mind allows the arrow to fly itself"
        ]
      }
    ]
  },
  {
    id: "saracen-archery",
    title: "Saracen Archery",
    subtitle: "A Mameluke Work on Archery (ca. A.D. 1368)",
    translator: "J.D. Latham & W.F. Paterson",
    year: "1970",
    description: "Detailed technical instruction from medieval Egypt on mounted and foot archery techniques.",
    icon: ScrollText,
    chapters: [
      {
        id: "sa-1",
        number: 1,
        title: "The Excellence of Archery",
        content: `Know that archery is the most noble of the martial arts, blessed by the Prophet himself who said, "Teach your children swimming, archery, and horsemanship." No skill brings together body, mind, and spirit as completely as the bow.

The Mamelukes inherited this art from the steppe peoples and refined it to perfection in the service of Egypt. What was once the weapon of nomads became the discipline of sultans. Every warrior trained in the bow, from the lowest soldier to the highest emir.

This treatise records the methods passed down through generations of masters. It is written for those who would learn, not merely to shoot, but to excel. Mediocrity has no place on the battlefield; only the archer who has perfected his art will prevail.

Study these words, practice diligently, and you may in time achieve what the masters achieved. But know that reading alone accomplishes nothing. The bow is learned in the hand, not on the page.`,
        keyPoints: [
          "Archery blessed by prophetic tradition",
          "Mamelukes refined steppe archery methods",
          "Practice is essential—reading is not enough"
        ]
      },
      {
        id: "sa-2",
        number: 2,
        title: "The Composite Bow",
        content: `The composite bow of the Mamelukes is a marvel of craftsmanship, combining wood, horn, and sinew into a weapon of tremendous power. Understanding its construction helps the archer appreciate its capabilities.

The core is wood, typically maple or bamboo, providing the basic shape and structure. To the belly—the side facing the archer—is glued horn, which resists compression. To the back is applied sinew, which resists tension.

This combination allows the bow to store far more energy than its size would suggest. A composite bow of forty inches can outperform a wooden bow of sixty inches. This compact power made it the weapon of choice for mounted warriors.

The bow must be treated with care. Heat and moisture are its enemies. In dry weather, the bow grows stronger; in damp weather, weaker. Store it in its case, never leave it strung, and protect it from extremes.

A well-made composite bow will serve for generations. Treat it as a faithful companion, and it will not fail you.`,
        keyPoints: [
          "Core is wood, belly is horn, back is sinew",
          "Composite design stores more energy in less length",
          "Protect from heat and moisture",
          "Never leave strung when not in use"
        ]
      },
      {
        id: "sa-3",
        number: 3,
        title: "The Thumb Draw",
        arabicTitle: "السحب بالإبهام",
        content: `The thumb draw is the method of the Eastern peoples, superior to the Mediterranean draw for mounted archery and rapid shooting. The thumb locks around the string while the fingers secure the thumb.

To perform the thumb draw, curl the thumb around the string, placing the string in the crease of the first joint. The tip of the thumb points back toward your body. The index and middle fingers wrap over the thumbnail, securing it in place.

At rest, the grip feels strange to those trained in other methods. But in practice, it allows faster nocking and release than any finger draw. The single joint of the thumb releases more cleanly than the multiple joints of the fingers.

A thumb ring protects the thumb from the string's pressure. Made of leather, bone, horn, or precious materials, the ring allows heavier bows to be drawn with less strain. The ring's inner edge must be smooth; any roughness will wear at the thumb.

Practice the thumb draw without release first. Draw, hold, and slowly return. Let the muscles of the hand learn this new position before attempting to shoot.`,
        keyPoints: [
          "String rests in crease of thumb's first joint",
          "Fingers wrap over thumbnail to secure",
          "Thumb ring protects against heavy draw weights",
          "Practice draw without release first"
        ]
      },
      {
        id: "sa-4",
        number: 4,
        title: "Mounted Archery Fundamentals",
        content: `Shooting from horseback demands mastery of both archery and horsemanship. The challenges are many: the moving platform, the limited field of fire, the need for speed. Only those who have perfected ground archery should attempt the saddle.

First, become one with the horse. The horse's movement becomes your movement. Rise and fall with the rhythm of the gait, absorbing shock through bent knees and relaxed joints. Fighting the horse's motion makes accurate shooting impossible.

The grip on the bow must accommodate holding reins as well. The bow is held in the left hand; the reins either looped around the bow hand's fingers or held in the teeth during shooting. Neither solution is elegant, but both are necessary.

Shooting positions vary with the angle to the target. Forward shots over the horse's neck, sideways shots past the knee, and the famous Parthian shot backward over the horse's rump—each has its technique.

Begin at the walk, shooting at ground targets. Progress to trot, then canter. Only after hundreds of arrows should you attempt the gallop. Patience in training produces confidence in battle.`,
        keyPoints: [
          "Master ground archery before mounted archery",
          "Absorb horse's motion through bent knees",
          "Practice shooting positions at each angle",
          "Progress slowly from walk to gallop"
        ]
      },
      {
        id: "sa-5",
        number: 5,
        title: "Speed Shooting",
        content: `Speed is the mounted archer's advantage. While the crossbowman loads one bolt, the archer looses five arrows. But speed without accuracy wastes ammunition; accuracy without speed wastes opportunity.

Hold additional arrows in the draw hand, between the fingers or against the palm. With practice, nocking becomes a single fluid motion—the arrow slides onto the string as the hand reaches for the grip.

Some masters held arrows in the bow hand, fanning them between thumb and fingers. Others gripped them in their teeth or quiver. Each method has trade-offs between speed and security.

The rhythm of rapid shooting differs from deliberate shooting. Draw, release, nock, draw, release—an unbroken cycle. The mind does not aim each shot individually but establishes a pattern that the body follows.

At ten arrows per minute, you are a soldier. At fifteen, you are accomplished. At twenty, you approach mastery. Some legendary archers exceeded thirty arrows per minute in short bursts, though accuracy suffered.`,
        keyPoints: [
          "Hold additional arrows in draw hand",
          "Nocking becomes a single fluid motion",
          "Rhythm replaces deliberate aiming",
          "Master level is 20+ arrows per minute"
        ]
      },
      {
        id: "sa-6",
        number: 6,
        title: "The Parthian Shot",
        content: `Named for the ancient Parthians who devastated Roman legions with this technique, the backward shot epitomizes mounted archery. Seemingly in retreat, the archer turns to strike pursuers.

The horse gallops away from the target. The archer rotates at the waist, turning the upper body to face backward while the legs maintain grip on the horse. The bow arm extends past the horse's rump.

The twist in the torso is uncomfortable until muscles adapt. Begin practicing this rotation on a standing horse, then at walk, building flexibility gradually. Forcing the position risks injury.

Timing is critical. The shot is released at the moment when the horse is most stable—the phase of the gallop when all four hooves are off the ground and the body glides forward smoothly.

The Parthian shot is as much psychological weapon as physical. An enemy who believes pursuit is safe finds arrows falling among them, sowing confusion and fear. Its mere threat changes the dynamics of battle.`,
        keyPoints: [
          "Upper body rotates while legs maintain grip",
          "Build flexibility gradually from standing horse",
          "Release when all four hooves are airborne",
          "Psychological impact as important as physical"
        ]
      }
    ]
  },
  {
    id: "mamluk-furusiyah",
    title: "Mamluk Furusiyah",
    subtitle: "Academic Study by Shihab al-Sarraf",
    author: "Shihab al-Sarraf",
    year: "2004",
    description: "Scholarly analysis of Islamic martial arts traditions and their historical significance.",
    icon: Book,
    chapters: [
      {
        id: "mf-1",
        number: 1,
        title: "Introduction to Furusiyah",
        content: `Furusiyah, often translated as "horsemanship" or "chivalry," encompasses far more than equestrian skill. It represents the complete martial education of the Islamic warrior, including archery, swordsmanship, lance work, wrestling, and the ethical code that governs their use.

The term derives from "faras" (horse), reflecting the centrality of mounted combat in Islamic military tradition. But furusiyah treatises address much more than riding. They constitute complete martial arts manuals, preserving techniques refined over centuries.

This tradition reached its zenith under the Mamelukes of Egypt and Syria (1250-1517 CE). The Mameluke sultanate institutionalized furusiyah training, creating schools and competitive events that pushed the martial arts to remarkable sophistication.

Understanding furusiyah requires appreciating its context. These were not sporting skills but matters of life and death. The techniques described were tested in countless battles against Crusaders, Mongols, and rival powers. Only the effective survived.`,
        keyPoints: [
          "Furusiyah means complete martial education",
          "Reached peak under Mameluke Sultanate",
          "Techniques were battle-tested over centuries"
        ]
      },
      {
        id: "mf-2",
        number: 2,
        title: "The Mameluke Training System",
        content: `The Mamelukes developed history's most rigorous military training system. Young slaves, typically Turkic or Circassian, were purchased specifically for their potential as warriors. Their education lasted years, producing elite soldiers without peer.

Training began with basic physical conditioning—running, swimming, lifting stones. The body was shaped before specific skills were introduced. A weak body cannot support strong technique.

Archery instruction started with the fundamentals: stance, grip, draw. Students shot at close targets until these basics became automatic. Only then did distance gradually increase. Rushing this process produced archers who failed under pressure.

Mounted training followed a similar progression. First, riding without weapons until the horse became an extension of the body. Then simple weapons—lance, sword—at the walk. Finally, combined arms at speed, culminating in the complex maneuvers of battlefield tactics.

This systematic approach produced warriors who could reload while galloping, shoot behind themselves, and maintain formation in chaos. The methods remain relevant for those seeking mastery.`,
        keyPoints: [
          "Training began with physical conditioning",
          "Fundamentals drilled until automatic",
          "Skills added progressively in complexity",
          "System produced unparalleled warriors"
        ]
      },
      {
        id: "mf-3",
        number: 3,
        title: "Archery in Furusiyah Literature",
        content: `Archery receives more attention in furusiyah treatises than any other skill. Dozens of manuscripts survive detailing every aspect of the bow, from construction to advanced shooting techniques. This literature represents an unbroken tradition of transmission from master to student.

The treatises categorize shooting into types: foot archery and mounted archery, target shooting and flight shooting, hunting and warfare. Each type has its own techniques, equipment, and training methods.

Terminology was precise. Different draws, releases, and anchor points had specific names. This vocabulary allowed masters to communicate subtle distinctions that would otherwise be lost. Modern students must learn this terminology to access the sources.

Many treatises include training progressions. These curricula describe what to teach at each stage, how long to spend on each skill, and what standards must be met before advancing. Such systematic pedagogy was rare in medieval military training.

The literature also addresses the spiritual dimension. Archery was understood as a practice that developed character alongside skill. Patience, focus, and humility were cultivated through the bow.`,
        keyPoints: [
          "More texts survive on archery than other skills",
          "Precise terminology for subtle distinctions",
          "Training progressions and curricula documented",
          "Spiritual development integrated with technical"
        ]
      },
      {
        id: "mf-4",
        number: 4,
        title: "Equipment and Technology",
        content: `Mameluke equipment represented the height of Islamic craftsmanship. Bowyers, arrow-makers, and armorers enjoyed high status and organized into guilds that protected trade secrets across generations.

The composite bow reached its final development under the Mamelukes. Their bows combined efficient design with artistic beauty—lacquered, painted, and signed by their makers. Some have survived to the present day.

Arrows were equally sophisticated. Different shaft materials, point designs, and fletching patterns suited different purposes. War arrows were heavy and armor-piercing; flight arrows were light and aerodynamic.

Thumb rings varied from simple leather straps to elaborate works of art in jade, ivory, or precious metals. The ring's design affected performance; serious archers owned multiple rings for different situations.

The equipment itself embodied accumulated knowledge. Every design choice—the angle of a recurve, the weight of a point, the shape of a ring—reflected generations of experimentation. Understanding why equipment was made as it was deepens appreciation for the art.`,
        keyPoints: [
          "Craftsmen organized into protective guilds",
          "Composite bow reached final development",
          "Different arrows for different purposes",
          "Equipment design embodied accumulated wisdom"
        ]
      },
      {
        id: "mf-5",
        number: 5,
        title: "Competitive Archery",
        content: `The Mamelukes formalized archery competition into elaborate events that tested every aspect of skill. These competitions served both to identify talented individuals and to maintain readiness throughout the military.

Target competitions used standardized distances and target sizes. Archers were ranked by scores, and standings were recorded. This created incentive for continuous improvement and established objective standards of excellence.

Flight shooting—shooting for maximum distance—was a separate discipline. Special lightweight bows and arrows could achieve remarkable ranges. Records were kept, and champion flight shooters received honors and prizes.

Speed shooting competitions tested how many arrows could be accurately placed in a given time. This practical skill directly translated to battlefield effectiveness, where volume of fire could be decisive.

Mounted competitions combined multiple skills. Courses required shooting targets while galloping, performing precise maneuvers, and demonstrating control under pressure. These events were spectacles that drew crowds and prestige.`,
        keyPoints: [
          "Competitions identified talent and maintained readiness",
          "Target, flight, and speed disciplines",
          "Objective scoring and record-keeping",
          "Mounted courses combined multiple skills"
        ]
      },
      {
        id: "mf-6",
        number: 6,
        title: "Legacy and Modern Practice",
        content: `The Mameluke tradition ended with the Ottoman conquest of 1517, but its legacy persists. Manuscripts preserved in libraries around the world continue to inform those who seek to revive these arts.

Modern practitioners face challenges unknown to the originals. Authentic equipment is rare and expensive. Horses trained for mounted archery are scarcer still. The context of battlefield application no longer exists.

Yet the core of the art remains accessible. The same principles of stance, draw, and release that the Mamelukes practiced can be learned today. The physical skills transcend time, awaiting only committed students to revive them.

Historical European Martial Arts (HEMA) movements have inspired similar interest in Islamic martial traditions. Practitioners combine textual study with physical experimentation, testing manuscript descriptions against practical experience.

The furusiyah tradition offers more than technical instruction. Its integration of physical skill, mental discipline, and ethical development provides a model for martial arts practice. Those who engage with this tradition find themselves transformed.`,
        keyPoints: [
          "Manuscripts preserved in libraries worldwide",
          "Core principles remain learnable today",
          "Modern revival combines text and practice",
          "Tradition integrates body, mind, and ethics"
        ]
      }
    ]
  }
];

export function getManuscriptById(id: string): Manuscript | undefined {
  return manuscripts.find((m) => m.id === id);
}

export function getChapterById(manuscriptId: string, chapterId: string): Chapter | undefined {
  const manuscript = getManuscriptById(manuscriptId);
  return manuscript?.chapters.find((c) => c.id === chapterId);
}
