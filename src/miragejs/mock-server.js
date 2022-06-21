import { createServer, Response } from 'miragejs';
import { mockNews, mockUsers } from './mock-data';

let retrieveCount = 0;
let news = [...mockNews];

const methodTypes = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

const increaseCountAndRetrieveUsers = (method, fromAnotherApi, request) => {
    retrieveCount++;
    const result = {
        users: [...mockUsers],
        resultInfo: {
            retrieveCount: retrieveCount,
            method: method,
            fromAnotherApi: fromAnotherApi,
            requestHeaders: request.requestHeaders,
            url: request.url,
            requestBody: request.requestBody,
        },
    };
    return result;
};

const getNews = (method, request) => {
    const query = request.queryParams;
    const page = parseInt(query.page);
    const rowsPerPage = parseInt(query.rowsPerPage);
    const currentNews = news.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return {
        news: currentNews,
        page: page,
        rowsPerPage: rowsPerPage,
        total: news.length,
        resultInfo: {
            method: method,
            url: request.url,
            requestBody: request.body,
        },
    };
};

const deleteNews = (method, request) => {
    const item = JSON.parse(JSON.parse(request.requestBody));
    const index = news.findIndex((element) => element.id === item.id);
    news.splice(index, 1);
    const query = request.queryParams;
    const page = parseInt(query.page);
    const rowsPerPage = parseInt(query.rowsPerPage);
    const currentNews = news.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return {
        news: currentNews,
        resultInfo: {
            method: method,
            url: request.url,
            requestBody: request.body,
        },
    };
};

const putNews = (method, request) => {
    const item = JSON.parse(JSON.parse(request.requestBody));
    const index = news.findIndex((element) => element.id === item.id);
    news[index] = item;
    const query = request.queryParams;
    const page = parseInt(query.page);
    const rowsPerPage = parseInt(query.rowsPerPage);
    const currentNews = news.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return {
        news: currentNews,
        resultInfo: {
            method: method,
            url: request.url,
            requestBody: request.body,
        },
    };
};

const postNews = (method, request) => {
    const item = JSON.parse(JSON.parse(request.requestBody));
    item.id = news.length + 1;
    news.push(item);
    const query = request.queryParams;
    const page = parseInt(query.page);
    const rowsPerPage = parseInt(query.rowsPerPage);
    const currentNews = news.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return {
        news: currentNews,
        resultInfo: {
            method: method,
            url: request.url,
            requestBody: request.body,
        },
    };
};

const errorResult = (errorCode) => {
    const result = new Response(errorCode, { some: 'header' });
    return result;
};

createServer({
    routes() {
        this.get('/api/users', (schema, request) => {
            return increaseCountAndRetrieveUsers(methodTypes.GET, false, request);
        });
        this.get('/another-api/users', (schema, request) => {
            return increaseCountAndRetrieveUsers(methodTypes.GET, true, request);
        });
        this.post('/api/users', (schema, request) => {
            return increaseCountAndRetrieveUsers(methodTypes.POST, false, request);
        });
        this.post('/another-api/users', (schema, request) => {
            return increaseCountAndRetrieveUsers(methodTypes.POST, true, request);
        });
        this.put('/api/users', (schema, request) => {
            return increaseCountAndRetrieveUsers(methodTypes.PUT, false, request);
        });
        this.put('/another-api/users', (schema, request) => {
            return increaseCountAndRetrieveUsers(methodTypes.PUT, true, request);
        });
        this.delete('/api/users', (schema, request) => {
            return increaseCountAndRetrieveUsers(methodTypes.DELETE, false, request);
        });
        this.delete('/another-api/users', (schema, request) => {
            return increaseCountAndRetrieveUsers(methodTypes.DELETE, true, request);
        });
        this.get('/api/users-error', () => {
            return errorResult(500);
        });
        this.get('/another-api/users-error', () => {
            return errorResult(500);
        });
        this.post('/api/users-error', () => {
            return errorResult(500);
        });
        this.post('/another-api/users-error', () => {
            return errorResult(500);
        });
        this.put('/api/users-error', () => {
            return errorResult(500);
        });
        this.put('/another-api/users-error', () => {
            return errorResult(500);
        });
        this.delete('/api/users-error', () => {
            return errorResult(500);
        });
        this.delete('/another-api/users-error', () => {
            return errorResult(500);
        });
        this.get('/api/news', (schema, request) => {
            return getNews(methodTypes.GET, request);
        });
        this.post('/api/news', (schema, request) => {
            return postNews(methodTypes.POST, request);
        });
        this.put('/api/news', (schema, request) => {
            return putNews(methodTypes.PUT, request);
        });
        this.delete('/api/news', (schema, request) => {
            return deleteNews(methodTypes.DELETE, request);
        });
    },
});
