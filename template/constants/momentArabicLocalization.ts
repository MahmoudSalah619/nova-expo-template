/* eslint-disable */
const symbolMap = {
  1: "١",
  2: "٢",
  3: "٣",
  4: "٤",
  5: "٥",
  6: "٦",
  7: "٧",
  8: "٨",
  9: "٩",
  0: "٠",
};
const numberMap = {
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
  "٠": "0",
};
const pluralForm = function (n: number) {
  return n === 0
    ? 0
    : n === 1
      ? 1
      : n === 2
        ? 2
        : n % 100 >= 3 && n % 100 <= 10
          ? 3
          : n % 100 >= 11
            ? 4
            : 5;
};
const plurals = {
  s: [
    "أقل من ثانية",
    "ثانية واحدة",
    ["ثانيتان", "ثانيتين"],
    "%d ثوان",
    "%d ثانية",
    "%d ثانية",
  ],
  m: [
    "أقل من دقيقة",
    "دقيقة واحدة",
    ["دقيقتان", "دقيقتين"],
    "%d دقائق",
    "%d دقيقة",
    "%d دقيقة",
  ],
  h: [
    "أقل من ساعة",
    "ساعة واحدة",
    ["ساعتان", "ساعتين"],
    "%d ساعات",
    "%d ساعة",
    "%d ساعة",
  ],
  d: [
    "أقل من يوم",
    "يوم واحد",
    ["يومان", "يومين"],
    "%d أيام",
    "%d يومًا",
    "%d يوم",
  ],
  M: [
    "أقل من شهر",
    "شهر واحد",
    ["شهران", "شهرين"],
    "%d أشهر",
    "%d شهرا",
    "%d شهر",
  ],
  y: [
    "أقل من عام",
    "عام واحد",
    ["عامان", "عامين"],
    "%d أعوام",
    "%d عامًا",
    "%d عام",
  ],
};
const pluralize = function (u: string) {
  return function (number: number, withoutSuffix: boolean) {
    const f = pluralForm(number);
    // @ts-ignore
    let str = plurals[u][pluralForm(number)];
    if (f === 2) {
      str = str[withoutSuffix ? 0 : 1];
    }
    return str.replace(/%d/i, number);
  };
};
const months = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const momentArabicLocalization = {
  months,
  monthsShort: months,
  weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
  weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
  weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "D/\u200FM/\u200FYYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  meridiemParse: /ص|م/,
  isPM(input: string) {
    return input === "م";
  },
  meridiem(hour: number, minute: number) {
    if (hour < 12) {
      return "ص";
    }
    return "م";
  },
  calendar: {
    sameDay: "[اليوم عند الساعة] LT",
    nextDay: "[غدًا عند الساعة] LT",
    nextWeek: "dddd [عند الساعة] LT",
    lastDay: "[أمس عند الساعة] LT",
    lastWeek: "dddd [عند الساعة] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "بعد %s",
    past: "منذ %s",
    s: pluralize("s"),
    ss: pluralize("s"),
    m: pluralize("m"),
    mm: pluralize("m"),
    h: pluralize("h"),
    hh: pluralize("h"),
    d: pluralize("d"),
    dd: pluralize("d"),
    M: pluralize("M"),
    MM: pluralize("M"),
    y: pluralize("y"),
    yy: pluralize("y"),
  },
  //   preparse(string) {
  //     return string
  //       .replace(/[١٢٣٤٥٦٧٨٩٠]/g, (match) => numberMap[match])
  //       .replace(/،/g, ',');
  //   },
  //   postformat(string) {
  //     return string
  //       .replace(/\d/g, (match) => symbolMap[match])
  //       .replace(/,/g, '،');
  //   },
  week: {
    dow: 6, // Saturday is the first day of the week.
    doy: 12, // The week that contains Jan 12th is the first week of the year.
  },
};

export default momentArabicLocalization;
