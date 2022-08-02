import { DEFAULT_LANGUAGE } from '../constants/constants';

export const getMessage = (key, lang, params) => {
    const _lang = lang || DEFAULT_LANGUAGE;
    const dictionary = messages[_lang] || messages[DEFAULT_LANGUAGE];
    let result = dictionary[key] || key;
    if (result && params) {
        Object.keys(params).forEach((paramKey) => {
            result = result.replace(`{{${paramKey}}}`, params[paramKey]);
        });
    }
    return result;
};

const PAGE_TYPE_MAP_TR = {
    first: 'İlk',
    last: 'Son',
    next: 'Sonraki',
    previous: 'Önceki',
};

const PAGE_TYPE_MAP_EN = {
    first: 'first',
    last: 'last',
    next: 'next',
    previous: 'previous',
};

const PAGE_TYPE_MAP_AR = {
    first: 'أولاً',
    last: 'نهاية',
    next: 'التالي',
    previous: 'سابق',
};

const messages = {
    tr: {
        DECIMAL_SEPARATOR: ',',
        THOUSAND_SEPARATOR: '.',
        AUTOCOMPLETE_LOADING_TEXT: 'Yükleniyor...',
        DATE_PICKER_INPUT_FORMAT: 'dd/MM/yyyy',
        DATE_PICKER_OK_TEXT: 'Tamam',
        DATE_PICKER_CANCEL_TEXT: 'İptal',
        TABLE_LABEL_ROWS_PER_PAGE: 'Sayfa başına satır sayısı:',
        TABLE_LABEL_DISPLAYED_ROWS: ({ from, to, count }) => `${count} sonuçtan ${from}-${to} arası`,
        TABLE_GET_ITEM_ARIA_LABEL: (type) => `${PAGE_TYPE_MAP_TR[type]} sayfaya git`,
        TABLE_COLUMN_FILTERING_TITLE: 'Kolonları Filtrele',
        CONFIRM_DIALOG_CONFIRM_TEXT: 'Onayla',
        CONFIRM_DIALOG_CANCEL_TEXT: 'İptal',
        FORM_DIALOG_SAVE_TEXT: 'Kaydet',
        FORM_DIALOG_CANCEL_TEXT: 'İptal',
        FILE_INPUT_MAX_ACCEPT_MESSAGE: 'En fazla {{maxFiles}} dosya yükleyebilirsiniz',
        FILE_INPUT_REJECT_MESSAGE: '{{fileCount}} adet dosya reddedildi',
        FILE_INPUT_PREVIEW_LABEL: 'Önizle',
        FILE_INPUT_DESCRIPTION: 'Dosyaları buraya sürükleyip bırakın veya dosyaları seçmek için tıklayın',
    },
    en: {
        DECIMAL_SEPARATOR: '.',
        THOUSAND_SEPARATOR: ',',
        AUTOCOMPLETE_LOADING_TEXT: 'Loading...',
        DATE_PICKER_INPUT_FORMAT: 'MM/dd/yyyy',
        DATE_PICKER_OK_TEXT: 'OK',
        DATE_PICKER_CANCEL_TEXT: 'Cancel',
        TABLE_LABEL_ROWS_PER_PAGE: 'Rows per page:',
        TABLE_LABEL_DISPLAYED_ROWS: ({ from, to, count }) => {
            return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
        },
        TABLE_GET_ITEM_ARIA_LABEL: (type) => `Go to ${PAGE_TYPE_MAP_EN[type]} page`,
        TABLE_COLUMN_FILTERING_TITLE: 'Filter Columns',
        CONFIRM_DIALOG_CONFIRM_TEXT: 'Confirm',
        CONFIRM_DIALOG_CANCEL_TEXT: 'Cancel',
        FORM_DIALOG_SAVE_TEXT: 'Save',
        FORM_DIALOG_CANCEL_TEXT: 'Cancel',
        FILE_INPUT_MAX_ACCEPT_MESSAGE: 'You can upload max {{maxFiles}} files',
        FILE_INPUT_REJECT_MESSAGE: '{{fileCount}} files rejected',
        FILE_INPUT_PREVIEW_LABEL: 'Preview',
        FILE_INPUT_DESCRIPTION: 'Drag and drop some files here or click to select files',
    },
    ar: {
        DECIMAL_SEPARATOR: '.',
        THOUSAND_SEPARATOR: ',',
        AUTOCOMPLETE_LOADING_TEXT: 'جار التحميل...',
        DATE_PICKER_INPUT_FORMAT: 'MM/dd/yyyy',
        DATE_PICKER_OK_TEXT: 'نعم',
        DATE_PICKER_CANCEL_TEXT: 'يلغي',
        TABLE_LABEL_ROWS_PER_PAGE: 'عدد الصفوف في الصفحة:',
        TABLE_LABEL_DISPLAYED_ROWS: ({ from, to, count }) => {
            return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
        },
        TABLE_GET_ITEM_ARIA_LABEL: (type) => `Go to ${PAGE_TYPE_MAP_AR[type]} page`,
        TABLE_COLUMN_FILTERING_TITLE: 'أعمدة التصفية',
        CONFIRM_DIALOG_CONFIRM_TEXT: 'تؤكد',
        CONFIRM_DIALOG_CANCEL_TEXT: 'إلغاء',
        FORM_DIALOG_SAVE_TEXT: 'حفظ',
        FORM_DIALOG_CANCEL_TEXT: 'إلغاء',
        FILE_INPUT_MAX_ACCEPT_MESSAGE: 'يمكنك تحميل  {{maxFiles}} ملفات كحد أقصى',
        FILE_INPUT_REJECT_MESSAGE: 'تم رفض {{fileCount}} من الملفات',
        FILE_INPUT_PREVIEW_LABEL: 'معاينة',
        FILE_INPUT_DESCRIPTION: 'قم بسحب وإفلات بعض الملفات هنا أو انقر لتحديد الملفات',
    },
};
