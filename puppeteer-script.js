const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 10 });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    let input = {
        name: 'John doe',
        email: 'johndoe@gmail.com',
        phone: '123456'
    }

    await page.waitForSelector('form');
    await page.type('#name', input.name);
    await page.type('#email', input.email);
    await page.type('#phone', input.phone);
    await page.click('[type="submit"]');

    await page.waitForSelector('#hasilform', { visible: true });
    const hasil = await page.$eval('#hasilform', el => el.textContent);

    if (hasil !== 'Data has been submitted') {
        console.log('Test failed, data not submitted');
    }

    await page.click('#getDataBtn');
    await page.waitForSelector('div.dataWrapper', { visible: true });

    await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
    });

    const items = await page.$$('.dataWrapper .items');

    const lastItem = items[items.length - 1];
    const name = await lastItem.$eval('.name', el => el.textContent.split(': ')[1])
    const email = await lastItem.$eval('.email', el => el.textContent.split(': ')[1])
    const phone = await lastItem.$eval('.phone', el => el.textContent.split(': ')[1])


    console.log(
        `Input: ${input.name}, ${input.email}, ${input.phone}`,
    );
    console.log(
        `Output: ${name}, ${email}, ${phone}`,
    );

    if (name === input.name && email === input.email && phone === input.phone) {
        console.log('Test passed');
    } else {
        console.log('Test failed');
    }

    await browser.close();
})();
