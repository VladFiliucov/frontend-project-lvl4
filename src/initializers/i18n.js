import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: 'ru',
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          siteName: 'Chat',
          signup: 'Sign up',
          signout: 'Sign out',
          login: 'Sign in',
          incorrectCredentials: 'Incorrect username or password',
          dontHaveAccount: "Don't have an account? - ",
          signin: {
            required: 'This field is required',
          },
        },
      },
      ru: {
        translation: {
          siteName: 'Чат',
          signup: 'Зерегестрироваться',
          signout: 'Выйти',
          login: 'Войти',
          incorrectCredentials: 'Неверные имя пользователя или пароль',
          dontHaveAccount: 'Нет аккаунта? - ',
          signin: {
            required: 'Обязательное поле',
          },
        },
      },
    },
  });

export default i18n;
