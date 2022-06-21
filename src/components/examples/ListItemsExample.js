import { useEffect, useState } from 'react';
import {
    Autocomplete,
    Button,
    Checkbox,
    DatePicker,
    IconButton,
    NumberField,
    PhoneInput,
    RadioButton,
    Table,
    TextField,
    TimePicker,
    TransferList,
    useApi,
    useValidatableForm,
} from '../../lib';
import {
    Box,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { newsKeywords, newsTypes } from '../../miragejs/mock-data';
import { Add, Remove } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';

const initialFormData = {
    name: '',
    type: '',
    keywords: [],
    outdated: false,
    date: '',
    iban: '',
    callingCode: '',
    phone: '',
    vkn: '',
    tckn: '',
    website: '',
    price: '',
    email: '',
    greetings: '',
};

const rules = [
    { path: 'name', ruleSet: [{ rule: 'required' }, { rule: 'length', greaterThan: 4 }] },
    { path: 'type', ruleSet: [{ rule: 'required' }, { rule: 'equality', isOneOf: newsTypes }] },
    { path: 'keywords', ruleSet: [{ rule: 'required' }, { rule: 'listSize', greaterThan: 2 }] },
    { listPath: 'keywords', ruleSet: [{ rule: 'unique' }] },
    { path: 'outdated', ruleSet: [{ rule: 'required' }] },
    { path: 'date', ruleSet: [{ rule: 'required' }, { rule: 'date' }] },
    { path: 'iban', ruleSet: [{ rule: 'required' }, { rule: 'iban' }] },
    { path: 'time', ruleSet: [{ rule: 'required' }, { rule: 'time' }] },
    { path: 'phone', ruleSet: [{ rule: 'required' }, { rule: 'phoneNumber' }] },
    { path: 'vkn', ruleSet: [{ rule: 'required' }, { rule: 'vkn' }] },
    { path: 'tckn', ruleSet: [{ rule: 'required' }, { rule: 'tckn' }] },
    { path: 'website', ruleSet: [{ rule: 'required' }, { rule: 'url' }, { rule: 'includes', includes: '.com' }] },
    { path: 'price', ruleSet: [{ rule: 'required' }, { rule: 'number' }] },
    { path: 'email', ruleSet: [{ rule: 'required' }, { rule: 'email' }] },
    { path: 'greetings', ruleSet: [{ rule: 'required' }, { rule: 'regex', regex: /^Hello/ }] },
];

const definitions = [
    {
        key: 'name',
        align: 'center',
        padding: 'normal',
        header: 'Name',
        sortable: false,
    },
    {
        key: 'type',
        align: 'center',
        padding: 'normal',
        header: 'Type',
        sortable: false,
    },
    {
        key: 'outdated',
        align: 'center',
        padding: 'normal',
        header: 'Outdated',
        sortable: false,
        renderCell: (row) => {
            return <p>{row.outdated.toString()}</p>;
        },
    },
    {
        key: 'date',
        align: 'center',
        padding: 'normal',
        header: 'Date',
        sortable: false,
        renderCell: (row) => {
            return <p>{new Date(row.date).toDateString()}</p>;
        },
    },
    {
        key: 'price',
        align: 'center',
        padding: 'normal',
        header: 'Price',
        sortable: false,
    },
    {
        key: 'iban',
        align: 'center',
        padding: 'normal',
        header: 'Iban',
        sortable: false,
        defaultHidden: true,
    },
    {
        key: 'time',
        align: 'center',
        padding: 'normal',
        header: 'Time',
        sortable: false,
        defaultHidden: true,
    },
    {
        key: 'phoneNumber',
        align: 'center',
        padding: 'normal',
        header: 'Phone Number',
        sortable: false,
        defaultHidden: true,
    },
    {
        key: 'vkn',
        align: 'center',
        padding: 'normal',
        header: 'VKN',
        sortable: false,
        defaultHidden: true,
    },
    {
        key: 'tckn',
        align: 'center',
        padding: 'normal',
        header: 'TCKN',
        sortable: false,
        defaultHidden: true,
    },
    {
        key: 'website',
        align: 'center',
        padding: 'normal',
        header: 'Website',
        sortable: false,
        defaultHidden: true,
    },
    {
        key: 'email',
        align: 'center',
        padding: 'normal',
        header: 'Website',
        sortable: false,
        defaultHidden: true,
    },
    {
        key: 'greetings',
        align: 'center',
        padding: 'normal',
        header: 'Greeting Message',
        sortable: false,
        defaultHidden: true,
    },
    {
        key: 'keywords',
        align: 'center',
        padding: 'normal',
        header: 'Keywords',
        sortable: false,
        defaultHidden: true,
    },
];

const ListItemsExample = () => {
    const {
        setPathValue,
        getValue,
        getError,
        setFormData,
        formData,
        setFormIsSubmitted,
        setPathIsBlurred,
    } = useValidatableForm({
        rules,
        initialFormData,
        hideBeforeSubmit: true,
        showAfterBlur: true,
        focusToErrorAfterSubmit: true,
    });
    const [items, setItems] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [page, setPage] = useState(0);
    const [definitionsWithButtons, setFinalDefinitions] = useState(definitions);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchTest] = useState('');
    const [openedEditDialog, setOpenedEditDialog] = useState(false);
    const [addindNewItem, setAddingNewItem] = useState(false);
    const [deletingItem, setDeletingItem] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { loading, getRequest, postRequest, putRequest, deleteRequest } = useApi();
    const isMobile = useMediaQuery('(max-width:1024px)');

    const updateNewsDates = (news) => {
        news.forEach((element, index) => {
            news[index].date = new Date(element.date);
        });
        return news;
    };

    const getApiSuccess = (response) => {
        response.news = updateNewsDates(response.news);
        setRowsPerPage(parseInt(response.rowsPerPage));
        setPage(parseInt(response.page));
        setTotalItem(parseInt(response.total));
        setItems(response.news);
    };

    const removeItemOpenDialog = (item) => {
        setDeletingItem(item);
        setDeleteDialogOpen(true);
    };

    const removeItem = () => {
        deleteRequest({
            url: 'news',
            queryParams: { page: page, rowsPerPage: rowsPerPage },
            body: JSON.stringify(deletingItem),
            afterSuccess: (response) => {
                response.news = updateNewsDates(response.news);
                setItems(response.news);
                setDeletingItem(null);
                setDeleteDialogOpen(false);
            },
        });
    };

    const closeRemoveItemDialog = () => {
        setDeletingItem(null);
        setDeleteDialogOpen(false);
    };

    const editItem = () => {
        const submitResult = setFormIsSubmitted();
        if (submitResult) {
            putRequest({
                url: 'news',
                queryParams: { page: page, rowsPerPage: rowsPerPage },
                body: JSON.stringify(formData),
                afterSuccess: (response) => {
                    response.news = updateNewsDates(response.news);
                    setItems(response.news);
                    setOpenedEditDialog(false);
                },
            });
        }
    };

    const addItem = () => {
        const submitResult = setFormIsSubmitted();
        if (submitResult) {
            postRequest({
                url: 'news',
                queryParams: { page: page, rowsPerPage: rowsPerPage },
                body: JSON.stringify(formData),
                afterSuccess: (response) => {
                    response.news = updateNewsDates(response.news);
                    setItems(response.news);
                    setOpenedEditDialog(false);
                    setAddingNewItem(false);
                },
            });
        }
    };

    const closeDialog = () => {
        setOpenedEditDialog(false);
        setAddingNewItem(false);
    };

    const openEditDialog = (item) => {
        setFormData(item);
        setOpenedEditDialog(true);
    };

    const addNewItemDialog = () => {
        setFormData(initialFormData);
        setAddingNewItem(true);
        setOpenedEditDialog(true);
    };

    const openEditDialogWithSearchBar = (id) => {
        const index = items.findIndex((element) => element.id === id);
        setSearchTest(index);
        const item = items[index];
        setFormData(item);
        setOpenedEditDialog(true);
    };

    useEffect(() => {
        getRequest({ url: 'news', queryParams: { page: page, rowsPerPage: rowsPerPage }, afterSuccess: getApiSuccess });
    }, []);

    useEffect(() => {
        getRequest({
            url: 'news',
            queryParams: { page: page, rowsPerPage: rowsPerPage },
            afterSuccess: getApiSuccess,
        });
    }, [page, rowsPerPage]);

    useEffect(() => {
        const copyDefinitions = [...definitionsWithButtons];
        if (copyDefinitions.length === 14) {
            copyDefinitions.push({
                key: 'edit',
                align: 'center',
                padding: 'normal',
                header: 'Edit',
                sortable: false,
                renderCell: (row) => {
                    return (
                        <IconButton onClick={() => openEditDialog(row)}>
                            <EditIcon />
                        </IconButton>
                    );
                },
            });
            copyDefinitions.push({
                key: 'remove',
                align: 'center',
                padding: 'normal',
                header: 'Remove',
                sortable: false,
                renderCell: (row) => {
                    return (
                        <IconButton onClick={() => removeItemOpenDialog(row)}>
                            <Remove color={'error'} />
                        </IconButton>
                    );
                },
            });
        }
        setFinalDefinitions(copyDefinitions);
    }, [definitions, items]);

    return (
        <Container>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                pt={4}
                style={{ minHeight: '100vh' }}
            >
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Autocomplete
                        label={'Search'}
                        value={searchText}
                        onChange={(value) => openEditDialogWithSearchBar(value)}
                        options={items}
                        valueKey={'id'}
                        getOptionLabel={(options) => options.name}
                    />
                )}
                <Table
                    title={'Items'}
                    identifierKey={'id'}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(newPage) => setPage(newPage)}
                    onRowsPerPage={(newRowsPerPage) => setRowsPerPage(newRowsPerPage)}
                    totalRowCount={totalItem}
                    rows={items}
                    enablePagination={true}
                    loading={loading}
                    loadingComponent={<CircularProgress />}
                    definitions={definitionsWithButtons}
                />
                <Grid item justifySelf={'end'} alignSelf={'end'}>
                    <Button startIcon={<Add />} color={'success'} variant={'contained'} onClick={addNewItemDialog}>
                        Add New Item
                    </Button>
                </Grid>
            </Grid>
            <Dialog open={openedEditDialog} onClose={closeDialog}>
                <Grid container alignItems={'center'} justifyContent={'center'}>
                    <DialogTitle>
                        <Typography> {addindNewItem ? 'Add Item' : 'Edit Item'} </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Box m={1}>
                            <TextField
                                label={'Item Name'}
                                disabled={loading}
                                fullWidth
                                value={getValue('name')}
                                onChange={(value) => setPathValue('name', value)}
                                onBlur={() => setPathIsBlurred('name')}
                                errorMessage={getError('name')}
                            />
                            <TextField
                                label={'Email'}
                                disabled={loading}
                                fullWidth
                                value={getValue('email')}
                                onChange={(value) => setPathValue('email', value)}
                                onBlur={() => setPathIsBlurred('email')}
                                errorMessage={getError('email')}
                            />
                            <TextField
                                label={'Iban'}
                                disabled={loading}
                                fullWidth
                                value={getValue('iban')}
                                onChange={(value) => setPathValue('iban', value)}
                                onBlur={() => setPathIsBlurred('iban')}
                                errorMessage={getError('iban')}
                            />
                            <RadioButton
                                options={newsTypes}
                                disabled={loading}
                                fullWidth
                                label={'Item Type'}
                                value={getValue('type')}
                                onChange={(value) => setPathValue('type', value)}
                                onBlur={() => setPathIsBlurred('type')}
                                errorMessage={getError('type')}
                            />
                            {isMobile ? (
                                <Autocomplete
                                    options={newsKeywords}
                                    disabled={loading}
                                    multiple={true}
                                    fullWidth
                                    getOptionLabel={(options) => options.toString()}
                                    value={getValue('keywords')}
                                    onChange={(value) => setPathValue('keywords', value)}
                                    errorMessage={getError('keywords')}
                                />
                            ) : (
                                <TransferList
                                    options={newsKeywords}
                                    disabled={loading}
                                    fullWidth
                                    value={getValue('keywords')}
                                    onChange={(value) => setPathValue('keywords', value)}
                                    errorMessage={getError('keywords')}
                                />
                            )}
                            <Checkbox
                                label={'Outdated'}
                                disabled={loading}
                                value={getValue('outdated')}
                                onChange={(value) => setPathValue('outdated', value)}
                                onBlur={() => setPathIsBlurred('outdated')}
                            />
                            <DatePicker
                                fullWidth
                                label={'Item Date'}
                                disabled={loading}
                                value={new Date(getValue('date'))}
                                onChange={(value) => setPathValue('date', value)}
                                onBlur={() => setPathIsBlurred('date')}
                                errorMessage={getError('date')}
                            />
                            <TimePicker
                                fullWidth
                                label={'Time'}
                                disabled={loading}
                                value={getValue('time')}
                                onChange={(value) => setPathValue('time', value)}
                                onBlur={() => setPathIsBlurred('time')}
                                errorMessage={getError('time')}
                            />
                            <TextField
                                label={'VKN'}
                                disabled={loading}
                                fullWidth
                                value={getValue('vkn')}
                                onChange={(value) => setPathValue('vkn', value)}
                                onBlur={() => setPathIsBlurred('vkn')}
                                errorMessage={getError('vkn')}
                            />
                            <TextField
                                label={'Tckn'}
                                disabled={loading}
                                fullWidth
                                value={getValue('tckn')}
                                onChange={(value) => setPathValue('tckn', value)}
                                onBlur={() => setPathIsBlurred('tckn')}
                                errorMessage={getError('tckn')}
                            />
                            <TextField
                                label={'Website'}
                                disabled={loading}
                                fullWidth
                                value={getValue('website')}
                                onChange={(value) => setPathValue('website', value)}
                                onBlur={() => setPathIsBlurred('website')}
                                errorMessage={getError('website')}
                            />
                            <NumberField
                                fullWidth
                                label={'Item Price'}
                                disabled={loading}
                                value={getValue('price')}
                                onChange={(value) => setPathValue('price', value)}
                                onBlur={() => setPathIsBlurred('price')}
                                errorMessage={getError('price')}
                            />
                            <PhoneInput
                                label={'Phone Number'}
                                disabled={loading}
                                fullWidth
                                value={{
                                    callingCode: getValue('callingCode'),
                                    number: getValue('phone'),
                                }}
                                onChange={(value) => {
                                    setPathValue('callingCode', value.callingCode);
                                    setPathValue('phone', value.number);
                                }}
                                onBlur={() => setPathIsBlurred('phone')}
                                errorMessage={getError('phone')}
                            />
                            <TextField
                                label={'Greetings Message'}
                                disabled={loading}
                                fullWidth
                                value={getValue('greetings')}
                                onChange={(value) => setPathValue('greetings', value)}
                                onBlur={() => setPathIsBlurred('greetings')}
                                errorMessage={getError('greetings')}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={'contained'} loading={loading} onClick={addindNewItem ? addItem : editItem}>
                            {addindNewItem ? 'Add Item' : 'Save'}
                        </Button>
                    </DialogActions>
                </Grid>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={closeRemoveItemDialog}>
                <DialogTitle>
                    <Typography fontWeight={'bolder'}> Warning </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>Are you sure delete this item?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button loading={loading} onClick={closeRemoveItemDialog}>
                        Cancel
                    </Button>
                    <Button variant={'contained'} color={'error'} loading={loading} onClick={removeItem}>
                        Remove Item
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ListItemsExample;
