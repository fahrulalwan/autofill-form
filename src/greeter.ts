const fetch = require('node-fetch');
// import dayjs from 'dayjs';
// import 'dayjs/locale/id';
//
// dayjs.locale('id');
//
// const today = dayjs(new Date()).day();
// const isWeekend = today === 0 || today === 6;
//
// console.log(today, isWeekend);

(async () => {
  const response = await fetch('http://fifgroup-form.fifgroup.co.id:5000/fifgrouphealthsurvey', {
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
    body: 'kehadiran=Kerja+Dirumah&statkar=Head+Office&npk=OUT1202&nama=MOHAMMAD+FAHRUL+ALWAN&koncov=tidak&suhuself=%3C37.3+C&kondisi=Sehat&zona=Tidak&zonaya=&koncovfam=tidak&kondisifam=Sehat&zonafam=Tidak&txtzonayafam=&accept=Ya',
    method: 'POST',
    mode: 'cors',
  });
  const body = await response.text();
  console.log(body);
})();
