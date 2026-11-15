/**
 * ==============================================================================
 * ANAHouse - PRICING CONFIGURATION & REDEEM CODE CHARGES (pricing.js)
 * ==============================================================================
 * 
 * Top-Up (Redeem Code) Pricing Formula:
 * Final Price = Original Redeem Code Amount + Extra Service Charge
 * 
 * DEFAULT EXTRA CHARGES TABLE:
 * ₹10–₹50   | ₹10
 * ₹51–₹150  | ₹20
 * ₹151–₹250 | ₹25
 * ₹251–₹400 | ₹35
 * ₹401–₹500 | ₹40
 * ₹501–₹600 | ₹45
 * ₹601–₹700 | ₹50
 * ₹701–₹800 | ₹60
 * ==============================================================================
 */

const PRICING_CONFIG = {
  currencySymbol: "₹",
  currencyCode: "INR",

  // Top-Up / Redeem Code Extra Charges Brackets
  topUpFeeBrackets: [
    { min: 10,  max: 50,  extraCharge: 10, label: "₹10–₹50" },
    { min: 51,  max: 150, extraCharge: 20, label: "₹51–₹150" },
    { min: 151, max: 250, extraCharge: 25, label: "₹151–₹250" },
    { min: 251, max: 400, extraCharge: 35, label: "₹251–₹400" },
    { min: 401, max: 500, extraCharge: 40, label: "₹401–₹500" },
    { min: 501, max: 600, extraCharge: 45, label: "₹501–₹600" },
    { min: 601, max: 700, extraCharge: 50, label: "₹601–₹700" },
    { min: 701, max: 800, extraCharge: 60, label: "₹701–₹800" }
  ],

  // Fallback if an amount is above ₹800
  fallbackAboveMaxExtraCharge: 70,

  // Free Fire Rank Pushing Fixed Local Prices
  rankPushingPrices: {
    "Heroic_to_Master": { from: "Heroic",   to: "Master", price: 150 },
    "Bronze_to_Heroic": { from: "Bronze",   to: "Heroic", price: 79 },
    "Silver_to_Heroic": { from: "Silver",   to: "Heroic", price: 69 },
    "Gold_to_Heroic":   { from: "Gold",     to: "Heroic", price: 59 },
    "Platinum_to_Heroic": { from: "Platinum", to: "Heroic", price: 29 },
    "Diamond_to_Heroic": { from: "Diamond",  to: "Heroic", price: 19 }
  }
};

const PricingEngine = {
  getTopUpExtraCharge(amount) {
    const numericAmount = Number(amount) || 0;
    const bracket = PRICING_CONFIG.topUpFeeBrackets.find(
      (b) => numericAmount >= b.min && numericAmount <= b.max
    );

    if (bracket) return bracket.extraCharge;
    if (numericAmount < 10) return 10;
    return PRICING_CONFIG.fallbackAboveMaxExtraCharge;
  },

  calculateTopUpPrice(originalPrice) {
    const orig = Math.max(0, Number(originalPrice) || 0);
    const extraCharge = this.getTopUpExtraCharge(orig);
    const finalPrice = orig + extraCharge;

    const matchedBracket = PRICING_CONFIG.topUpFeeBrackets.find(
      (b) => orig >= b.min && orig <= b.max
    );

    return {
      originalPrice: orig,
      extraCharge: extraCharge,
      finalPrice: finalPrice,
      bracketLabel: matchedBracket ? matchedBracket.label : "Standard"
    };
  },

  format(amount) {
    const num = Math.round(Number(amount) || 0);
    return `${PRICING_CONFIG.currencySymbol}${num.toLocaleString("en-IN")}`;
  }
};

if (typeof window !== "undefined") {
  window.PRICING_CONFIG = PRICING_CONFIG;
  window.PricingEngine = PricingEngine;
}
