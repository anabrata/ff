/**
 * ==============================================================================
 * ANAHouse - FREE FIRE PRODUCT CATALOG (products.js)
 * Dedicated Exclusively to Free Fire (Local & Trusted)
 * ==============================================================================
 */

const PRODUCTS_CONFIG = {
  // ============================================================================
  // 1. FREE FIRE PANEL SECTION
  // ============================================================================
  panelProducts: [
    {
      id: "panel_ff_aim_ultra",
      title: "GOLDEN HIPHOP AND HIPHOP",
      badge: "AURA",
      image: "https://i.postimg.cc/ydhX2f2L/IMG-20261116-000613.jpg",
      video: "https://drive.google.com/file/d/1P3hPIpCOijTiDvJFpe9in_hK_jLYRO--/view?usp=sharing",
      description: "[Play without any lag or id ban issue(in OB 55).",
      features: [
        "GOLDEN HIPHOP & HIPHOP",
        "Play directelly",
        "MOST Dangerous",
        "Supports all Matches"
      ],
      price: 80,
      originalPrice: 100,
      duration: "RED",
      available: true
    },
    {
      id: "panel_ff_aimultra",
      title: "SAKURA RED ARTICS BUNNY",
      badge: "AURA",
      image: "https://i.postimg.cc/zBJVG5d8/Screenshot-2026-11-16-00-57-41-12-c28519d624689b8d548e2809af584b0c.jpg",
      video: "https://drive.google.com/file/d/13yj56ptfiklbr_FDsk5sOjgHeGl7erDk/view?usp=sharing",
      description: "[Play without any lag or id ban issue(OB 55).",
      features: [
        "SAKURA RED ARTICS BUNNY",
        "Play directelly",
        "MOST Dangerous",
        "Supports all Matches"
      ],
      price: 80,
      originalPrice: 100,
      duration: "SAKURA MIX",
      available: true
    },
    {
      id: "panel_ff_location_90",
      title: "Location (90%)",
      badge: "HACKER..",
      image: "https://i.postimg.cc/Y967Nhpp/2.jpg",
      video: "https://drive.google.com/file/d/18VHr1T5lxQwlNIrElzVBS7duzPM7n_v8/view?usp=sharing",
      description: "Stabilizes frame rates and eliminates stutter during close combat scrims and clash squad matches.",
      features: [
        "Get HP of Enemy",
        "Thermal Stutter Fix for Android",
        "RAM Buffer Clean for Low-End Phones",
        "Simple One-Click Activation"
      ],
      price: 20,
      originalPrice: 50,
      duration: "HP and Location",
      available: true
    },
    {
      id: "panel_ff_location_simple",
      title: "Location",
      badge: "SIMPLE",
      image: "https://i.postimg.cc/zBCNwVJ5/3.jpg",
      video: "https://drive.google.com/file/d/1Re6qpFNjDywKnZkOxg9wxvKDwHJxnZve/view?usp=sharing",
      description: "Stabilizes frame rates and eliminates stutter during close combat scrims and clash squad matches.",
      features: [
        "Location + Invisible Gloowall",
        "Low risk of ID BAN!",
        "RAM Buffer Clean for Low-End Phones",
        "Simple One-Click Activation"
      ],
      price: 40,
      originalPrice: 80,
      duration: "SAFE",
      available: true
    }
  ],

  // ============================================================================
  // 2. TOP UP SECTION (8 Box Cards from the Exact Chart - Linked to Google Sheets)
  // Each Box corresponds to Box 1 to 8 in Google Sheets
  // ============================================================================
  topUpBoxes: [
    {
      id: "topup_10_49",
      boxNumber: 1,
      name: "BOX 1",
      range: "₹10 – ₹49",
      extraCharge: 10,
      popular: false,
      tag: "AIRDROP PACK"
    },
    {
      id: "topup_51_149",
      boxNumber: 2,
      name: "BOX 2",
      range: "₹51 – ₹149",
      extraCharge: 20,
      popular: true, // Specifically highlighted (₹80 code = ₹100)
      tag: "POPULAR (₹80 TOP-UP)"
    },
    {
      id: "topup_150_249",
      boxNumber: 3,
      name: "BOX 3",
      range: "₹150 – ₹249",
      extraCharge: 25,
      popular: false,
      tag: "EVENT PACK"
    },
    {
      id: "topup_250_399",
      boxNumber: 4,
      name: "BOX 4",
      range: "₹250 – ₹399",
      extraCharge: 35,
      popular: false,
      tag: "DIAMOND PACK"
    },
    {
      id: "topup_399_499",
      boxNumber: 5,
      name: "BOX 5",
      range: "₹399 – ₹499",
      extraCharge: 40,
      popular: false,
      tag: "BOOYAH PASS"
    },
    {
      id: "topup_500_600",
      boxNumber: 6,
      name: "BOX 6",
      range: "₹500 – ₹600",
      extraCharge: 60,
      popular: false,
      tag: "MEGA PACK"
    },
    {
      id: "topup_601_700",
      boxNumber: 7,
      name: "BOX 7",
      range: "₹601 – ₹700",
      extraCharge: 70,
      popular: false,
      tag: "MONTHLY PACK"
    },
    {
      id: "topup_701_800",
      boxNumber: 8,
      name: "BOX 8",
      range: "₹701 – ₹800",
      extraCharge: 80,
      popular: true,
      tag: "SUPER 1060 PACK"
    }
  ],

  // ============================================================================
  // 3. FREE FIRE RANK PUSHING SECTION (NO BOOK BUTTON - DISPLAY ONLY)
  // Original Free Fire Rank Badges & Exact Local Prices
  // ============================================================================
  rankPusherServices: [
    {
      id: "rank_heroic_master",
      title: "Heroic to Master Push",
      fromRank: "Heroic",
      toRank: "Master",
      fromIcon: "https://images.seeklogo.com/logo-png/55/1/heroico-free-fire-logo-png_seeklogo-550227.png",
      toIcon: "https://images.seeklogo.com/logo-png/35/2/mestre-free-fire-logo-png_seeklogo-359652.png",
      fallbackFrom: "./assets/icons/rank-heroic.svg",
      fallbackTo: "./assets/icons/rank-master.svg",
      price: 150,
      badge: "MASTER TIER",
      timingNotice: "Play with me at night in duo/squad",
      duration: "1 to 2 Days",
      description: "Push from Heroic to Master rank. Play with me at night in duo/squad until we hit Master."
    },
    {
      id: "rank_bronze_heroic",
      title: "Bronze to Heroic Push",
      fromRank: "Bronze",
      toRank: "Heroic",
      fromIcon: "./assets/icons/rank-bronze.svg",
      toIcon: "https://images.seeklogo.com/logo-png/55/1/heroico-free-fire-logo-png_seeklogo-550227.png",
      fallbackFrom: "./assets/icons/rank-bronze.svg",
      fallbackTo: "./assets/icons/rank-heroic.svg",
      price: 79,
      badge: "MOST POPULAR",
      timingNotice: "Play with me at night in duo/squad",
      duration: "2 to 3 Days (Large Rank Gap)",
      description: "Full push from Bronze to Heroic rank. Play with me in night sessions over 2 to 3 days."
    },
    {
      id: "rank_silver_heroic",
      title: "Silver to Heroic Push",
      fromRank: "Silver",
      toRank: "Heroic",
      fromIcon: "./assets/icons/rank-silver.svg",
      toIcon: "https://images.seeklogo.com/logo-png/55/1/heroico-free-fire-logo-png_seeklogo-550227.png",
      fallbackFrom: "./assets/icons/rank-silver.svg",
      fallbackTo: "./assets/icons/rank-heroic.svg",
      price: 69,
      badge: "FAST TRACK",
      timingNotice: "Play with me at night in duo/squad",
      duration: "2 Days",
      description: "Silver to Heroic push. Join my squad at night for consistent plus points and win streaks."
    },
    {
      id: "rank_gold_heroic",
      title: "Gold to Heroic Push",
      fromRank: "Gold",
      toRank: "Heroic",
      fromIcon: "./assets/icons/rank-gold.svg",
      toIcon: "https://images.seeklogo.com/logo-png/55/1/heroico-free-fire-logo-png_seeklogo-550227.png",
      fallbackFrom: "./assets/icons/rank-gold.svg",
      fallbackTo: "./assets/icons/rank-heroic.svg",
      price: 59,
      badge: "RECOMMENDED",
      timingNotice: "Play with me at night in duo/squad",
      duration: "1 to 2 Days",
      description: "Gold to Heroic push. Duo or squad night sessions with me to reach Heroic quickly."
    },
    {
      id: "rank_platinum_heroic",
      title: "Platinum to Heroic Push",
      fromRank: "Platinum",
      toRank: "Heroic",
      fromIcon: "./assets/icons/rank-platinum.svg",
      toIcon: "https://images.seeklogo.com/logo-png/55/1/heroico-free-fire-logo-png_seeklogo-550227.png",
      fallbackFrom: "./assets/icons/rank-platinum.svg",
      fallbackTo: "./assets/icons/rank-heroic.svg",
      price: 29,
      badge: "QUICK PUSH",
      timingNotice: "Play with me at night in duo/squad",
      duration: "1 Day (Night Session)",
      description: "Quick Platinum to Heroic carry. Finish the remaining stars in one night."
    },
    {
      id: "rank_diamond_heroic",
      title: "Diamond to Heroic Push",
      fromRank: "Diamond",
      toRank: "Heroic",
      fromIcon: "./assets/icons/rank-diamond.svg",
      toIcon: "https://images.seeklogo.com/logo-png/55/1/heroico-free-fire-logo-png_seeklogo-550227.png",
      fallbackFrom: "./assets/icons/rank-diamond.svg",
      fallbackTo: "./assets/icons/rank-heroic.svg",
      price: 19,
      badge: "FINAL FINISH",
      timingNotice: "Play with me at night in duo/squad",
      duration: "Same Night (1-2 Hours)",
      description: "Final push from Diamond 4 to Heroic. Quick night session to get your Heroic badge today."
    }
  ],

  // Free Fire Rank Progression Badges
  rankLevels: [
    { name: "Bronze",   icon: "./assets/icons/rank-bronze.svg" },
    { name: "Silver",   icon: "./assets/icons/rank-silver.svg" },
    { name: "Gold",     icon: "./assets/icons/rank-gold.svg" },
    { name: "Platinum", icon: "./assets/icons/rank-platinum.svg" },
    { name: "Diamond",  icon: "./assets/icons/rank-diamond.svg" },
    { name: "Heroic",   icon: "https://images.seeklogo.com/logo-png/55/1/heroico-free-fire-logo-png_seeklogo-550227.png", fallback: "./assets/icons/rank-heroic.svg" },
    { name: "Master",   icon: "https://images.seeklogo.com/logo-png/35/2/mestre-free-fire-logo-png_seeklogo-359652.png", fallback: "./assets/icons/rank-master.svg" }
  ],

  // ============================================================================
  // 4. FREE FIRE ID SELLING SECTION (SAFELY EMPTIED - PREVENTS JS CRASHES)
  // ============================================================================
  gamingIdProducts: []
};

if (typeof window !== "undefined") {
  window.PRODUCTS_CONFIG = PRODUCTS_CONFIG;
}
