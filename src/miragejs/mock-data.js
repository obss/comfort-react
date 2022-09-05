export const mockUsers = [
    { id: '1', name: 'Luke' },
    { id: '2', name: 'Leia' },
    { id: '3', name: 'Anakin' },
];

export const newsTypes = ['General', 'Sport', 'Technology', 'Health'];
export const newsKeywords = ['Urgent', 'Normal', 'Unneccesary', 'Ordinary', 'Daily'];

export const mockNews = Array.from({ length: 100 }, (_, i) => {
    const iOf10 = i % 10;
    return {
        name: `News ${i}`,
        id: i,
        type: newsTypes[Math.floor(Math.random() * newsTypes.length)],
        keywords: [
            newsKeywords[Math.floor(Math.random() * newsKeywords.length)],
            newsKeywords[Math.floor(Math.random() * newsKeywords.length)],
        ],
        outdated: false,
        date: 1651824272000,
        iban: 'TR320010009999901234567890',
        time: '23:12',
        phoneNumber: { callingCode: '90', number: '777 777 77 7' + iOf10 },
        vkn: '1988553332',
        tckn: '41126372152',
        website: 'https://obss.github.io/react-validatable-form-demo/getting-started/home',
        price: (Math.random() * Math.random() * 100).toFixed(2),
        email: 'example@example.com',
        greetings: 'Hello world',
    };
});
