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
    debug: false,
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
          signupPage: {
            headline: 'Registration',
            form: {
              cta: 'Sign up',
              fields: {
                username: 'Username',
                password: 'Password',
                passwordConfirmation: 'Password confirmation',
              },
              errors: {
                required: 'Required field',
                passwordMatch: 'Passwords must match',
                usernameLength: 'From 3 to 20 characters',
                passwordLength: 'Minimum 6 characters',
                userExists: 'Username already taken',
              },
            },
          },
          chatPage: {
            headline: 'Channels',
            messages: 'Messages',
            form: {
              title: 'Add new channel',
              actions: {
                cancel: 'Cancel',
                submit: 'Add',
              },
              errors: {
                required: 'Required field',
                channelExists: 'Must be uniq',
              },
            },
            messageForm: {
              errors: {
                required: 'Required field',
              },
              actions: {
                submit: 'Send',
              },
            },
          },
        },
      },
      ru: {
        translation: {
          siteName: 'Hexlet Chat',
          signup: 'Зерегестрироваться',
          signout: 'Выйти',
          login: 'Войти',
          incorrectCredentials: 'Неверные имя пользователя или пароль',
          dontHaveAccount: 'Нет аккаунта? - ',
          signin: {
            required: 'Обязательное поле',
          },
          signupPage: {
            headline: 'Регистрация',
            form: {
              cta: 'Зерегестрироваться',
              fields: {
                username: 'Ваш ник',
                password: 'Пароль',
                passwordConfirmation: 'Подтвердите пароль',
              },
              errors: {
                required: 'Обязательное поле',
                passwordMatch: 'Пароли должны совпадать',
                usernameLength: 'От 3 до 20 символов',
                passwordLength: 'Не менее 6 символов',
                userExists: 'Такой пользователь уже существует',
              },
            },
          },
          chatPage: {
            headline: 'Каналы',
            messages: 'Сообщения',
            form: {
              title: 'Добавить канал',
              actions: {
                cancel: 'Отменить',
                submit: 'Отправить',
              },
              errors: {
                required: 'Обязательное поле',
                channelExists: 'Должно быть уникальным',
              },
            },
            messageForm: {
              errors: {
                required: 'Обязательное поле',
              },
              actions: {
                submit: 'Отправить',
              },
            },
          },
        },
      },
    },
  });

export default i18n;
