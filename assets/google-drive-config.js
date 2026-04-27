/**
 * הגדרות Google Drive
 * יש להחליף את הערכים הבאים לאחר הגדרת Google Cloud Project
 * ראו הוראות מפורטות ב-README.md
 */
const GOOGLE_DRIVE_CONFIG = {
  // Client ID מ-Google Cloud Console
  // https://console.cloud.google.com/apis/credentials
  CLIENT_ID: '987969916360-ltp1ptg12ldcrh15pvm6oijhca6odtfm.apps.googleusercontent.com',
                                                          
  // API Key מ-Google Cloud Console (לגישה ל-Drive API)
  API_KEY: 'AIzaSyD7Zn97PVzLEmeJcWWO7NsF6WMD0K5ZKZg',

  // Scopes נדרשים
  SCOPES: 'https://www.googleapis.com/auth/drive.file',

  // מזהה תיקיית השורש ב-Drive (השאירו ריק ליצירת תיקיית שורש חדשה)
  // אם ברצונכם לשמור תחת תיקייה קיימת, הכניסו את ה-ID שלה כאן
  ROOT_FOLDER_ID: '',

  // שם תיקיית השורש
  ROOT_FOLDER_NAME: 'מלגות'
};