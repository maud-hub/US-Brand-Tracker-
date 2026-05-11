window.BRAND_TRACKER_DATA = {
  generatedOn: "2026-05-11",
  quarters: ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026"],
  brands: [
    { key: "Shapermint", label: "Shapermint", color: "#7c3aed" },
    { key: "Spanx", label: "Spanx", color: "#f59e0b" },
    { key: "Skims", label: "Skims", color: "#ec4899" },
    { key: "Maidenform", label: "Maidenform", color: "#3b82f6" },
    { key: "Honeylove", label: "Honeylove", color: "#ef4444" }
  ],
  awareness: {
    unaided: [
      {
        quarter: "Q2 2025",
        source: "Q2 2025 PPTX slide 8 labels and narrative text",
        confidence: "deck-verified",
        values: { Shapermint: 11, Spanx: 38, Skims: 37, Maidenform: 10, Honeylove: 5 }
      },
      {
        quarter: "Q3 2025",
        source: "Q3 2025 PPTX slide 5 overlay table",
        confidence: "deck-verified",
        values: { Shapermint: 7, Spanx: 35, Skims: 41, Maidenform: 10, Honeylove: 8 }
      },
      {
        quarter: "Q4 2025",
        source: "Q1 2026 PPTX slide 3 chart screenshot only",
        confidence: "missing-exact",
        note: "Exact Q4 2025 unaided values are not exposed as text/table data in the supplied decks. They are not charted as confirmed.",
        values: { Shapermint: null, Spanx: null, Skims: null, Maidenform: null, Honeylove: null }
      },
      {
        quarter: "Q1 2026",
        source: "Q1 2026 PPTX slide 3 dashboard cards",
        confidence: "deck-verified",
        values: { Shapermint: 10, Spanx: 37, Skims: 36, Maidenform: 10, Honeylove: 6 }
      }
    ],
    aided: [
      {
        quarter: "Q1 2025",
        source: "Q1 2025 raw XLS, relationship table",
        confidence: "raw-export",
        values: { Shapermint: 51.5, Spanx: 91.1, Skims: 72.3, Maidenform: 75.3, Honeylove: 53.5 }
      },
      {
        quarter: "Q2 2025",
        source: "Q2 2025 raw XLS, relationship table",
        confidence: "raw-export",
        values: { Shapermint: 57.3, Spanx: 93.4, Skims: 78.4, Maidenform: 77.9, Honeylove: 58.1 }
      },
      {
        quarter: "Q3 2025",
        source: "Q3 2025 PPTX slide 6 overlay table",
        confidence: "deck-verified",
        values: { Shapermint: 52.3, Spanx: 89.7, Skims: 80.0, Maidenform: 72.2, Honeylove: 57.8 }
      },
      {
        quarter: "Q4 2025",
        source: "Q4 2025 raw XLS, relationship table",
        confidence: "raw-export",
        values: { Shapermint: 48.6, Spanx: 90.6, Skims: 76.8, Maidenform: 70.9, Honeylove: 54.5 }
      },
      {
        quarter: "Q1 2026",
        source: "Q1 2026 raw XLS, relationship table",
        confidence: "raw-export",
        values: { Shapermint: 53.1, Spanx: 94.2, Skims: 78.0, Maidenform: 79.8, Honeylove: 58.1 }
      }
    ]
  },
  equity: {
    legacyQ2: {
      title: "Q2 2025 equity ownership - select one brand",
      source: "Q2 2025 raw XLS question 17",
      type: "row-percent",
      rows: [
        { statement: "Combines shaping and comfort perfectly", values: { Spanx: 38.7, Honeylove: 9.3, Shapermint: 11.9, Maidenform: 18.6, Skims: 21.6 } },
        { statement: "Offers the most comfortable shaping essentials", values: { Spanx: 37.1, Honeylove: 9.2, Shapermint: 11.8, Maidenform: 18.9, Skims: 23.0 } },
        { statement: "Easy and hassle-free to buy from", values: { Spanx: 37.9, Honeylove: 8.0, Shapermint: 12.2, Maidenform: 22.5, Skims: 19.5 } },
        { statement: "Good quality and affordability", values: { Spanx: 36.5, Honeylove: 8.3, Shapermint: 11.7, Maidenform: 24.8, Skims: 18.7 } },
        { statement: "Great customer service", values: { Spanx: 37.9, Honeylove: 8.5, Shapermint: 11.4, Maidenform: 21.8, Skims: 20.4 } }
      ]
    },
    topTwoQ3: {
      title: "Q3 2025 equity ownership - select top 2 brands",
      source: "Q3 2025 PPTX slide 9 pasted equity table",
      type: "row-check-percent",
      rows: [
        { statement: "Great customer service", values: { Honeylove: 13.5, Spanx: 30.9, Skims: 23.5, Shapermint: 13.0, Maidenform: 19.1 } },
        { statement: "Most comfortable shaping essentials", values: { Honeylove: 13.4, Spanx: 31.1, Skims: 24.0, Shapermint: 12.6, Maidenform: 18.8 } },
        { statement: "Good quality and affordability", values: { Honeylove: 12.9, Spanx: 30.9, Skims: 22.3, Shapermint: 12.8, Maidenform: 21.0 } },
        { statement: "Combines shaping and comfort perfectly", values: { Honeylove: 13.5, Spanx: 30.6, Skims: 24.2, Shapermint: 12.9, Maidenform: 18.8 } },
        { statement: "Easy and hassle-free to buy from", values: { Honeylove: 13.1, Spanx: 31.2, Skims: 23.1, Shapermint: 12.6, Maidenform: 20.0 } }
      ]
    },
    associations: {
      title: "New positioning statements - Q4 2025 vs Q1 2026",
      source: "Q4 2025 and Q1 2026 raw XLS question 17",
      type: "row-check-percent",
      rows: [
        {
          statement: "Look and feel good, but comfortable",
          q4: { Honeylove: 15.7, Spanx: 28.3, Skims: 23.4, Shapermint: 13.8, Maidenform: 18.9 },
          q1: { Honeylove: 14.2, Spanx: 29.2, Skims: 21.7, Shapermint: 13.8, Maidenform: 21.1 }
        },
        {
          statement: "For everyday real life, not just occasions",
          q4: { Honeylove: 13.6, Spanx: 28.7, Skims: 22.9, Shapermint: 12.9, Maidenform: 21.9 },
          q1: { Honeylove: 13.6, Spanx: 28.4, Skims: 20.1, Shapermint: 13.3, Maidenform: 24.6 }
        },
        {
          statement: "Feels like not wearing shapewear",
          q4: { Honeylove: 12.2, Spanx: 28.9, Skims: 27.6, Shapermint: 13.2, Maidenform: 18.1 },
          q1: { Honeylove: 12.0, Spanx: 29.3, Skims: 25.9, Shapermint: 12.4, Maidenform: 20.4 }
        },
        {
          statement: "Makes getting ready easy",
          q4: { Honeylove: 13.1, Spanx: 31.5, Skims: 23.5, Shapermint: 12.5, Maidenform: 19.4 },
          q1: { Honeylove: 12.0, Spanx: 31.5, Skims: 21.9, Shapermint: 13.9, Maidenform: 20.8 }
        },
        {
          statement: "For real women who do not fight their clothes",
          q4: { Honeylove: 13.6, Spanx: 30.1, Skims: 23.5, Shapermint: 13.4, Maidenform: 19.4 },
          q1: { Honeylove: 12.6, Spanx: 31.0, Skims: 20.7, Shapermint: 13.5, Maidenform: 22.1 }
        }
      ]
    },
    attributes: {
      title: "Brand attributes - Q4 2025 vs Q1 2026",
      source: "Q4 2025 and Q1 2026 raw XLS question 18",
      type: "row-percent",
      rows: [
        {
          statement: "Best high quality",
          q4: { Spanx: 35.3, Shapermint: 10.0, Honeylove: 9.7, Skims: 29.0, Maidenform: 15.9 },
          q1: { Spanx: 40.7, Shapermint: 10.8, Honeylove: 10.2, Skims: 21.0, Maidenform: 17.3 }
        },
        {
          statement: "Best value for money",
          q4: { Spanx: 32.3, Shapermint: 10.9, Honeylove: 10.1, Skims: 19.8, Maidenform: 26.8 },
          q1: { Spanx: 31.0, Shapermint: 13.2, Honeylove: 9.4, Skims: 17.9, Maidenform: 28.5 }
        },
        {
          statement: "Most innovative",
          q4: { Spanx: 33.1, Shapermint: 11.7, Honeylove: 10.8, Skims: 30.4, Maidenform: 14.0 },
          q1: { Spanx: 37.5, Shapermint: 12.5, Honeylove: 10.1, Skims: 26.4, Maidenform: 13.5 }
        },
        {
          statement: "Most recommended by people you trust",
          q4: { Spanx: 36.0, Shapermint: 11.6, Honeylove: 9.6, Skims: 24.7, Maidenform: 18.1 },
          q1: { Spanx: 39.7, Shapermint: 11.1, Honeylove: 9.1, Skims: 20.9, Maidenform: 19.3 }
        },
        {
          statement: "Most durable / built to last",
          q4: { Spanx: 38.4, Shapermint: 10.5, Honeylove: 9.3, Skims: 23.1, Maidenform: 18.7 },
          q1: { Spanx: 42.4, Shapermint: 10.4, Honeylove: 8.0, Skims: 19.4, Maidenform: 19.8 }
        }
      ]
    }
  },
  channels: {
    initialAwareness: {
      source: "Q1 2026 PPTX slide 5 embedded chart/table",
      quarters: ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026"],
      rows: [
        { channel: "Facebook Ad", values: [19.2, 22.3, 13.8, 17.5, 17.2] },
        { channel: "Online Search", values: [22.3, 20.2, 15.5, 19.1, 16.5] },
        { channel: "TikTok Ad", values: [16.6, 16.6, 15.0, 14.7, 12.7] },
        { channel: "Instagram Ad", values: [11.9, 14.9, 13.1, 11.4, 14.5] },
        { channel: "TV Commercial", values: [13.3, 16.1, 10.5, 13.4, null] },
        { channel: "TV Shows", values: [16.0, 12.7, 11.7, 12.2, 11.0] },
        { channel: "In-Store Dept. stores", values: [13.6, 14.1, 14.2, 13.0, 9.9] },
        { channel: "Pinterest Ad", values: [6.4, 7.9, 5.5, 4.7, 5.2] }
      ]
    },
    lastSeen: {
      source: "Q1 2026 PPTX slide 7 embedded chart/table",
      quarters: ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026"],
      rows: [
        { channel: "Amazon", values: [14.1, 13.4, 12.6, 13.7, 11.8] },
        { channel: "Online Search", values: [11.8, 11.6, 8.7, 12.0, 9.9] },
        { channel: "Facebook Ad", values: [9.2, 12.3, 7.4, 9.7, 11.8] },
        { channel: "TikTok Ad", values: [8.8, 7.9, 8.5, 8.1, 5.2] },
        { channel: "Instagram Ad", values: [6.6, 8.1, 6.3, 6.3, 7.2] },
        { channel: "TV Commercial", values: [6.4, 7.3, 5.5, 5.6, 5.2] },
        { channel: "Facebook Page", values: [2.4, 2.0, 2.1, 1.8, 4.3] },
        { channel: "Friend/WOM", values: [5.1, 5.9, 5.0, 4.9, 4.7] }
      ]
    }
  },
  shapermintSignals: [
    {
      label: "Brand uniqueness",
      source: "Q1 2026 PPTX slide 10 and raw XLS question 25",
      q4: 79.8,
      q1: 74.5,
      delta: -5.3,
      read: "Very/somewhat unique fell, while not unique rose to 25.5%."
    },
    {
      label: "Sets trends",
      source: "Q1 2026 PPTX slide 10 and raw XLS question 26",
      q4: 34.3,
      q1: 28.9,
      delta: -5.4,
      read: "Trend perception weakened quarter over quarter."
    },
    {
      label: "Good/very good value",
      source: "Q1 2026 PPTX slide 10 and raw XLS question 28",
      q4: 57.6,
      q1: 54.8,
      delta: -2.8,
      read: "Value perception softened despite a small gain on Best Value versus competitors."
    },
    {
      label: "Willing to pay more",
      source: "Q1 2026 PPTX slide 10 and raw XLS question 29",
      q4: 40.6,
      q1: 38.1,
      delta: -2.5,
      read: "Premium intent slipped, making value messaging more sensitive."
    }
  ],
  actions: [
    {
      title: "Turn comfort into a sharper memory structure",
      urgency: "High",
      proof: "Shapermint is flat at 13.8% on look/feel good but comfortable, while Spanx is 29.2% and Skims is 21.7% in Q1 2026.",
      move: "Build one repeated claim around everyday comfort plus medium compression, then force consistency across paid, retail, PDP, and CRM."
    },
    {
      title: "Stop treating awareness as only reach",
      urgency: "High",
      proof: "Unaided awareness recovered to 10% in Q1 2026, but the nearest dominant competitor is still 37%.",
      move: "Measure spend against memory lift, not just impressions. Use recurring brand cues and a single ownable phrase every quarter."
    },
    {
      title: "Use retail and Amazon as credibility bridges",
      urgency: "Medium",
      proof: "Amazon is the most consistent recent touchpoint at 11.8-14.1%; in-store discovery remains visible but softened to 9.9% in Q1 2026.",
      move: "Make retail/marketplace surfaces do brand work: the same comfort-first claim, recognizable visual cue, and proof of fit/value."
    },
    {
      title: "Rebuild value without deepening price anchoring",
      urgency: "Medium",
      proof: "Best value rose to 13.2% for Shapermint, but good/very good value fell 2.8pp and willingness to pay more fell 2.5pp.",
      move: "Lead with cost-per-wear, bundles, and quality proof rather than pure discounts."
    }
  ],
  dataNotes: [
    "Q2 2025 deck supplied exact labels for unaided awareness and exact raw XLS tables for aided awareness, equity, source, and intent.",
    "Q3 2025 unaided, aided, and equity values use the overlay/pasted tables in the Q3 PPTX, because some values differ from the raw export tables.",
    "Q4 2025 unaided awareness is not exposed as a table or label in the supplied files. It is intentionally left blank rather than inferred from an unlabeled chart point.",
    "Q4 2025 and Q1 2026 associations/attributes use the raw XLS tables that match the Q1 2026 presentation.",
    "Q1 2026 unaided awareness uses the dashboard cards visible in the Q1 2026 PPTX screenshot."
  ]
};
