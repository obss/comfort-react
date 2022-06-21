import { mount } from '@cypress/react';
import { ComfortReactProvider, Table } from '../../src/lib';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';

describe('table tests', () => {
    it('mount test', () => {
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    totalRowCount={data.length}
                    definitions={definitions}
                    page={page}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
    });
    it('title test', () => {
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    totalRowCount={data.length}
                    definitions={definitions}
                    page={page}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get('.MuiTypography-root').contains('title text');
    });
    it('toolbar content test', () => {
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    totalRowCount={data.length}
                    definitions={definitions}
                    page={page}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get('.css-14covj4-MuiToolbar-root > svg').should('not.exist');
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    totalRowCount={data.length}
                    definitions={definitions}
                    toolbarRightContent={<Delete />}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get('.css-14covj4-MuiToolbar-root > svg').should('exist');
    });
    it('hide toolbar test', () => {
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    totalRowCount={data.length}
                    definitions={definitions}
                    rows={filteredRows}
                    title={'title text'}
                    hideToolbar={false}
                />
            </ComfortReactProvider>
        );
        cy.get('.MuiTypography-root').should('exist');
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    totalRowCount={data.length}
                    definitions={definitions}
                    rows={filteredRows}
                    title={'title text'}
                    hideToolbar={true}
                />
            </ComfortReactProvider>
        );
        cy.get('.MuiTypography-root').should('not.exist');
    });
    it('enable selection test', () => {
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    totalRowCount={data.length}
                    definitions={definitions}
                    enableSelection={false}
                    enableSelectionOnRowClick={false}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get(
            '.MuiTableBody-root > :nth-child(1) > .MuiTableCell-paddingCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input'
        ).should('not.exist');
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    totalRowCount={data.length}
                    definitions={definitions}
                    enableSelection={true}
                    rows={filteredRows}
                    title={'title text'}
                    hideToolbar={false}
                />
            </ComfortReactProvider>
        );
        cy.get(
            '.MuiTableBody-root > :nth-child(1) > .MuiTableCell-paddingCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input'
        ).should('exist');
    });
    it('cell click test', () => {
        const handleClick = () => {
            alert('clicked');
        };
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.contains('Gingerbread').click();
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    onCellClick={handleClick}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.contains('Gingerbread').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('clicked');
        });
    });
    it('pagination test', () => {
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    enablePagination={false}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get('.MuiTablePagination-actions').should('not.exist');
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    enablePagination={true}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get('.MuiTablePagination-actions').should('exist');
    });
    it('loading test', () => {
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    enablePagination={false}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    loading={false}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.contains('Gingerbread').should('exist');
        cy.get('.MuiCircularProgress-svg').should('not.exist');
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    enablePagination={false}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    loading={true}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.contains('Gingerbread').should('not.exist');
        cy.get('.MuiCircularProgress-svg').should('exist');
    });
    it('edit test', () => {
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    enablePagination={false}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    loading={false}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get(':nth-child(1) > :nth-child(6) > .MuiButtonBase-root > [data-testid="EditIcon"]').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('edit clicked');
        });
    });
    it('filter test', () => {
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    enablePagination={false}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    hideColumnFiltering={true}
                    loading={false}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get('.ComfortMenuButton > .MuiButtonBase-root').should('not.exist');
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    enablePagination={false}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    hideColumnFiltering={false}
                    loading={false}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get('.ComfortMenuButton > .MuiButtonBase-root').click();
        cy.contains('Dessert (100g serving)').should('exist');
        cy.contains('Calories').should('exist');
        cy.contains('Fat (g)').should('exist');
        cy.contains('Carbs (g)').should('exist');
        cy.contains('Protein (g)').should('exist');
        cy.contains('Operations').should('exist');
    });
    it('enable selection on row test', () => {
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    enablePagination={false}
                    totalRowCount={data.length}
                    definitions={definitions}
                    enableSelection={true}
                    enableSelectionOnRowClick={false}
                    size={'medium'}
                    loading={false}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
    });
    it('asc test', () => {
        const page = 1;
        const rowsPerPage = 5;
        let sortConfig = [{ key: 'calories', order: 'asc' }];
        let sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        let filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get('.MuiTableBody-root > :nth-child(1) > .MuiTableCell-alignLeft').should('have.html', 'Gingerbread');
        sortConfig = [{ key: 'calories', order: 'desc' }];
        sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get('.MuiTableBody-root > :nth-child(1) > .MuiTableCell-alignLeft').should('have.html', 'Jelly Bean');
    });
    it('size test', () => {
        const page = 1;
        const rowsPerPage = 5;
        const sortConfig = [{ key: 'calories', order: 'asc' }];
        const sortedRows =
            sortConfig && sortConfig.length > 0
                ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
                : data;
        const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'medium'}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get('.MuiTableBody-root > :nth-child(1) > .MuiTableCell-alignLeft').should('have.css', 'padding', '16px');
        mount(
            <ComfortReactProvider>
                <Table
                    id={'table'}
                    identifierKey={'id'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    totalRowCount={data.length}
                    definitions={definitions}
                    size={'small'}
                    rows={filteredRows}
                    title={'title text'}
                />
            </ComfortReactProvider>
        );
        cy.get('.MuiTableBody-root > :nth-child(1) > .MuiTableCell-alignLeft').should(
            'have.css',
            'padding',
            '6px 16px'
        );
    });
});

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function createData(id, name, calories, fat, carbs, protein) {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const data = [
    createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
    createData(2, 'Donut', 452, 25.0, 51, 4.9),
    createData(3, 'Eclair', 262, 16.0, 24, 6.0),
    createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
    createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
    createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
    createData(9, 'KitKat', 518, 26.0, 65, 7.0),
    createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
    createData(11, 'Marshmallow', 318, 0, 81, 2.0),
    createData(12, 'Nougat', 360, 19.0, 9, 37.0),
    createData(13, 'Oreo', 437, 18.0, 63, 4.0),
];

const definitions = [
    {
        key: 'name',
        align: 'left',
        padding: 'normal',
        header: 'Dessert (100g serving)',
        sortable: true,
    },
    {
        key: 'calories',
        align: 'right',
        padding: 'normal',
        header: 'Calories',
        sortable: true,
    },
    {
        key: 'fat',
        align: 'right',
        padding: 'normal',
        header: 'Fat (g)',
        renderCell: (row, key) => <b>{`${row[key]} g`}</b>,
    },
    {
        key: 'carbs',
        align: 'right',
        padding: 'normal',
        header: 'Carbs (g)',
    },
    {
        key: 'protein',
        align: 'right',
        padding: 'normal',
        header: <b>Protein (g)</b>,
        sortable: true,
    },
    {
        key: 'operations',
        align: 'right',
        padding: 'normal',
        header: '',
        sortable: false,
        renderCell: (row, key) => (
            <IconButton onClick={(e) => handleEditButtonClick(e)}>
                <Edit />
            </IconButton>
        ),
        filterTitle: 'Operations',
    },
];

const handleEditButtonClick = (e) => {
    e.stopPropagation();
    alert('edit clicked');
};
