export const isValidTckn = (tckn) => {
    if (!tckn || tckn.length != 11 || tckn[0] == 0) {
        return false;
    }

    let odd = 0;
    let even = 0;
    let result = 0;
    let sum = 0;

    odd =
        parseInt(tckn[0], 10) +
        parseInt(tckn[2], 10) +
        parseInt(tckn[4], 10) +
        parseInt(tckn[6], 10) +
        parseInt(tckn[8], 10);
    even = parseInt(tckn[1], 10) + parseInt(tckn[3], 10) + parseInt(tckn[5], 10) + parseInt(tckn[7], 10);

    odd *= 7;
    result = Math.abs(odd - even);
    if (result % 10 != tckn[9]) return false;

    for (let i = 0; i < 10; i += 1) {
        sum += parseInt(tckn[i], 10);
    }

    return sum % 10 == tckn[10];
};

// Ref: https://gist.github.com/ziyahan/3938729
export const isValidVkn = (vkn) => {
    if (!vkn || vkn.length != 10) {
        return false;
    }

    let v = [];
    let lastDigit = Number(vkn.charAt(9));
    for (let i = 0; i < 9; i++) {
        let tmp = (Number(vkn.charAt(i)) + (9 - i)) % 10;
        v[i] = (tmp * 2 ** (9 - i)) % 9;
        if (tmp !== 0 && v[i] === 0) v[i] = 9;
    }
    let sum = v.reduce((a, b) => a + b, 0) % 10;
    return (10 - (sum % 10)) % 10 === lastDigit;
};
