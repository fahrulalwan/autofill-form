const fetch = require('node-fetch');

// TODO: buat validasi kalo weekend. KERJAIN SABTU/MINGGU
// import dayjs from 'dayjs';
// import 'dayjs/locale/id';
//
// dayjs.locale('id');
//
// const today = dayjs(new Date()).day();
// const isWeekend = today === 0 || today === 6;
//
// console.log(today, isWeekend);

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
  const [/* fifGroupFormResponse, */JPSHealthWebsite] = await Promise.all([
    // fetch('http://fifgroup-form.fifgroup.co.id:5000/fifgrouphealthsurvey', {
    //   headers: {
    //     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //     'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
    //     'cache-control': 'max-age=0',
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'upgrade-insecure-requests': '1',
    //     cookie: 'session=eyJjc3JmX3Rva2VuIjp7IiBiIjoiTW1Ka1kyUXhNR1UxWkRsaFpEaG1aRFl4T1Rjd1kyRmhOVGt6T1dRNVpUazBNekV3WldNM1l3PT0ifX0.X7FjVg.L75LkBbKfX5XHwE8tvSuM-Wj7VE',
    //   },
    //   referrer: 'http://fifgroup-form.fifgroup.co.id:5000/fifgrouphealthsurvey',
    //   referrerPolicy: 'strict-origin-when-cross-origin',
    //   body: `kehadiran=Kerja+Dirumah&statkar=Head+Office&npk=${IDENTITY.npk}&nama=${IDENTITY.name.toUpperCase().replace(' ', '+')}&koncov=tidak&suhuself=%3C37.3+C&kondisi=Sehat&zona=Tidak&zonaya=&koncovfam=tidak&kondisifam=Sehat&zonafam=Tidak&txtzonayafam=&accept=Ya`,
    //   method: 'POST',
    //   mode: 'cors',
    // }),
    // OPEN WEBSITE JPS HEALTH
    fetch('https://forms.office.com/Pages/ResponsePage.aspx?id=a7HHR4LUR0GyGgSTbdiYdXsUGhGAT-hLkJiEhsyHPVRUNUoyS1ZaWkRKOFRHR1JSWVJRRUUxVEJMVi4u', {
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
        'cache-control': 'max-age=0',
        'sec-ch-ua': '"Chromium";v="86", "\\"Not\\\\A;Brand";v="99", "Google Chrome";v="86"',
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
    }),
    // // SUBMIT FORM JPS HEALTH
    // fetch("https://forms.office.com/formapi/api/47c7b16b-d482-4147-b21a-04936dd89875/users/111a147b-4f80-4be8-9098-8486cc873d54/forms('a7HHR4LUR0GyGgSTbdiYdXsUGhGAT-hLkJiEhsyHPVRUNUoyS1ZaWkRKOFRHR1JSWVJRRUUxVEJMVi4u')/responses", {
    //   headers: {
    //     __requestverificationtoken: '1vJOHeAHqEkQ7zsQmZueCCxjubF4DGy7-U_k0tonEOHLkhep2I_ObarVf46sxh4HtDDfSBzdnhW6mCDTDuvWlten48BbB_PI8IKss7PFFmo1',
    //     accept: 'application/json',
    //     'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
    //     authorization: '',
    //     'content-type': 'application/json',
    //     'odata-maxverion': '4.0',
    //     'odata-version': '4.0',
    //     'sec-ch-ua': '"Chromium";v="86", "\\"Not\\\\A;Brand";v="99", "Google Chrome";v="86"',
    //     'sec-ch-ua-mobile': '?0',
    //     'sec-fetch-dest': 'empty',
    //     'sec-fetch-mode': 'cors',
    //     'sec-fetch-site': 'same-origin',
    //     shareinvitationkey: 'undefined',
    //     'x-correlationid': '0f0bd9f3-71d0-4beb-814a-714176a418d4',
    //     'x-ms-form-request-ring': 'business',
    //     'x-ms-form-request-source': 'ms-formweb',
    //     'x-usersessionid': '94b8b4ab-a697-46a5-99e9-6585c5d62fdb',
    //     cookie: 'optimizelyEndUserId=oeu1587112306357r0.25763869991059396; check=true; AMCVS_EA76ADE95776D2EC7F000101%40AdobeOrg=1; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=-179204249%7CMCMID%7C61474376772822420043007968148093733025%7CMCAAMLH-1587717112%7C3%7CMCAAMB-1587717112%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCCIDH%7C1501212801%7CMCOPTOUT-1587119512s%7CNONE%7CMCAID%7CNONE; IR_gbd=office.com; _mkto_trk=id:157-GQE-382&token:_mch-office.com-1587112313311-34180; __CT_Data=gpv=2&ckp=tld&dm=office.com; IRMS_la3327=1587112539749; mbox=session#73cbb3da22284c29a129272b01714945#1587114167|PC#73cbb3da22284c29a129272b01714945.22_0#1650357344; DcLcid=ui=1057&data=1057; AADNonce.forms=995cda9f-c754-4472-bb46-3f88cf39080d.637273831308422909; MSFPC=GUID=35a661d54af34e4da564fdca25e86529&HASH=35a6&LV=202004&V=4&LU=1586163611802; __RequestVerificationToken=VyfUKG9bJU8yuC7MPCRyZ6gjVQFumUMdZu2qmikWlVvhCcYiQrloqnKpJfAbxYZ5pbsyVdkuH5TMCe1ji9b_qZA__CiOj2NGlJmVm2FEoYY1; MUID=2E1FDF08309C6D93378DD076310E6C5F; omkt=en-US',
    //   },
    //   referrer: 'https://forms.office.com/Pages/ResponsePage.aspx?id=a7HHR4LUR0GyGgSTbdiYdXsUGhGAT-hLkJiEhsyHPVRUNUoyS1ZaWkRKOFRHR1JSWVJRRUUxVEJMVi4u',
    //   referrerPolicy: 'strict-origin-when-cross-origin',
    //   body: `{"startDate":"2020-11-16T17:03:42.936Z","submitDate":"2020-11-16T17:04:46.412Z","answers":"[{\\\\"questionId\\\\":\\\\"r49573b74b5244499b397904056467895\\\\",\\\\"answer1\\\\":\\\\"${IDENTITY.name}\\\\"},{\\\\"questionId\\\\":\\\\"rd008e0345ad24f87b5e2a5fae0cc8627\\\\",\\\\"answer1\\\\":\\\\"JPS\\\\"},{\\\\"questionId\\\\":\\\\"rf08127d16af04064bca4fe3ccd961f18\\\\",\\\\"answer1\\\\":\\\\"Yofi Christian\\\\"},{\\\\"questionId\\\\":\\\\"r4b20e8c78a2f49abbb878775f5bd1562\\\\",\\\\"answer1\\\\":\\\\"${IDENTITY.phoneNumber.replace('0', '')}\\\\"},{\\\\"questionId\\\\":\\\\"r3a56511d40234e6ea4e74ee5ec211499\\\\",\\\\"answer1\\\\":\\\\"${IDENTITY.altPhoneNumber.replace('0', '')}\\\\"},{\\\\"questionId\\\\":\\\\"r612c5d860f8747ceb802eeb8644bb290\\\\",\\\\"answer1\\\\":\\\\"Programmer\\\\"},{\\\\"questionId\\\\":\\\\"r798f279c545d40deb574fc071cb4fc96\\\\",\\\\"answer1\\\\":\\\\"[\\\\\\\\\\\\"FIF\\\\\\\\\\\\"]\\\\"},{\\\\"questionId\\\\":\\\\"r620e551810b54f7caa43416eb285ad29\\\\",\\\\"answer1\\\\":\\\\"[\\\\\\\\\\\\"FIFADA\\\\\\\\\\\\"]\\\\"},{\\\\"questionId\\\\":\\\\"r9a31ffbd611f4734b06ddf75b6d554d5\\\\",\\\\"answer1\\\\":\\\\"Work from Home\\\\"},{\\\\"questionId\\\\":\\\\"r2a816af2d30f45f4b3ab67491f07a24c\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"r6e1933111242458f9be670fa02cde971\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"rf32ce553a58b42e494c317292fe97186\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"r1c37912ef9224bd08b9b9f4ee25bd934\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"rf205a00bd75942b18b6497562f0261ab\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"r9b31867b684349d4a9108e1151b6def1\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"r55b4f68a7829409ab51448097a420129\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"r2ac38f974f9d4fb49a2d64d781c7f9f2\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"r237ee812e2224bfdb5a0a53a044f32bf\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"r59864b382d99436d9e1bf8c157aff873\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"r1736f7135a6e430e8d7bfe10bed51ed6\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"ra6788001b30d44629391d77c7193de3b\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"r17d492ce01b94e1f92b0b5138772c96f\\\\",\\\\"answer1\\\\":\\\\"No\\\\"},{\\\\"questionId\\\\":\\\\"r1475d5d0ff27418e976b00a3c0ed5660\\\\",\\\\"answer1\\\\":null}]","submitLanguage":"{\\\\"localeId\\\\":\\\\"en-us\\\\",\\\\"localeName\\\\":\\\\"English (United States)‎\\\\"}"}`,
    //   method: 'POST',
    //   mode: 'cors',
    // }),
  ]);
  const [JPSHealthText] = await Promise.all([JPSHealthWebsite.headers.raw()['set-cookie']]);
  const parsedCookies = parseCookies(JPSHealthText);
  const JPSHealthResponse = await fetch("https://forms.office.com/formapi/api/47c7b16b-d482-4147-b21a-04936dd89875/users/111a147b-4f80-4be8-9098-8486cc873d54/forms('a7HHR4LUR0GyGgSTbdiYdXsUGhGAT-hLkJiEhsyHPVRUNUoyS1ZaWkRKOFRHR1JSWVJRRUUxVEJMVi4u')/responses", {
    headers: {
      // @ts-ignore
      __requestverificationtoken: parsedCookies.get('__RequestVerificationToken').split('=')[1],
      accept: 'application/json',
      'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
      authorization: '',
      'content-type': 'application/json',
      'odata-maxverion': '4.0',
      'odata-version': '4.0',
      'sec-ch-ua': '"Chromium";v="86", "\\"Not\\\\A;Brand";v="99", "Google Chrome";v="86"',
      'sec-ch-ua-mobile': '?0',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      shareinvitationkey: 'undefined',
      'x-correlationid': '0f0bd9f3-71d0-4beb-814a-714176a418d4',
      'x-ms-form-request-ring': 'business',
      'x-ms-form-request-source': 'ms-formweb',
      'x-usersessionid': '94b8b4ab-a697-46a5-99e9-6585c5d62fdb',
      cookie: `optimizelyEndUserId=oeu1587112306357r0.25763869991059396; check=true; AMCVS_EA76ADE95776D2EC7F000101%40AdobeOrg=1; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=-179204249%7CMCMID%7C61474376772822420043007968148093733025%7CMCAAMLH-1587717112%7C3%7CMCAAMB-1587717112%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCCIDH%7C1501212801%7CMCOPTOUT-1587119512s%7CNONE%7CMCAID%7CNONE; IR_gbd=office.com; _mkto_trk=id:157-GQE-382&token:_mch-office.com-1587112313311-34180; __CT_Data=gpv=2&ckp=tld&dm=office.com; IRMS_la3327=1587112539749; mbox=session#73cbb3da22284c29a129272b01714945#1587114167|PC#73cbb3da22284c29a129272b01714945.22_0#1650357344; MSFPC=GUID=35a661d54af34e4da564fdca25e86529&HASH=35a6&LV=202004&V=4&LU=1586163611802; MUID=2E1FDF08309C6D93378DD076310E6C5F; omkt=en-US; ${Array.from(parsedCookies.values()).toString().replace(',', '; ')}`,
    },
    referrer: 'https://forms.office.com/Pages/ResponsePage.aspx?id=a7HHR4LUR0GyGgSTbdiYdXsUGhGAT-hLkJiEhsyHPVRUNUoyS1ZaWkRKOFRHR1JSWVJRRUUxVEJMVi4u',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: '{"startDate":"2020-11-16T17:03:42.936Z","submitDate":"2020-11-16T17:04:46.412Z","answers":"[{\\"questionId\\":\\"r49573b74b5244499b397904056467895\\",\\"answer1\\":\\"Mohammad Fahrul Alwan\\"},{\\"questionId\\":\\"rd008e0345ad24f87b5e2a5fae0cc8627\\",\\"answer1\\":\\"JPS\\"},{\\"questionId\\":\\"rf08127d16af04064bca4fe3ccd961f18\\",\\"answer1\\":\\"Yofi Christian\\"},{\\"questionId\\":\\"r4b20e8c78a2f49abbb878775f5bd1562\\",\\"answer1\\":\\"81289824453\\"},{\\"questionId\\":\\"r3a56511d40234e6ea4e74ee5ec211499\\",\\"answer1\\":\\"81212439841\\"},{\\"questionId\\":\\"r612c5d860f8747ceb802eeb8644bb290\\",\\"answer1\\":\\"Programmer\\"},{\\"questionId\\":\\"r798f279c545d40deb574fc071cb4fc96\\",\\"answer1\\":\\"[\\\\\\"FIF\\\\\\"]\\"},{\\"questionId\\":\\"r620e551810b54f7caa43416eb285ad29\\",\\"answer1\\":\\"[\\\\\\"FIFADA\\\\\\"]\\"},{\\"questionId\\":\\"r9a31ffbd611f4734b06ddf75b6d554d5\\",\\"answer1\\":\\"Work from Home\\"},{\\"questionId\\":\\"r2a816af2d30f45f4b3ab67491f07a24c\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r6e1933111242458f9be670fa02cde971\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"rf32ce553a58b42e494c317292fe97186\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r1c37912ef9224bd08b9b9f4ee25bd934\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"rf205a00bd75942b18b6497562f0261ab\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r9b31867b684349d4a9108e1151b6def1\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r55b4f68a7829409ab51448097a420129\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r2ac38f974f9d4fb49a2d64d781c7f9f2\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r237ee812e2224bfdb5a0a53a044f32bf\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r59864b382d99436d9e1bf8c157aff873\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r1736f7135a6e430e8d7bfe10bed51ed6\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"ra6788001b30d44629391d77c7193de3b\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r17d492ce01b94e1f92b0b5138772c96f\\",\\"answer1\\":\\"No\\"},{\\"questionId\\":\\"r1475d5d0ff27418e976b00a3c0ed5660\\",\\"answer1\\":null}]","submitLanguage":"{\\"localeId\\":\\"en-us\\",\\"localeName\\":\\"English (United States)‎\\"}"}',
    method: 'POST',
    mode: 'cors',
  });
})();
