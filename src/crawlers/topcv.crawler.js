import { load } from 'cheerio';
import { request } from '../utils/request.js';

export async function crawlTopCV() {
    const url =
        'https://www.topcv.vn/tim-viec-lam-frontend-developer-tai-ho-chi-minh-kl2?type_keyword=1&sba=1&locations=l2';

    const res = await request(url);

    if (!res.ok) {
        console.error(res.error);
        return [];
    }

    const $ = load(res.data);

    const jobs = [];

    const items = $('.job-item-search-result');

    console.log('Jobs found:', items.length);

    items.each((i, el) => {
        const title = $(el).find('.title span').text().trim();

        const company = $(el).find('.avatar img').attr('alt');

        const link = $(el).find('.title a').attr('href');

        const salary = $(el).find('.salary').text().trim();

        const postedDate = $(el).find('.label-update').text().replace('Đăng', '').trim();

        const updatedDate = $(el).find('.label-update').attr('title');

        jobs.push({
            title,
            company,
            salary,
            postedDate,
            updatedDate,
            source: 'TopCV',
            date: new Date().toISOString().split('T')[0],
            link
        });
    });

    return jobs;
}
