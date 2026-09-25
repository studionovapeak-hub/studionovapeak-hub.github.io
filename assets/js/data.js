// Nova Peak Studio — solo dev. Single source of truth.
// One game: Super Block Blast!

window.NOVA_DATA = {
  studio: {
    name: "Nova Peak Studio",
    tagline: "One person — building games I actually want to play.",
    description: "Hey — I'm the solo developer behind Nova Peak Studio. I design and code small, tactile games in my spare time. Super Block Blast! is my current focus: a cozy-but-spiky block puzzle I kept tweaking until it felt just right.",
    email: "studionovepeak@gmail.com",
    playDeveloperUrl: "https://play.google.com/store/apps/dev?id=YOUR_DEVELOPER_ID", // TODO: replace when you have your Play developer ID
    xUrl: "https://x.com/YOUR_HANDLE", // TODO: replace or delete
    location: "Solo · Remote"
  },
  projects: [
    {
      id: "super-block-blast",
      slug: "super-block-blast",
      name: "Super Block Blast!",
      type: "Game",
      platform: "Android",
      status: "Live",
      tagline: "Drop, clear, blast — the puzzle that won't let go.",
      description: "Super Block Blast! is a fast, tactile block puzzle. Drag colorful blocks onto the 8×8 board, clear lines, chain combos, and chase that perfect blast. Easy to learn, hard to put down.",
      longDescription: "I built Super Block Blast! for those 5-minute breaks that turn into 30. No timers breathing down your neck — just you, the board, and the satisfying pop of a multi-line clear. Every move matters, combos stack, and the board never fills the same way twice. Offline, snappy, and tuned for one-handed play.",
      features: [
        "Drag & drop 8×8 block puzzle — clear rows & columns",
        "Combo system with satisfying blast effects",
        "Daily challenge + endless mode",
        "Offline, lightweight (~60 MB), 60fps on most phones",
        "No forced ads mid-game — ads only between sessions if enabled"
      ],
      icon: "../../assets/img/super-block-blast/icon.png",
      hero: "../../assets/img/super-block-blast/banner.jpg",
      screenshots: ["../../assets/img/super-block-blast/screenshot-1.jpg","../../assets/img/super-block-blast/screenshot-2.jpg","../../assets/img/super-block-blast/screenshot-3.jpg"],
      playUrl: "https://play.google.com/store/apps/details?id=com.YOUR_DOMAIN.superblockblast", // TODO: replace with real package when live
      privacyUrl: "../../privacy/super-block-blast/",
      accent: "#ff3b30",
      releaseDate: "2026-02-10"
    }
  ]
};
