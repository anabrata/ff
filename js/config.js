/**
 * ==============================================================================
 * ANAHouse - CENTRAL CONFIGURATION FILE (config.js)
 * Dedicated Free Fire Gaming Store (Local & Trusted)
 * ==============================================================================
 */

const CONFIG = {
  // Store Branding
  siteName: "ANAHouse",
  siteShortName: "ANA",
  siteTagline: "FREE FIRE STORE • PANELS & REDEEM CODES",
  siteLogo: "./assets/images/logo-rounded.png",
  currencySymbol: "₹",
  currencyCode: "INR",

  // Payment Details (EDIT DIRECTLY ON GITHUB)
  merchant: {
    name: "ANAHouse Store",
    upiId: "anahouse@upi",
    paymentQR: "./assets/images/payment-qr.svg",
    paymentNotice: "Scan using any UPI App (PhonePe, Google Pay, Paytm, BHIM)."
  },

  // WhatsApp & Support Details
  contact: {
    whatsappNumber: "919999999999",
    telegramUsername: "anahouse_ff",
    workingHours: "Night Squad Rank Push & Instant Redeem Code Delivery"
  },

  // UI Settings (LIGHT MODE IS NOW DEFAULT)
  theme: {
    defaultTheme: "light",
    enableBootScreen: true,
    bootScreenDuration: 1600,
    videoHoldDelayMs: 450
  },

  // Audio Effects (Plays MP3 / M4A on Wrong PIN or Reused Deactivated Code)
  audio: {
    errorSound: "./mp3/error.m4a",
    errorSoundFallback: "./mp3/error.mp3",
    volume: 1.0
  },

  // Google Sheets Auto-Dispenser Integration
  // Obfuscated endpoint: cannot be inspected in plain text on GitHub
  googleSheets: {
    webAppUrl: "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J5LU5tNkVZS2U3WHJXRk5fUXpieGs5Y1pBMm9FUW5hTUxNamI4NExVLU02VE9OM3FaTG5RR0tJU2hQRUlHWHo3SS9leGVj",
    // Fallback demo codes for offline preview:
    demoCodesEnabled: false,
    demoCodes: {
      "1": { pin: "11111", code: "FF-REDEEM-AIRDROP-8921" },
      "2": { pin: "22222", code: "FF-REDEEM-TOPUP80-9943" },
      "3": { pin: "33333", code: "FF-REDEEM-EVENT-5521" },
      "4": { pin: "44444", code: "FF-REDEEM-DIAMOND-7712" },
      "5": { pin: "55555", code: "FF-REDEEM-BOOYAH-3309" },
      "6": { pin: "66666", code: "FF-REDEEM-MEGAPACK-1144" },
      "7": { pin: "77777", code: "FF-REDEEM-MONTHLY-8802" },
      "8": { pin: "88888", code: "FF-REDEEM-SUPER1060-6621" }
    }
  },

  paymentInstructions: [
    "Open your UPI app (PhonePe, GPay, Paytm, BHIM).",
    "Scan the QR code or copy the UPI ID directly.",
    "Pay the exact final amount.",
    "Copy the 12-digit UTR / Reference ID from your payment receipt.",
    "Paste the UTR below and click 'SUBMIT ORDER'.",
    "Send the order slip on WhatsApp to receive your Redeem Code / service immediately!"
  ]
};

if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
