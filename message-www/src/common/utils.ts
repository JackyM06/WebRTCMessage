
/**
 * 获取日期格式输出
 * @param  {Date}   time   时间
 * @param  {String} format 输出格式，要求必须含有yyyy,mm,dd
 * @return {String}        默认返回yyyymmdd格式时间
 */
export function formatTime(time: string | number | Date, format = 'yyyy-MM-dd') {
    time = new Date(time);
    return format
        .replace('yyyy', String(time.getFullYear()))
        .replace('MM', String(time.getMonth() + 1).padStart(2, '0'))
        .replace('dd', String(time.getDate()).padStart(2, '0'))
        .replace('HH', String(time.getHours()).padStart(2, '0'))
        .replace('mm', String(time.getMinutes()).padStart(2, '0'))
        .replace('ss', String(time.getSeconds()).padStart(2, '0'));
}

export async function sleep(timeout: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export function isPromise(obj: any): obj is Promise<any> {
    return obj instanceof Promise || (obj && typeof obj.then === 'function');
}

export function getQuery(): Record<string, string>
export function getQuery(key: string): string | undefined
export function getQuery(key?: string) {
    const queries = location.search.substr(1).split('&').reduce((result: any, item) => {
        const [ key, value ] = item.split('=');
        result[decodeURIComponent(key)] = decodeURIComponent(value);
        return result;
    }, {});
    return key ? queries[key] : queries;
}

export function getUrlQuery(url: string, key?: string) {
    const search = url.split('?')[1] || '';
    const queries = search.split('&');
    let result;
    if (queries.length) {
        result = queries.reduce((result: any, item) => {
            const [ key, value ] = item.split('=');
            result[decodeURIComponent(key)] = decodeURIComponent(value);
            return result;
        }, {});
    }
    return key ? result[key] : result;
}

export function getCookie(): Record<string, string>
export function getCookie(key: string): string | undefined
export function getCookie(key?: string) {
    const cookies = document.cookie.split(';').reduce((result: any, item) => {
        const [ key, value ] = item.trim().split('=');
        result[decodeURIComponent(key)] = decodeURIComponent(value);
        return result;
    }, {});
    return key ? cookies[key] : cookies;
}

export function querySerialize(data: any) {
    return Object.keys(data).map((key: string) => {
        let value = data[key];
        if (typeof value === 'object') {
            value = querySerialize(value);
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).join('&');
}


/**
 * 设置URL中的查询参数
 * @param url 链接
 * @param item 查询参数字段
 * @param value 查询参数值
 * @returns 更改后的链接
 */
export const setUrlQuery = (url: string, item: string, value: string) => {
    const rex = new RegExp(`[?&]${item}=([\\s\\S]*)`);
    const hasItem = rex.test(url);

    if(!hasItem) {
        return url + (url.includes('?') ? '&' : '?') + `${item}=${encodeURIComponent(value)}`;
    }

    const hasAndRex = new RegExp(`[?&]${item}=([\\s\\S]*?)&`);

    return url.replace(hasAndRex.test(url) ? hasAndRex : rex, (p, m) => {
        return p.replace(m, encodeURIComponent(value));
    });
};
