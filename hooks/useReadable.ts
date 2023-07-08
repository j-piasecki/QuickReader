
const content = `
It was the witching hour when I finally stepped out of the dimly lit factory, the weight of a long night’s work still clinging to my weary bones. The world around me seemed unusually silent, save for the distant hoot of an owl. A chill wind rustled through the abandoned alleyways, whispering secrets only the night could bear witness to.

As I quickened my pace, an unsettling sensation crawled up my spine, as if unseen eyes were fixed upon me. Shadows stretched and contorted, taking on sinister shapes that seemed to move with a life of their own. Doubt clouded my mind, but I reassured myself it was merely exhaustion playing tricks.

That’s when I heard it—a soft, melodic laughter that sent shivers down my spine. I turned, expecting to find a playful colleague, but the alley stood empty, the laughter lingering in the air like a haunting melody. Panic knotted in my chest as I quickened my pace, my heart pounding like a drum.

From the corner of my eye, I caught glimpses of figures darting between the dilapidated buildings. Whispers echoed in the darkness, words unintelligible yet dripping with malice. Fear gripped me, urging me to run, but my legs felt heavy as if trapped in an otherworldly force.

Desperation fueled my steps, but the streets seemed to twist and turn, distorting the familiar path home. I felt a presence, a malevolent force closing in on me. I dared not glance back, for I knew the sight would be far too terrifying.

Just as panic threatened to consume me entirely, I stumbled upon a flickering streetlamp. Its feeble light cast a feeble shield against the encroaching darkness. With a burst of strength, I sprinted towards the nearest main road, the haunting laughter and whispers fading into the night behind me.

I reached the safety of my home, drenched in sweat, and collapsed onto the floor, haunted by the enigmatic encounter. The night shift had never felt so chilling, and the fear that clung to my very being left me questioning the boundaries between the known and the ethereal.

So, my fellow night workers, be cautious as you depart your shifts. For within the darkened streets, a malevolence lingers, ready to prey upon the vulnerable souls who dare to venture alone into the night. Keep your wits about you, and may you escape the clutches of the unknown that shroud the after-hours realm.`

export interface Readable {
  words: string[];
  index: number;
}

export default function useReadable(item: string): Readable {
  if (item !== 'test_book') {
    throw new Error('Item is not readable')
  }

  const words = content.split(/\s/).filter(word => word.length > 0);
  const index = 5;

  return {
    words,
    index,
  }
}