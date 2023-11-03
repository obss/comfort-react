import { Autocomplete, NumberField, TextField, Checkbox, DataGrid, useSnackbar, IconButton } from '../../lib';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useEffect, useState } from 'react';
import jsxToString from 'jsx-to-string';
import CurrentRulesInfo from '../CurrentRulesInfo';
import './ComponentDataGrid.css';
import CurrentComponentApiInfo from '../CurrentComponentApiInfo';

function createData(id, name, calories, fat, carbs, protein) {
    return {
        id,
        name,
        defaultHidden: 'Row Data',
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
        header: 'Not Filterable Column',
        sortable: true,
        preventToBeHidden: true,
        filterContent: (
            <div>
                <TextField noHelperText style={{ width: '200px' }} />
            </div>
        ),
        filterIconPosition: 'right',
    },
    {
        key: 'defaultHidden',
        header: 'Default Hidden Column',
        defaultHidden: true,
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
        filterContent: (
            <div>
                <TextField noHelperText style={{ width: '200px' }} />
            </div>
        ),
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
        filterTitle: 'Protein (g)',
        filterContent: (
            <div>
                <TextField noHelperText style={{ width: '200px' }} />
            </div>
        ),
    },
];

const TABLE_SIZE = ['medium', 'small'];

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

const ComponentDataGrid = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [selected, setSelected] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState('My Awesome DataGrid Title');
    const [selectedColumnFilteringTitle, setSelectedColumnFilteringTitle] = useState();
    const [selectedSize, setSelectedSize] = useState();
    const [selectedRowHeight, setSelectedRowHeight] = useState(73);
    const [selectedHideColumnFiltering, setSelectedHideColumnFiltering] = useState(false);
    const [selectedToolbarRightContent, setSelectedToolbarRightContent] = useState(false);
    const [selectedHideToolbar, setSelectedHideToolbar] = useState(false);
    const [selectedEnableSelection, setSelectedEnableSelection] = useState(false);
    const [selectedEnableSelectionOnRowClick, setSelectedEnableSelectionOnRowClick] = useState(false);
    const [selectedCellClick, setSelectedCellClick] = useState(false);
    const [selectedLoading, setSelectedLoading] = useState(false);
    const [selectedCustomLoading, setSelectedCustomLoading] = useState(false);
    const [selectedCustomEmpty, setSelectedCustomEmpty] = useState(false);
    const [selectedClassName, setSelectedClassName] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedEnablePagination, setSelectedEnablePagination] = useState(true);
    const [sortConfig, setSortConfig] = useState([{ key: 'calories', order: 'asc' }]);
    const [finalDefinitions, setFinalDefinitions] = useState(definitions);
    const [dontWrapWithPaper, setDontWrapWithPaper] = useState(false);
    const [fillEmptyRows, setFillEmptyRows] = useState(false);
    const [selectedGetRowProps, setSelectedGetRowProps] = useState(false);
    const [renderAsDiv, setRenderAsDiv] = useState(false);
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        const definitionsWithButtons = [...definitions];
        definitionsWithButtons.push({
            key: 'operations',
            align: 'right',
            padding: 'normal',
            header: '',
            sortable: false,
            renderCell: (row, key) => (
                <IconButton onClick={(e) => handleEditButtonClick(e, row, key)}>
                    <EditIcon />
                </IconButton>
            ),
            filterTitle: 'Operations',
        });
        setFinalDefinitions(definitionsWithButtons);
    }, [definitions]);

    useEffect(() => {
        setSelected([]);
    }, [sortConfig]);

    const handleEditButtonClick = (e, row, key) => {
        e.stopPropagation();
        enqueueSnackbar(`Edit Clicked: ${key} ${row['name']}`, { variant: 'info' });
    };

    const handleSortChange = (key) => {
        const keyIndex = sortConfig.findIndex((sort) => sort.key === key);
        if (keyIndex === -1) {
            setSortConfig([{ key, order: 'asc' }]);
        } else {
            const newSortConfig = [...sortConfig];
            newSortConfig[keyIndex].order = newSortConfig[keyIndex].order === 'asc' ? 'desc' : 'asc';
            setSortConfig(newSortConfig);
        }
    };

    const handleCellClick = (row, key) => {
        enqueueSnackbar(`Cell clicked: ${key} ${row[key]}`, { variant: 'info' });
    };

    const toolbarRightContent = selectedToolbarRightContent ? <DeleteIcon /> : null;

    const sortedRows =
        sortConfig && sortConfig.length > 0
            ? data.slice().sort(getComparator(sortConfig[0].order, sortConfig[0].key))
            : data;
    const filteredRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const customLoadingComponent = <div className="custom-table-loading-component">Custom Loading Component</div>;
    const customEmptyComponent = <div className="custom-table-loading-component">Custom Empty Component</div>;

    const getRowProps = selectedGetRowProps
        ? (row, rowIndex) => {
              const customRowProps = { hover: true };
              if (rowIndex === 2) {
                  customRowProps.style = { backgroundColor: 'lightgreen' };
              }
              return customRowProps;
          }
        : null;

    const tableElementJsx = (
        <DataGrid
            identifierKey="id"
            page={page}
            rowsPerPage={rowsPerPage}
            totalRowCount={empty ? 0 : data.length}
            onPageChange={setPage}
            onRowsPerPage={setRowsPerPage}
            rows={empty ? [] : filteredRows}
            definitions={finalDefinitions}
            selected={selected}
            onSelectionChange={setSelected}
            className={selectedClassName ? 'exampleTableStyle' : ''}
            title={selectedTitle}
            columnFilteringTitle={selectedColumnFilteringTitle}
            hideColumnFiltering={selectedHideColumnFiltering}
            toolbarRightContent={toolbarRightContent}
            hideToolbar={selectedHideToolbar}
            enableSelection={selectedEnableSelection}
            enableSelectionOnRowClick={selectedEnableSelectionOnRowClick}
            size={selectedSize}
            rowHeight={selectedRowHeight}
            onCellClick={selectedCellClick ? handleCellClick : undefined}
            enablePagination={selectedEnablePagination}
            sortConfig={sortConfig}
            onSortChange={handleSortChange}
            loading={selectedLoading}
            loadingComponent={selectedCustomLoading ? customLoadingComponent : undefined}
            emptyComponent={selectedCustomEmpty ? customEmptyComponent : undefined}
            dontWrapWithPaper={dontWrapWithPaper}
            fillEmptyRows={fillEmptyRows}
            getRowProps={getRowProps}
            renderAsDiv={renderAsDiv}
        />
    );

    let currentJsx = jsxToString(tableElementJsx, {
        displayName: 'DataGrid',
        useFunctionCode: true,
        keyValueOverride: {
            toolbarRightContent: selectedToolbarRightContent ? '<DeleteIcon />' : null,
        },
    });
    currentJsx = "import { DataGrid } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="DataGrid" codeUrl={'components/components/ComponentDataGrid.js'}>
            {tableElementJsx}
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <TextField
                            label={'title'}
                            value={selectedTitle}
                            onChange={(newValue) => {
                                setSelectedTitle(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <TextField
                            label={'columnFilteringTitle'}
                            value={selectedColumnFilteringTitle}
                            onChange={(newValue) => {
                                setSelectedColumnFilteringTitle(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedSize}
                        options={TABLE_SIZE}
                        onChange={(val) => {
                            setSelectedSize(val);
                        }}
                        label={'size'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumberField
                        value={selectedRowHeight}
                        onChange={(val) => {
                            setSelectedRowHeight(val);
                        }}
                        label={'rowHeight'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'hideColumnFiltering'}
                            value={selectedHideColumnFiltering}
                            onChange={(newValue) => {
                                setSelectedHideColumnFiltering(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'toolbarRightContent'}
                            value={selectedToolbarRightContent}
                            onChange={(newValue) => {
                                setSelectedToolbarRightContent(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'hideToolbar'}
                            value={selectedHideToolbar}
                            onChange={(newValue) => {
                                setSelectedHideToolbar(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enableSelection'}
                            value={selectedEnableSelection}
                            onChange={(newValue) => {
                                setSelectedEnableSelection(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enableSelectionOnRowClick'}
                            value={selectedEnableSelectionOnRowClick}
                            onChange={(newValue) => {
                                setSelectedEnableSelectionOnRowClick(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'onCellClick'}
                            value={selectedCellClick}
                            onChange={(newValue) => {
                                setSelectedCellClick(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enablePagination'}
                            value={selectedEnablePagination}
                            onChange={(newValue) => {
                                setSelectedEnablePagination(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'loading'}
                            value={selectedLoading}
                            onChange={(newValue) => {
                                setSelectedLoading(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable custom loadingComponent'}
                            value={selectedCustomLoading}
                            onChange={(newValue) => {
                                setSelectedCustomLoading(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable classname style'}
                            value={selectedClassName}
                            onChange={(newValue) => {
                                setSelectedClassName(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'dontWrapWithPaper'}
                            value={dontWrapWithPaper}
                            onChange={(newValue) => {
                                setDontWrapWithPaper(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'fillEmptyRows'}
                            value={fillEmptyRows}
                            onChange={(newValue) => {
                                setFillEmptyRows(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'getRowProps'}
                            value={selectedGetRowProps}
                            onChange={(newValue) => {
                                setSelectedGetRowProps(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'renderAsDiv'}
                            value={renderAsDiv}
                            onChange={(newValue) => {
                                setRenderAsDiv(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'empty'}
                            value={empty}
                            onChange={(newValue) => {
                                setEmpty(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable custom emptyComponent'}
                            value={selectedCustomEmpty}
                            onChange={(newValue) => {
                                setSelectedCustomEmpty(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            <CurrentRulesInfo currentRules={currentJsx} dontStringify={true} header="Current Jsx" />
            <CurrentComponentApiInfo
                currentApiInfo={DataGridApiInfo}
                currentApiLinks={'https://mui.com/material-ui/react-table/#api'}
                header={'DataGrid API'}
                extraApiInfoHeader={'definitions API'}
                extraApiInfo={DefinitionsApiInfo}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentDataGrid;

const DataGridApiInfo = [
    {
        name: 'rows',
        type: 'Array',
        defaultValue: '[]',
        description: '',
    },
    {
        name: 'definitions',
        type: 'Array',
        defaultValue: '[]',
        description: '',
    },
    {
        name: 'page',
        type: 'Number',
        defaultValue: '0',
        description: '',
    },
    {
        name: 'rowsPerPage',
        type: 'Number',
        defaultValue: '5',
        description: '',
    },
    {
        name: 'totalRowCount',
        type: 'Number',
        defaultValue: '0',
        description: '',
    },
    {
        name: 'onRowsPerPage',
        type: 'Func',
        defaultValue: '() => {}',
        description: '',
    },
    {
        name: 'onPageChange',
        type: 'Func',
        defaultValue: '() => {}',
        description: '',
    },
    {
        name: 'className',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'paperClassName',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'tableContainerClassName',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'title',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'toolbarRightContent',
        type: 'Node',
        defaultValue: '',
        description: '',
    },
    {
        name: 'hideToolbar',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'size',
        type: 'String',
        defaultValue: 'medium',
        description: '',
    },
    {
        name: 'rowHeight',
        type: 'Number',
        defaultValue: '53',
        description: '',
    },
    {
        name: 'rowsPerPageOptions',
        type: 'Array',
        defaultValue: '[5, 10, 25]',
        description: '',
    },
    {
        name: 'toolbarProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'tableContainerProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'enablePagination',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
    {
        name: 'tablePaginationProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'enableSelection',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
    {
        name: 'selected',
        type: 'Array',
        defaultValue: '[]',
        description: '',
    },
    {
        name: 'onSelectedChange',
        type: 'Func',
        defaultValue: '() => {}',
        description: '',
    },
    {
        name: 'enableSelectionOnRowClick',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
    {
        name: 'identifierKey',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'onRowClick',
        type: 'Func',
        defaultValue: '() => {}',
        description: '',
    },
    {
        name: 'onCellClick',
        type: 'Func',
        defaultValue: '() => {}',
        description: '',
    },
    {
        name: 'sortConfig',
        type: 'Array',
        defaultValue: '[]',
        description: '',
    },
    {
        name: 'onShortChange',
        type: 'Func',
        defaultValue: '() => {}',
        description: '',
    },
    {
        name: 'tableHeadProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'tableBodyProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'afterTableComponent',
        type: 'Node',
        defaultValue: '',
        description: '',
    },
    {
        name: 'beforeTableComponent',
        type: 'Node',
        defaultValue: '',
        description: '',
    },
    {
        name: 'loading',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'loadingComponent',
        type: 'Node',
        defaultValue: '<CircularProgress />',
        description: '',
    },
    {
        name: 'hideColumnFiltering',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
    {
        name: 'columnFilteringTitle',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'dontWrapWithPaper',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'fillEmptyRows',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
    {
        name: 'getRowProps',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'renderAsDiv',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
    {
        name: 'filterColumnsIcon',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'filterDataIcon',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'emptyComponent',
        type: 'Node',
        defaultValue: 'No data to display',
        description: '',
    },
    {
        name: 'loadingDivProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'emptyDivProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
];

const DefinitionsApiInfo = [
    {
        name: 'key',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'align',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'padding',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'scope',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'component',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'renderCell',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'tableCellProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'sortable',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'header',
        type: 'String || Node',
        defaultValue: '',
        description: '',
    },
    {
        name: 'tableSortLabelProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'filterIconBoxClassName',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'filterIconBoxProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'filterContent',
        type: 'Node',
        defaultValue: '',
        description: '',
    },
    {
        name: 'filterIconPosition',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'className',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'tableHeaderCellProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
];
