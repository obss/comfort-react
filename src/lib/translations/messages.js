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
        DATE_PICKER_INPUT_FORMAT_WITH_TIME: 'dd/MM/yyyy HH:mm',
        DATE_PICKER_OK_TEXT: 'Tamam',
        DATE_PICKER_CANCEL_TEXT: 'İptal',
        DATE_PICKER_FIELD_DAY_PLACEHOLDER: 'GG',
        DATE_PICKER_FIELD_MONTH_NON_LETTER_PLACEHOLDER: 'AA',
        DATE_PICKER_FIELD_MONTH_LETTER_PLACEHOLDER: 'AAAA',
        TABLE_LABEL_ROWS_PER_PAGE: 'Sayfa başına satır sayısı:',
        TABLE_LABEL_DISPLAYED_ROWS: ({ from, to, count }) => `${count} sonuçtan ${from}-${to} arası`,
        TABLE_GET_ITEM_ARIA_LABEL: (type) => `${PAGE_TYPE_MAP_TR[type]} sayfaya git`,
        TABLE_COLUMN_FILTERING_TITLE: 'Kolonları Filtrele',
        TABLE_FILTERING_TITLE: 'Filtrele',
        TABLE_EMPTY_MESSAGE: 'Gösterilecek veri yok',
        CONFIRM_DIALOG_CONFIRM_TEXT: 'Onayla',
        CONFIRM_DIALOG_CANCEL_TEXT: 'İptal',
        FORM_DIALOG_SAVE_TEXT: 'Kaydet',
        FORM_DIALOG_CANCEL_TEXT: 'İptal',
        FILE_INPUT_MAX_ACCEPT_MESSAGE: 'En fazla {{maxFiles}} dosya yükleyebilirsiniz',
        FILE_INPUT_MAX_FILE_SIZE_MESSAGE: 'En fazla {{maxFileSizeInBytes}} byte boyutunda dosya yükleyebilirsiniz',
        FILE_INPUT_MAX_TOTAL_FILE_SIZE_MESSAGE:
            'Dosyaların toplam boyutu en fazla {{maxTotalFileSizeInBytes}} byte boyutunda olabilir',
        FILE_INPUT_REJECT_MESSAGE: '{{fileCount}} adet dosya reddedildi',
        FILE_INPUT_PREVIEW_LABEL: 'Önizle',
        FILE_INPUT_DESCRIPTION: 'Dosyaları buraya sürükleyip bırakın veya dosyaları seçmek için tıklayın',
    },
    en: {
        DECIMAL_SEPARATOR: '.',
        THOUSAND_SEPARATOR: ',',
        AUTOCOMPLETE_LOADING_TEXT: 'Loading...',
        DATE_PICKER_INPUT_FORMAT: 'MM/dd/yyyy',
        DATE_PICKER_INPUT_FORMAT_WITH_TIME: 'MM/dd/yyyy HH:mm',
        DATE_PICKER_OK_TEXT: 'OK',
        DATE_PICKER_CANCEL_TEXT: 'Cancel',
        DATE_PICKER_FIELD_DAY_PLACEHOLDER: 'DD',
        DATE_PICKER_FIELD_MONTH_NON_LETTER_PLACEHOLDER: 'MM',
        DATE_PICKER_FIELD_MONTH_LETTER_PLACEHOLDER: 'MMMM',
        TABLE_LABEL_ROWS_PER_PAGE: 'Rows per page:',
        TABLE_LABEL_DISPLAYED_ROWS: ({ from, to, count }) => {
            return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
        },
        TABLE_GET_ITEM_ARIA_LABEL: (type) => `Go to ${PAGE_TYPE_MAP_EN[type]} page`,
        TABLE_COLUMN_FILTERING_TITLE: 'Filter Columns',
        TABLE_FILTERING_TITLE: 'Filter',
        TABLE_EMPTY_MESSAGE: 'No data to display',
        CONFIRM_DIALOG_CONFIRM_TEXT: 'Confirm',
        CONFIRM_DIALOG_CANCEL_TEXT: 'Cancel',
        FORM_DIALOG_SAVE_TEXT: 'Save',
        FORM_DIALOG_CANCEL_TEXT: 'Cancel',
        FILE_INPUT_MAX_ACCEPT_MESSAGE: 'You can upload max {{maxFiles}} files',
        FILE_INPUT_MAX_FILE_SIZE_MESSAGE: 'You can upload files up to {{maxFileSizeInBytes}} bytes.',
        FILE_INPUT_MAX_TOTAL_FILE_SIZE_MESSAGE:
            'The total size of the files can be up to {{maxTotalFileSizeInBytes}} bytes.',
        FILE_INPUT_REJECT_MESSAGE: '{{fileCount}} files rejected',
        FILE_INPUT_PREVIEW_LABEL: 'Preview',
        FILE_INPUT_DESCRIPTION: 'Drag and drop some files here or click to select files',
    },
    ar: {
        DECIMAL_SEPARATOR: '.',
        THOUSAND_SEPARATOR: ',',
        AUTOCOMPLETE_LOADING_TEXT: 'جار التحميل...',
        DATE_PICKER_INPUT_FORMAT: 'MM/dd/yyyy',
        DATE_PICKER_INPUT_FORMAT_WITH_TIME: 'MM/dd/yyyy HH:mm',
        DATE_PICKER_OK_TEXT: 'نعم',
        DATE_PICKER_CANCEL_TEXT: 'يلغي',
        DATE_PICKER_FIELD_DAY_PLACEHOLDER: 'DD',
        DATE_PICKER_FIELD_MONTH_NON_LETTER_PLACEHOLDER: 'MM',
        DATE_PICKER_FIELD_MONTH_LETTER_PLACEHOLDER: 'MMMM',
        TABLE_LABEL_ROWS_PER_PAGE: 'عدد الصفوف في الصفحة:',
        TABLE_LABEL_DISPLAYED_ROWS: ({ from, to, count }) => {
            return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
        },
        TABLE_GET_ITEM_ARIA_LABEL: (type) => `Go to ${PAGE_TYPE_MAP_AR[type]} page`,
        TABLE_COLUMN_FILTERING_TITLE: 'أعمدة التصفية',
        TABLE_FILTERING_TITLE: 'منقي',
        TABLE_EMPTY_MESSAGE: 'لا توجد بيانات للعرض',
        CONFIRM_DIALOG_CONFIRM_TEXT: 'تؤكد',
        CONFIRM_DIALOG_CANCEL_TEXT: 'إلغاء',
        FORM_DIALOG_SAVE_TEXT: 'حفظ',
        FORM_DIALOG_CANCEL_TEXT: 'إلغاء',
        FILE_INPUT_MAX_ACCEPT_MESSAGE: 'يمكنك تحميل  {{maxFiles}} ملفات كحد أقصى',
        FILE_INPUT_MAX_FILE_SIZE_MESSAGE: 'يمكنك تحميل ملفات يصل حجمها إلى {{maxFileSizeInBytes}} بايت.',
        FILE_INPUT_MAX_TOTAL_FILE_SIZE_MESSAGE:
            'يمكن أن يصل الحجم الإجمالي للملفات إلى {{maxTotalFileSizeInBytes}} بايت.',
        FILE_INPUT_REJECT_MESSAGE: 'تم رفض {{fileCount}} من الملفات',
        FILE_INPUT_PREVIEW_LABEL: 'معاينة',
        FILE_INPUT_DESCRIPTION: 'قم بسحب وإفلات بعض الملفات هنا أو انقر لتحديد الملفات',
    },
};
