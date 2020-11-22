import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { randomInt } from 'crypto';

const fetch = require('node-fetch');

dayjs.locale('id');

const thisExactMoment = dayjs();
const today = thisExactMoment.day();
const todayInDate = thisExactMoment.toDate();
const isWeekend = today === 0 || today === 6;
const momentsLater = thisExactMoment.add(randomInt(4, 17), 'minute').add(randomInt(1, 59), 'second').add(randomInt(1, 999), 'millisecond')
  .toDate();

const IDENTITY = {
  name: 'Mohammad Fahrul Alwan',
  npk: 'OUT1202',
  phoneNumber: '081289824453',
  altPhoneNumber: '081212439841',
};

function parseCookies(response: string[]): Map<string, string> {
  const cookieMap = new Map();
  response.forEach((entry) => {
    const parts = entry.split(';');
    const cookiePart = parts[0];
    const cookieName = cookiePart.split('=')[0];
    cookieMap.set(cookieName, cookiePart);
  });
  return cookieMap;
}

(async () => {
  try {
    // OPEN WEBSITE JPS HEALTH
    const JPSHealthWebsite = await fetch('https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAPES4BBUMUdJNjZHWkI0MUhKR0dENEJVRU1GN1IzNC4u', {
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        'sec-ch-ua': '"Google Chrome";v="87", "\\"Not;A\\Brand";v="99", "Chromium";v="87"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
    });
    const [JPSHealthText] = await Promise.all([JPSHealthWebsite.headers.raw()['set-cookie']]);
    const parsedCookies = parseCookies(JPSHealthText);

    /* const [fifGroupFormResponse, JPSHealthResponse] = */await Promise.all([
      // submit form fifgroup health survey
      fetch('http://fifgroup-form.fifgroup.co.id:5000/fifgrouphealthsurvey', {
        headers: {
          accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
          'cache-control': 'max-age=0',
          'content-type': 'application/x-www-form-urlencoded',
          'upgrade-insecure-requests': '1',
          cookie: 'session=eyJjc3JmX3Rva2VuIjp7IiBiIjoiTW1Ka1kyUXhNR1UxWkRsaFpEaG1aRFl4T1Rjd1kyRmhOVGt6T1dRNVpUazBNekV3WldNM1l3PT0ifX0.X7FjVg.L75LkBbKfX5XHwE8tvSuM-Wj7VE',
        },
        referrer: 'http://fifgroup-form.fifgroup.co.id:5000/fifgrouphealthsurvey',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: `kehadiran=${isWeekend ? 'Libur%2C+sesuai+ketentuan+%28tanggal+merah%2C+sabtu+bagi+HO%29' : 'Kerja+Dirumah'}&statkar=Head+Office&npk=${IDENTITY.npk}&nama=${IDENTITY.name.toUpperCase().replace(' ', '+')}&koncov=tidak&suhuself=%3C37.3+C&kondisi=Sehat&zona=Tidak&zonaya=&koncovfam=tidak&kondisifam=Sehat&zonafam=Tidak&txtzonayafam=&accept=Ya`,
        method: 'POST',
        mode: 'cors',
      }),
      // Submit form JPS Health
      fetch("https://forms.office.com/formapi/api/9188040d-6c67-4c5b-b112-36a304b66dad/users/00000000-0000-0000-0003-0000f112e010/forms('DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAPES4BBUMUdJNjZHWkI0MUhKR0dENEJVRU1GN1IzNC4u')/responses", {
        headers: {
          // @ts-ignore
          __requestverificationtoken: parsedCookies.get('__RequestVerificationToken').split('=')[1],
          accept: 'application/json',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
          authorization: '',
          'content-type': 'application/json',
          'odata-maxverion': '4.0',
          'odata-version': '4.0',
          'sec-ch-ua': '"Google Chrome";v="87", "\\"Not;A\\Brand";v="99", "Chromium";v="87"',
          'sec-ch-ua-mobile': '?0',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          shareinvitationkey: 'undefined',
          'x-correlationid': 'faa30b8c-885b-405a-9664-9319bc6dcdbb',
          'x-ms-form-request-ring': 'msa',
          'x-ms-form-request-source': 'ms-formweb',
          'x-usersessionid': 'fe450d7c-a78f-4b4e-84aa-d9ee73b28118',
          cookie: `MSFPC=GUID=b33d19dc627b4fb19baf36a762df17e2&HASH=b33d&LV=202011&V=4&LU=1605858527306; MUID=1531CFE30822627106D0C06B0C2269FE ${Array.from(parsedCookies.values()).toString().replace(',', '; ')}`,
        },
        referrer: 'https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAPES4BBUMUdJNjZHWkI0MUhKR0dENEJVRU1GN1IzNC4u',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: `{"startDate":"${todayInDate}","submitDate":"${momentsLater}","answers":"[{\\"questionId\\":\\"r49573b74b5244499b397904056467895\\",\\"answer1\\":\\"${IDENTITY.name}\\"},{\\"questionId\\":\\"rd008e0345ad24f87b5e2a5fae0cc8627\\",\\"answer1\\":\\"JPS\\"},{\\"questionId\\":\\"rf08127d16af04064bca4fe3ccd961f18\\",\\"answer1\\":\\"Yofi Christian\\"},{\\"questionId\\":\\"r4b20e8c78a2f49abbb878775f5bd1562\\",\\"answer1\\":\\"${IDENTITY.phoneNumber.replace('0', '')}\\"},{\\"questionId\\":\\"r3a56511d40234e6ea4e74ee5ec211499\\",\\"answer1\\":\\"${IDENTITY.altPhoneNumber.replace('0', '')}\\"},{\\"questionId\\":\\"r612c5d860f8747ceb802eeb8644bb290\\",\\"answer1\\":\\"Programmer\\"},{\\"questionId\\":\\"r798f279c545d40deb574fc071cb4fc96\\",\\"answer1\\":\\"[\\\\"FIF\\\\"]\\"},{\\"questionId\\":\\"r620e551810b54f7caa43416eb285ad29\\",\\"answer1\\":\\"[\\\\"FIFADA\\\\"]\\"},{\\"questionId\\":\\"r9a31ffbd611f4734b06ddf75b6d554d5\\",\\"answer1\\":\\"${isWeekend ? 'Non Working Day' : 'Work from Home'}\\"},{\\"questionId\\":\\"r2a816af2d30f45f4b3ab67491f07a24c\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r6e1933111242458f9be670fa02cde971\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"rf32ce553a58b42e494c317292fe97186\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r1c37912ef9224bd08b9b9f4ee25bd934\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"rf205a00bd75942b18b6497562f0261ab\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r9b31867b684349d4a9108e1151b6def1\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r55b4f68a7829409ab51448097a420129\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r2ac38f974f9d4fb49a2d64d781c7f9f2\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r237ee812e2224bfdb5a0a53a044f32bf\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r59864b382d99436d9e1bf8c157aff873\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r1736f7135a6e430e8d7bfe10bed51ed6\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"rd9ce6ec3c9954c068c92976aadd24765\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r8031582fac6d4a048fb9b72c3a7f821a\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r2c30ac3451e84b26b00b5789a445ec62\\",\\"answer1\\":null}]","submitLanguage":"{\\"localeId\\":\\"en-us\\",\\"localeName\\":\\"English (United States)‎\\"}"}`,
        method: 'POST',
        mode: 'cors',
      }),
    ]);

    // const result = await Promise.all([fifGroupFormResponse.text(), JPSHealthResponse.json()]);
    // console.log(result);
  } catch (e) {
    console.log('Tasks failed at ', todayInDate);
    console.error(e);
  }
})();
