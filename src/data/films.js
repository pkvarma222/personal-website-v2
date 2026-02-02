/**
 * HOW TO ADD DETAILS FOR NEW FILMS:
 * 1. Add a new object to the FILMS array.
 * 2. title: The text title (used in the ticket badge and accessibility).
 * 3. titleImage: Path to the custom PNG title relative to /public (e.g., "/assets/film-assets/Finds You/title.png").
 * 4. category: Genre or type (Short Film, Music Video, etc.).
 * 5. year: Release year.
 * 6. image: Background thumbnail URL.
 * 7. director, role, duration: Personnel and technical specs.
 * 8. acclaim: Array of { stars: "...", quote: "..." } for reviews/awards.
 */

export const FILMS = [
    {
        id: 1,
        title: "Voicemail",
        titleImage: "/assets/film-assets/Voicemail/title.png",
        category: "Short",
        year: "2022",
        image: "/assets/film-assets/Voicemail/backgroundImage.png",
        director: "Manthena Pramod Kumar Varma",
        role: "Writer, Director, Editor, Sound Designer, Cinematographer",
        duration: "4:22",
        acclaim: [
            { stars: "CAMPUS FINALIST", quote: "Campus Movie Fest" }
        ],
        description: "A voicemail from a stranger leads to an unexpected journey of self-discovery and connection in the digital age.",
        trailerUrl: "https://www.youtube.com/embed/UnWksO4qxRs?autoplay=0&controls=1&showinfo=0",
        credits: {
            "Director of Photography": "Manthena Pramod Kumar Varma",
            "Cast": "Karthik Gannamaneni, Yasaswini"
        },
        stills: [
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200",
            "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1200",
            "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=1200"
        ]
    },
    {
        id: "shine-on-us",
        title: "Shine on Us",
        titleImage: "/assets/film-assets/Shine on Us/title.png",
        category: "Short",
        year: "2021",
        image: "/assets/film-assets/Shine on Us/backgroundImage.jpg",
        director: "Manthena Pramod Kumar Varma",
        role: "Writer, Director, Editor, Sound Designer",
        duration: "04:15",
        acclaim: [
            { stars: "JURY AWARD", quote: "Campus Movie Fest" },
            { stars: "Best Film, Cinematography, Editing, Actor", quote: "RPB UF : CMF Premiere" }
        ],
        description: "An ethereal music video capturing the warmth and light of human connection.",
        credits: {
            "Cast": "Tati Sree Sai Teja, Manthena Pramod Kumar Varma"
        },
        stills: []
    },
    {
        id: "finds-you",
        title: "Finds You",
        titleImage: "/assets/film-assets/Finds You/title.png",
        category: "Short",
        year: "2020",
        image: "/assets/film-assets/Finds You/backgroundImage.png",
        director: "Manthena Pramod Kumar Varma",
        role: "Writer, Director, Editor",
        duration: "05:30",
        acclaim: [],
        description: "A visually stunning exploration of finding oneself in the most unexpected places.",
        credits: {
            "Cast": "Sreya Peddina, Karthik Gannamaneni"
        },
        stills: []
    },
    {
        id: "knock-knock-bang",
        title: "Knock Knock Bang",
        titleImage: "/assets/film-assets/Knock Knock Bang/title.png",
        category: "Short",
        year: "2020",
        image: "/assets/film-assets/Knock Knock Bang/backgroundImage.png",
        director: "Manthena Pramod Kumar Varma",
        role: "Writer, Director, Editor, Sound Designer",
        duration: "12:00",
        acclaim: [
            { stars: "Best Editing", quote: "VJ Filmmania 2022" }
        ],
        description: "A fast-paced genre mashup that keeps you on your toes.",
        credits: {
            "Director of Photography": "Sree Mahesh Reddy Kurri",
            "Co - Director of Photography": "Arjun Reddy CV",
            "Cast": "Tarun Guntaka, Gowtham Kopisetti, Manoj Korrapati, Prudhvi Krishna, Arjun Reddy CV, Mahesh Reddy Kurri"
        },
        stills: []
    }
];
