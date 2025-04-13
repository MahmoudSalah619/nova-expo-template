/* eslint-disable */
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

const dayjsArabicLocalization = {
  name: 'ar',
  months,
  monthsShort: months,
  weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
  weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
  weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
  weekStart: 6, // Saturday is the first day of the week
  yearStart: 12, // The week that contains Jan 12th is the first week of the year
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "D/\u200FM/\u200FYYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  meridiem: (hour: number) => hour < 12 ? "ص" : "م",
  relativeTime: {
    future: "بعد %s",
    past: "منذ %s",
    s: "ثانية واحدة",
    m: "دقيقة واحدة",
    mm: "%d دقائق",
    h: "ساعة واحدة",
    hh: "%d ساعات",
    d: "يوم واحد",
    dd: "%d أيام",
    M: "شهر واحد",
    MM: "%d أشهر",
    y: "عام واحد",
    yy: "%d أعوام"
  }
};

export default dayjsArabicLocalization;