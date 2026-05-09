import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        login: 'Login',
        email: 'Email',
        password: 'Password',
        forgot: 'Forgot Password?',
        register: 'Register',
        no_account: "Don't have an account?",
        login_google: 'Sign in with Google',
        captcha_error: 'Please verify you are human',
        login_success: 'Login successful!',
        login_failed: 'Login failed!',
        reset_title: 'Reset Your Password',
        send_link: 'Send Reset Link',
        email_required: 'Email is required!',
        reset_sent: 'Reset link sent!',
        reset_failed: 'Reset failed!'
      }
    },
    ur: {
      translation: {
        login: 'لاگ ان',
        email: 'ای میل',
        password: 'پاسورڈ',
        forgot: 'پاسورڈ بھول گئے؟',
        register: 'رجسٹر',
        no_account: 'اکاؤنٹ نہیں ہے؟',
        login_google: 'گوگل سے لاگ ان',
        captcha_error: 'براہ کرم تصدیق کریں کہ آپ انسان ہیں',
        login_success: 'لاگ ان کامیاب!',
        login_failed: 'لاگ ان ناکام!',
        reset_title: 'پاسورڈ ری سیٹ کریں',
        send_link: 'ری سیٹ لنک بھیجیں',
        email_required: 'ای میل درکار ہے!',
        reset_sent: 'ری سیٹ لنک بھیج دیا گیا!',
        reset_failed: 'ری سیٹ ناکام!'
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
