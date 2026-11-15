# ⚡ ANAHouse - FREE FIRE STORE (PANELS, TOP-UP BOXES & RANK PUSH)

A fast, mobile-friendly local Free Fire store built with pure HTML5, CSS3, and vanilla JavaScript. 100% compatible with **GitHub Pages** with zero backend installation or monthly fees.

---

## 🎮 THE 4 SECTIONS

1. **⚡ FREE FIRE PANELS**: Exactly 2 tested sensitivity calibration and 120 FPS high refresh tools with instant video demo previews.
2. **💎 TOP UP (BOX FORM)**: The 8 tiered pricing boxes derived directly from your official chart:
   - **₹10 – ₹50** (+₹10 Extra Charge)
   - **₹51 – ₹150** (+₹20 Extra Charge) *(Highlighted: ₹80 Top-Up = ₹100)*
   - **₹151 – ₹250** (+₹25 Extra Charge)
   - **₹251 – ₹400** (+₹35 Extra Charge)
   - **₹401 – ₹500** (+₹40 Extra Charge)
   - **₹501 – ₹600** (+₹45 Extra Charge)
   - **₹601 – ₹700** (+₹50 Extra Charge)
   - **₹701 – ₹800** (+₹60 Extra Charge)  
   *Each box has a clean BUY button that connects directly to you on WhatsApp.*
3. **🏆 RANK PUSHER**: Night squad duo/squad rank pushing with genuine Free Fire rank graphics and animations:
   - **Requirement:** Play with the seller at night in squad or duo.
   - **Timeline:** Takes 1 to 2 days (or up to 3 days depending on the rank gap).
   - **Prices:** Heroic to Master (₹150), Bronze to Heroic (₹79), Silver to Heroic (₹69), Gold to Heroic (₹59), Platinum to Heroic (₹29), Diamond to Heroic (₹19).
   - *Display only — no booking button so customers talk with you directly.*
4. **🆔 FREE FIRE IDS**: Verified local Free Fire accounts (Level, Evo Guns, Bundles, Safe Bind) with `AVAILABLE` and `VERIFIED SOLD` statuses. *Display only — direct contact with seller.*

---

## 🛠️ HOW TO EDIT STORE DETAILS FROM GITHUB

You do not need to touch any HTML or CSS files.

### 1. Update Your WhatsApp Number
Open [`js/config.js`](file:///C:/Users/123/.gemini/antigravity/scratch/gaming-marketplace/js/config.js):
```javascript
contact: {
  // Put your WhatsApp number with country code (e.g. 919876543210 with NO spaces)
  whatsappNumber: "919876543210"
}
```

### 2. Add / Edit Products or Prices
Open [`js/products.js`](file:///C:/Users/123/.gemini/antigravity/scratch/gaming-marketplace/js/products.js):
- Edit `panelProducts` to change panels or video links (2 panels).
- Edit `topUpBoxes` to adjust range prices or charges.
- Edit `rankPusherServices` to update rank prices.
- Edit `gamingIdProducts` and change `status: "SOLD"` when an account is sold.

### 3. Connect Google Sheets 5-Digit Redeem Code Dispenser
When a customer pays you cash locally, they click **BUY** on their specific Top-Up Box, enter the **5-digit PIN** you give them, and their **Free Fire Redeem Code** is automatically revealed with a holographic voucher animation!

**How to set up Google Sheets (2 minutes):**
1. Open Google Sheets ([sheets.new](https://sheets.new)).
2. Click **Extensions** > **Apps Script**.
3. Open [`google-sheets-redeem-script.js`](file:///C:/Users/123/.gemini/antigravity/scratch/gaming-marketplace/google-sheets-redeem-script.js), copy the entire code, and paste it into Google Apps Script.
4. From the function dropdown at the top, select `setupSheet` and click **Run** (this auto-creates your columns: `Box`, `PIN`, `RedeemCode`, `Status`, `RedeemedAt`).
5. Click **Deploy** > **New deployment** > Select **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, authorize access, and copy the **Web app URL**.
7. Paste this URL into [`js/config.js`](file:///C:/Users/123/.gemini/antigravity/scratch/gaming-marketplace/js/config.js) under `googleSheets.webAppUrl` (or give it to Antigravity to obfuscate/hide it so no one can inspect it).

---

## 🚀 HOW TO PUBLISH ON GITHUB PAGES

1. Upload the files to your GitHub repository.
2. In your repo, click **Settings** > **Pages**.
3. Under **Branch**, select **`main`** (or `master`) and **/ (root)**.
4. Click **Save**.
5. Your website will be live in 1 minute!
