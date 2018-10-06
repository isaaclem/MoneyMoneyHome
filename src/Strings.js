import LocalizedStrings from 'react-native-localization';

const strings = new LocalizedStrings({
  en: require('./locales/en.json'),
  // de: require('./locales/de.json'),
  // el: require('./locales/el.json'),
  // 'es-ES': require('./locales/es-ES.json'),
  // fi: require('./locales/fi.json'),
  // fr: require('./locales/fr.json'),
  // id: require('./locales/id.json'),
  // it: require('./locales/it.json'),
  // ja: require('./locales/ja.json'),
  // km: require('./locales/km.json'),
  // lv: require('./locales/lv.json'),
  // ms: require('./locales/ms.json'),
  // my: require('./locales/my.json'),
  // nl: require('./locales/nl.json'),
  // 'pt-BR': require('./locales/pt-BR.json'),
  // th: require('./locales/th.json'),
  // tl: require('./locales/tl.json'),
  // vi: require('./locales/vi.json'),
  //'zh-CN': require('./locales/zh-CN.json'),
  // 'zh-HK': require('./locales/zh-HK.json'),
  // 'zh-TW': require('./locales/zh-TW.json'),
});


//Below switch statement is to handle different naming convention between Android and iOS
export function switchLanguage(lang) {
  const prefixLanguageCode = lang.substr(0, 2);

  switch (lang) {
    case 'zh-CN':
    case 'zh-Hans':
    case 'zh-Hans_US':
    case 'zh_CN_#Hans':
      strings.setLanguage('zh-CN');
      break;
    case 'zh-TW':
    case 'zh-Hant':
        strings.setLanguage('zh-TW');
        break;
    case 'en':
    case 'en-US':
    case 'en-AU':
    case 'en-GB':
    case 'en-CA':
    case 'en-IN':
      strings.setLanguage('en');
      break;
    case 'fr':
    case 'fr-CA':
    case 'fr-FR':
      strings.setLanguage('fr');
      break;
    case 'id':
    case 'in':
      strings.setLanguage('id');
      break;
    case 'pt':
    case 'pt-BR':
    case 'pt-PT':
      strings.setLanguage('pt-BR');
      break;
    case 'es':
    case 'es-M':
    case 'es-419':
    case 'es-ES':
      strings.setLanguage('es-ES');
      break;
    case 'fil':
      strings.setLanguage('tl');
      break;
    default:
      strings.setLanguage(prefixLanguageCode);
      break;
  }
}


export default strings;
