import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { randomInt } from 'crypto';
import { launch } from 'puppeteer';
import fetch from 'node-fetch';

dayjs.locale('id');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

const thisExactMoment = dayjs();
const today = thisExactMoment.day();
// const todayInDate = thisExactMoment.format('DD-MM-YYYY HH:mm:ss.SSSZ');
const todayInDate = thisExactMoment.format();
const isWeekend = today === 0 || today === 6;
const momentsLater = thisExactMoment.add(randomInt(4, 17), 'minute')
  .add(randomInt(1, 59), 'second')
  .add(randomInt(1, 999), 'millisecond')
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

function colorizeConsole(color: string, ...messages: any[]) {
  console.log(color, ...messages, colors.reset);
}

(async () => {
  console.group('start time', todayInDate);
  try {
    try {
      console.group('JPSHEALTH FORM');
      console.log('checking JPSHealth form status...');
      const browser = await launch({ timeout: 99999 });
      try {
        const [page] = await browser.pages();
        await page.setRequestInterception(true);

        page.on('request', (request) => {
          if (request.url() === JPSHealthURL) {
            const responseData = JSON.parse(request.postData() as string);
            responseData.submitDate = momentsLater.toISOString();
            responseData.startDate = thisExactMoment.toISOString();
            request.continue({ postData: JSON.stringify(responseData) });
          } else {
            request.continue();
          }
        });

        page.on('response', async (response) => {
          if (response.url() === JPSHealthURL) {
            switch (response.status()) {
              case 200:
                colorizeConsole(colors.green, 'JPSHealth form berhasil di submit');
                break;
              case 201:
                colorizeConsole(colors.green, 'JPSHealth form berhasil di dibuat.');
                break;
              case 400:
                colorizeConsole(colors.yellow, 'JPSHealth form has reached its submission limit.');
                break;
              default:
                colorizeConsole(colors.red, 'Unknown response reached, status: ', response.status());
                break;
            }
          }
        });

        console.log('opening JPSHealth page.');
        await page.goto('https://tiny.cc/JPSHealth', { waitUntil: 'networkidle0' });

        // page 1
        console.log('fill JPSHealth page 1.');
        await page.type('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(1) > div > div.office-form-question-element > div > div > input', IDENTITY.name);
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(2) > div > div.office-form-question-element > div > div:nth-child(1) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(3) > div > div.office-form-question-element > div > div:nth-child(9) > div > label > input[type=radio]');
        await page.type('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(4) > div > div.office-form-question-element > div > div > input', IDENTITY.phoneNumber);
        await page.type('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(5) > div > div.office-form-question-element > div > div > input', IDENTITY.altPhoneNumber);
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(6) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(7) > div > div.office-form-question-element > div > div:nth-child(7) > div > label > input[type=checkbox]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(8) > div > div.office-form-question-element > div > div:nth-child(4) > div > label > input[type=checkbox]');
        await page.click(isWeekend ? '#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(9) > div > div.office-form-question-element > div > div:nth-child(5) > div > label > input[type=radio]' : '#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(9) > div > div.office-form-question-element > div > div:nth-child(1) > div > label > input[type=radio]');

        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button');

        // page 2
        console.log('fill JPSHealth page 2.');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(1) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(2) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(3) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(4) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(5) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(6) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(7) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(8) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(9) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(10) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(11) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(12) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-question-body > div:nth-child(2) > div:nth-child(13) > div > div.office-form-question-element > div > div:nth-child(2) > div > label > input[type=radio]');

        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button.office-form-theme-primary-background.office-form-theme-button.office-form-bottom-button.button-control.light-background-button.section-next-button.section-button');

        // page 3
        console.log('trying to submit (page 3)...');
        await page.click('#form-container > div > div > div > div > div.office-form.office-form-theme-shadow > div.office-form-body > div.office-form-navigation-container > div.office-form-button-container > button.office-form-theme-primary-background.office-form-theme-button.office-form-bottom-button.button-control.light-background-button.__submit-button__', { delay: 400 });

        await page.waitForResponse((res) => res.url() === JPSHealthURL, { timeout: 99999 });
      } catch (e) {
        console.log('gagal submit JPSHealth form');
        console.log(e);
        throw new Error(e);
      } finally {
        console.log('Shutting down puppeteer...');
        await browser.close();
        console.log('Puppeteer successfully shut down.');
      }
    } catch (e) {
      console.log('runtime puppeteer failed');
      console.log(e);
      throw new Error(e);
    } finally {
      console.groupEnd();
    }

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
        body: `kehadiran=${isWeekend ? 'Libur%2C+sesuai+ketentuan+%28tanggal+merah%2C+sabtu+bagi+HO%29' : 'Kerja+Dirumah'}&statkar=Head+Office&npk=${IDENTITY.npk}&nama=${IDENTITY.name.toUpperCase()
          .replace(' ', '+')}}&koncov=tidak&suhuself=%3C37.3+C&kondisi=Sehat&zona=Tidak&zonaya=&koncovfam=tidak&kondisifam=Sehat&zonafam=Tidak&txtzonayafam=&vaksin=Belum+divaksin&vaksin_occ=Single&accept=Ya`,
        method: 'POST',
      });

      const result: string = await fifGroupFormResponse.text();

      if (result.substr(result.search('Data telah berhasil disimpan'), 28) === 'Data telah berhasil disimpan') {
        colorizeConsole(colors.green, 'fifgroupForm berhasil di submit!');
      } else {
        throw new Error('data gak sampe / gak berhasil kesimpen di server');
      }
    } catch (e) {
      console.log('gagal submit fifgroupForm');
      console.log(e);
    } finally {
      console.groupEnd();
    }
  } catch (e) {
    console.log('System node error');
    console.log(e);
  } finally {
    console.groupEnd();
    console.log('Tasks finished at:', dayjs()
      .format(), '\n\n');
  }
})();
