const timeout = 10000;

beforeAll(async () => {
    await page.goto(URL);
});

describe('Test header and title of the page', () => {

    test('Header of the page', async () => {
        const header = await page.$eval('h1', el => el.textContent);
        expect(header).toBe('PERSONAL DETAILS');

    });

    test('Title of the page', async () => {
        const title = await page.title();
        expect(title).toBe('Alvian Ghifari - Huawei');

    });
});

describe('Test form input, submit, and output', () => {
    test('should submit form and check result', async () => {
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

        expect(hasil).toBe('Data has been submitted');

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

        expect(name).toBe(input.name);
        expect(email).toBe(input.email);
        expect(phone).toBe(input.phone);
    }, timeout)
});

