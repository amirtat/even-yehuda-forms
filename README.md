# טפסי מלגות דיגיטליים — מועצת אבן יהודה

## תוכן העניינים
1. [סקירה כללית](#סקירה-כללית)
2. [מבנה הקבצים](#מבנה-הקבצים)
3. [הגדרת Google Drive (חובה)](#הגדרת-google-drive)
4. [הטמעה באתר המועצה](#הטמעה-באתר-המועצה)
5. [שינויים עתידיים](#שינויים-עתידיים)
6. [פתרון בעיות](#פתרון-בעיות)

---

## סקירה כללית

שני טפסי אינטרנט בעברית (RTL), ניתנים להטמעה בכל אתר:

| קובץ | תיאור |
|------|--------|
| `scholarship-form.html` | טופס בקשת מלגה (לימודים + הצטיינות) |
| `volunteer-report.html` | טופס דיווח שעות התנדבות |

**תכונות עיקריות:**
- ✅ עברית מלאה (RTL), גופן Heebo
- ✅ עיצוב תואם לאתר מועצת אבן יהודה (כחול #216FF3)
- ✅ שנה אקדמית דינמית — מחושבת אוטומטית (ספטמבר–אוגוסט)
- ✅ חתימה דיגיטלית (Canvas)
- ✅ העלאת מסמכים
- ✅ שמירה אוטומטית ל-Google Drive (PDF + קבצים)
- ✅ ולידציה מלאה עם סימון שדות חובה (*)
- ✅ Responsive — מותאם למובייל

---

## מבנה הקבצים

```
even-yehuda-forms/
├── scholarship-form.html          # טופס בקשת מלגה
├── volunteer-report.html          # טופס דיווח שעות
├── assets/
│   ├── logo-mifal-hapais.png      # לוגו מפעל הפיס
│   └── google-drive-config.js     # ← יש לערוך קובץ זה!
└── README.md
```

---

## הגדרת Google Drive

### שלב 1: יצירת Google Cloud Project

1. פתחו את [Google Cloud Console](https://console.cloud.google.com/)
2. לחצו על **"Select a project"** → **"New Project"**
3. שם הפרויקט: `Even Yehuda Forms` (או כל שם)
4. לחצו **"Create"**

### שלב 2: הפעלת Google Drive API

1. בתפריט צד → **"APIs & Services"** → **"Enable APIs and Services"**
2. חפשו **"Google Drive API"** → לחצו **"Enable"**

### שלב 3: יצירת OAuth 2.0 Client ID

1. **"APIs & Services"** → **"Credentials"**
2. לחצו **"+ Create Credentials"** → **"OAuth client ID"**
3. אם נדרש — **"Configure Consent Screen"**:
   - User Type: **External**
   - App name: `מלגות אבן יהודה`
   - Support email: כתובת האימייל שלכם
   - לחצו **"Save and Continue"** (ניתן לדלג על שאר השדות)
4. חזרו ל-Credentials → **"Create Credentials"** → **"OAuth client ID"**:
   - Application type: **Web application**
   - Name: `Even Yehuda Forms`
   - **Authorized JavaScript origins** — הוסיפו:
     - `https://your-domain.co.il` (דומיין האתר שלכם)
     - `http://localhost` (לבדיקה מקומית)
     - `http://localhost:8080` (לבדיקה מקומית)
   - לחצו **"Create"**
5. **שימרו את ה-Client ID** (נראה כך: `1234567890-abc.apps.googleusercontent.com`)

### שלב 4: יצירת API Key

1. **"APIs & Services"** → **"Credentials"** → **"+ Create Credentials"** → **"API Key"**
2. שימרו את ה-API Key
3. **מומלץ:** לחצו **"Restrict Key"** ובחרו `Google Drive API`

### שלב 5: עדכון קובץ ההגדרות

פתחו את הקובץ `assets/google-drive-config.js` ועדכנו:

```javascript
const GOOGLE_DRIVE_CONFIG = {
  CLIENT_ID: '1234567890-abc.apps.googleusercontent.com',  // ← Client ID מהשלב הקודם
  API_KEY: 'AIzaSy...',                                      // ← API Key מהשלב הקודם
  SCOPES: 'https://www.googleapis.com/auth/drive.file',
  ROOT_FOLDER_ID: '',       // ← השאירו ריק OR הכניסו ID של תיקייה קיימת ב-Drive
  ROOT_FOLDER_NAME: 'מלגות' // שם התיקייה הראשית ב-Drive
};
```

**איפה מוצאים את ROOT_FOLDER_ID?**
- פתחו את Google Drive
- נווטו לתיקייה הרצויה
- ה-ID מופיע ב-URL: `https://drive.google.com/drive/folders/**{FOLDER_ID}**`

### שלב 6: הרשאות לאימות

בשימוש ראשון, המשתמש יתבקש לאשר גישה ל-Google Drive. זהו תהליך חד-פעמי לכל דפדפן.

**הגדרת מוקדמת (Production):**
ב-OAuth Consent Screen → **"Publish App"** כדי לאפשר לכל גוגל-אקאונט להשתמש בטפסים.

---

## הטמעה באתר המועצה

### אפשרות 1: iframe (הקלה ביותר)

הוסיפו את הקוד הבא בכל עמוד רלוונטי באתר:

**טופס בקשת מלגה:**
```html
<iframe
  src="https://your-domain.co.il/forms/scholarship-form.html"
  width="100%"
  height="1200"
  style="border: none; min-height: 900px;"
  title="טופס בקשת מלגה — מועצת אבן יהודה"
  allow="camera; microphone"
></iframe>
```

**טופס דיווח התנדבות:**
```html
<iframe
  src="https://your-domain.co.il/forms/volunteer-report.html"
  width="100%"
  height="900"
  style="border: none; min-height: 700px;"
  title="דוח שעות התנדבות — מועצת אבן יהודה"
></iframe>
```

**הערה:** גודל ה-iframe ישתנה דינמית — מומלץ להוסיף CSS:
```css
iframe { min-height: 800px; }
```

### אפשרות 2: קישור ישיר

העלו את התיקייה `even-yehuda-forms/` לשרת האתר ותנו לינק ישיר:
```
https://www.even-yehuda.muni.il/forms/scholarship-form.html
https://www.even-yehuda.muni.il/forms/volunteer-report.html
```

### אפשרות 3: Embed בתוך CMS (WordPress וכו')

השתמשו ב-plugin כגון **"Advanced iFrame"** או **"Iframe"** ב-WordPress,
ו-embed את הכתובות מאפשרות 2.

---

## מבנה תיקיות ב-Google Drive

לאחר שהטפסים ימולאו, הקבצים יישמרו כך:

```
מלגות/
├── 2025-6/                          # שנה אקדמית 2025-2026
│   ├── לימודים/
│   │   ├── כהן_דוד/
│   │   │   ├── מלגת_לימודים_כהן_דוד_2025-6.pdf
│   │   │   ├── תעודת_זהות_כהן_דוד.jpg
│   │   │   ├── תעודת_סטודנט_כהן_דוד.pdf
│   │   │   └── דוח_התנדבות_כהן_דוד_2025-6.pdf  (מהטופס השני)
│   │   └── לוי_שרה/
│   │       └── ...
│   └── מצטיינים/
│       ├── גולן_יוסי/
│       │   ├── מלגת_הצטיינות_גולן_יוסי_2025-6.pdf
│       │   └── מכתב_התאחדות_ספורט_גולן_יוסי.pdf
│       └── ...
└── 2026-7/                          # שנה אקדמית 2026-2027
    └── ...
```

---

## שינויים עתידיים

### שינוי אפשרויות ההתנדבות

בקובץ `scholarship-form.html`, חפשו את הקטע המתחיל ב:
```html
<!-- SECTION 4: VOLUNTEER (studies only) -->
```
ושנו/הוסיפו `<label class="volunteer-option">` לפי הצורך.

### שינוי רשימת המסמכים

חפשו את הקטע `<!-- SECTION 6: DOCUMENTS -->` ועדכנו את הטבלאות.

### שינוי שנה אקדמית (לוגיקה)

הפונקציה `getAcademicYear()` קיימת בשני הקבצים:
```javascript
function getAcademicYear() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1=ינואר
  const year = now.getFullYear();
  const startYear = month >= 9 ? year : year - 1;
  // ...
}
```
- **ספטמבר (חודש 9) ומעלה** → שנה נוכחית עד הבאה (2026-2027)
- **לפני ספטמבר** → שנה קודמת עד הנוכחית (2025-2026)

---

## פתרון בעיות

### "Popup blocked" / לא מופיעה חלון הרשאת Google

**פתרון:** ודאו שהגדרתם את דומיין האתר ב-**Authorized JavaScript Origins** בהגדרות OAuth.

### הקבצים לא נשמרים ל-Drive

**בדוק:**
1. שה-`CLIENT_ID` ו-`API_KEY` נכונים בקובץ `google-drive-config.js`
2. שה-Drive API מופעל ב-Google Cloud Console
3. פתחו את Developer Tools (F12) → Console — חפשו הודעות שגיאה אדומות

### "This app isn't verified" (אזהרה מגוגל)

זוהי אזהרה רגילה עד שהאפליקציה תאושר ע"י גוגל. לצורכי שימוש פנימי:
- לחצו **"Advanced"** → **"Go to [App Name] (unsafe)"**
- לצורכי שימוש ציבורי — פנו ל-Google Workspace Marketplace verification.

### הטופס לא מוצג כהלכה ב-iframe

הוסיפו ל-CSS של האתר:
```css
iframe[title*="טופס"] {
  width: 100%;
  min-height: 1000px;
  border: none;
  display: block;
}
```

### הגופן לא נטען

הגופן Heebo נטען מ-Google Fonts — נדרש חיבור אינטרנט.
לסביבה ללא אינטרנט, ניתן להוריד ולהוסיף locally:
```css
@font-face {
  font-family: 'Heebo';
  src: url('assets/fonts/Heebo.woff2');
}
```

---

## תמיכה

לשאלות ובעיות, פנו לצוות הטכנולוגיה של המועצה המקומית אבן יהודה.
