import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { randomInt } from 'crypto';
import { launch } from 'puppeteer';
import fetch from 'node-fetch';

dayjs.locale('id');

const thisExactMoment = dayjs();
const today = thisExactMoment.day();
const todayInDate = thisExactMoment.toDate();
const isWeekend = today === 0 || today === 6;
const momentsLater = thisExactMoment.add(randomInt(4, 17), 'minute').add(randomInt(1, 59), 'second').add(randomInt(1, 999), 'millisecond')
  .toDate();

const JPSHealthURL = 'https://forms.office.com/formapi/api/9188040d-6c67-4c5b-b112-36a304b66dad/users/00000000-0000-0000-0003-0000f112e010/forms(\'DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAPES4BBUMUdJNjZHWkI0MUhKR0dENEJVRU1GN1IzNC4u\')/responses';
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
  console.group('start time', todayInDate);
  try {
    try {
      console.group('FIFGROUP FORM');
      console.log('checking fifgroupform status...');
      const fifGroupFormInit = await fetch('http://fifgroup-form.fifgroup.co.id:5000/fifgrouphealthsurvey', {
        headers: {
          accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'upgrade-insecure-requests': '1',
        },
        method: 'GET',
      });

      const fifGroupFormCookies = fifGroupFormInit.headers.raw()['set-cookie'];
      const parsedCookies = parseCookies(fifGroupFormCookies);

      const fifGroupFormResponse = await fetch('http://fifgroup-form.fifgroup.co.id:5000/fifgrouphealthsurvey', {
        headers: {
          accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
          'cache-control': 'max-age=0',
          'content-type': 'application/x-www-form-urlencoded',
          'upgrade-insecure-requests': '1',
          cookie: parsedCookies.get('session') as string,
        },
        body: `kehadiran=${isWeekend ? 'Libur%2C+sesuai+ketentuan+%28tanggal+merah%2C+sabtu+bagi+HO%29' : 'Kerja+Dirumah'}&statkar=Head+Office&npk=${IDENTITY.npk}&nama=${IDENTITY.name.toUpperCase().replace(' ', '+')}&koncov=tidak&suhuself=%3C37.3+C&kondisi=Sehat&zona=Tidak&zonaya=&koncovfam=tidak&kondisifam=Sehat&zonafam=Tidak&txtzonayafam=&accept=Ya`,
        method: 'POST',
      });

      const result: string = await fifGroupFormResponse.text();

      if (result.substr(result.search('Data telah berhasil disimpan'), 28) !== 'Data telah berhasil disimpan') {
        throw new Error('data gak sampe / gak berhasil kesimpen di server');
      } else {
        console.log('fifgroupForm berhasil di submit!');
      }
    } catch (e) {
      console.log('gagal submit fifgroupForm');
      console.error(e);
    } finally {
      console.groupEnd();
    }

    try {
      console.group('JPSHEALTH FORM');
      console.log('checking JPSHealth form status...');
      const browser = await launch({ timeout: 99999 });
      try {
        const [page] = await browser.pages();
        await page.setRequestInterception(true);

        page.on('request', (request) => {
          if (request.url() === JPSHealthURL) {
            const responseData = JSON.parse(<string>request.postData());
            responseData.submitDate = momentsLater.toISOString();
            responseData.startDate = todayInDate.toISOString();
            request.continue({ postData: JSON.stringify(responseData) });
          } else {
            request.continue();
          }
        });

        console.log('opening JPSHealth page.');
        await page.goto('https://tiny.cc/JPSHealth', { waitUntil: 'networkidle0' });

        // page 1
        console.log('fill JPSHealth page 1.');
        await page.type('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div > div.office-form-question-element > div > div > input', IDENTITY.name);
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(3) > div > div.office-form-question-element > div > div:nth-child(1) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(4) > div > div.office-form-question-element > div > div:nth-child(9) > div > label > input[type=radio]');
        await page.type('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(5) > div > div.office-form-question-element > div > div > input', IDENTITY.phoneNumber);
        await page.type('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(6) > div > div.office-form-question-element > div > div > input', IDENTITY.altPhoneNumber);
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(7) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(8) > div > div.office-form-question-element > div > div:nth-child(7) > div > label > input[type=checkbox]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(9) > div > div.office-form-question-element > div > div:nth-child(4) > div > label > input[type=checkbox]');
        await page.click(isWeekend ? '#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(10) > div > div.office-form-question-element > div > div:nth-child(5) > div > label > input[type=radio]' : '#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(10) > div > div.office-form-question-element > div > div:nth-child(1) > div > label > input[type=radio]');

        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button');

        // page 2
        console.log('fill JPSHealth page 2.');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div.__question__.office-form-question > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(3) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(4) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(5) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(6) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(7) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(8) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(9) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(10) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(11) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(12) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(13) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(14) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');

        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button.office-form-theme-primary-background.office-form-theme-button.office-form-bottom-button.button-control.light-background-button.section-next-button.section-button');

        // page 3
        console.log('trying to submit (page 3)...');
        await page.waitForSelector('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button.office-form-theme-primary-background.office-form-theme-button.office-form-bottom-button.button-control.light-background-button.__submit-button__', { timeout: 99999 });
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button.office-form-theme-primary-background.office-form-theme-button.office-form-bottom-button.button-control.light-background-button.__submit-button__');

        await page.waitForResponse((res) => res.url() === JPSHealthURL && res.ok(),
          { timeout: 99999 });
        console.log('JPSHealth form berhasil di submit!');
      } catch (e) {
        console.log('gagal submit JPSHealth form');
        console.error(e);
      } finally {
        await browser.close();
      }
    } catch (e) {
      console.log('gagal inisialisasi puppeteer');
      console.error(e);
    } finally {
      console.groupEnd();
    }
  } catch (e) {
    console.log('System node error');
    console.error(e);
  } finally {
    console.groupEnd();
    console.log('Tasks finished at:', dayjs().toDate(), '\n\n');
  }
})();
