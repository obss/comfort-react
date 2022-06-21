import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuItem from '@mui/material/MenuItem';
import {
    Box,
    ListItemIcon,
    ListItemText,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead as MuiTableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar as MuiToolbar,
    Typography,
    Paper,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import Checkbox from './Checkbox';
import MenuButton from './MenuButton';
import { getClassName } from '../utils/ClassNameUtils';
import { isFunction } from '../utils/ControlUtils';
import useTranslation from '../hooks/useTranslation';

const DEFAULT_ROWS = [];
const DEFAULT_DEFINITIONS = [];
const DEFAULT_SELECTED = [];
const DEFAULT_ON_SELECTION_CHANGE = () => {};
const DEFAULT_ON_ROW_CLICK = () => {};
const DEFAULT_ON_CELL_CLICK = () => {};
const DEFAULT_SORT_CONFIG = [];
const DEFAULT_ON_SORT_CHANGE = () => {};
const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 5;
const DEFAULT_TOTAL_ROW_COUNT = 0;
const DEFAULT_ON_ROWS_PER_PAGE = () => {};
const DEFAULT_ON_PAGE_CHANGE = () => {};
const DEFAULT_PER_PAGE_OPTIONS = [5, 10, 25];
const DEFAULT_SIZE = 'medium';
const DEFAULT_ROW_HEIGHT = 53;
const DEFAULT_LOADING_COMPONENT = <CircularProgress />;

const DEFAULT_ALIGN = 'left';
const DEFAULT_PADDING = 'normal';

const getFilterTitle = (definition) => {
    return definition.filterTitle || definition.header;
};

const TableHead = (props) => {
    const {
        definitions,
        filteredColumns,
        onSelectAllClick,
        sortConfig,
        numSelected,
        rowCount,
        onSortChange,
        enableSelection,
        tableHeadProps,
    } = props;

    return (
        <MuiTableHead className="ComfortTableHead" {...tableHeadProps}>
            <TableRow>
                {enableSelection && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            noLabel
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            value={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputClassName="ComfortTableHead__selectAll__checkbox"
                        />
                    </TableCell>
                )}
                {definitions
                    .filter((d) => filteredColumns.includes(d.key))
                    .map((definition) => {
                        if (!definition.key) {
                            throw new Error('comfort-react error. all Table definitions must have a key');
                        }

                        const defKey = definition.key;

                        const keySortInfo = sortConfig.find((config) => config.key === defKey);
                        const order = keySortInfo ? keySortInfo.order : 'asc';

                        const headerCellContentJsx = definition.sortable ? (
                            <TableSortLabel
                                active={!!keySortInfo}
                                direction={order}
                                onClick={() => onSortChange(defKey)}
                                {...definition.tableSortLabelProps}
                            >
                                {definition.header}
                                {keySortInfo ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'asc' ? 'sorted ascending' : 'sorted descending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            definition.header
                        );

                        return (
                            <TableCell
                                key={defKey}
                                align={definition.align || DEFAULT_ALIGN}
                                padding={definition.padding || DEFAULT_PADDING}
                                sortDirection={order}
                                {...definition.tableHeaderCellProps}
                            >
                                {headerCellContentJsx}
                            </TableCell>
                        );
                    })}
            </TableRow>
        </MuiTableHead>
    );
};

TableHead.propTypes = {
    definitions: PropTypes.array,
    filteredColumns: PropTypes.array,
    numSelected: PropTypes.number.isRequired,
    onSortChange: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    sortConfig: PropTypes.array,
    rowCount: PropTypes.number.isRequired,
    tableHeadProps: PropTypes.object,
};

const TableToolbar = (props) => {
    const {
        filterableDefinitions,
        filteredColumns,
        onFilterChange,
        title,
        hideColumnFiltering,
        columnFilteringTitle,
        toolbarRightContent,
        toolbarProps,
    } = props;
    const { getLocalizedMessage } = useTranslation();

    const handleFilterClick = (key) => {
        const currentlyFiltered = filteredColumns.indexOf(key) !== -1;
        const newFilteredColumns = [...filteredColumns];
        if (currentlyFiltered) {
            if (newFilteredColumns.length > 1) {
                newFilteredColumns.splice(newFilteredColumns.indexOf(key), 1);
            }
        } else {
            newFilteredColumns.push(key);
        }
        onFilterChange(newFilteredColumns);
    };

    const filterMenuJsx = filterableDefinitions.map((definition) => {
        return (
            <MenuItem key={definition.key} onClick={() => handleFilterClick(definition.key)}>
                <ListItemIcon>
                    <Checkbox
                        noLabel
                        value={filteredColumns.indexOf(definition.key) !== -1}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText primary={`${getFilterTitle(definition)}`} />
            </MenuItem>
        );
    });

    const filterTableJsx = (
        <MenuButton isIconButton menuChildren={filterMenuJsx}>
            <Tooltip title={columnFilteringTitle || getLocalizedMessage('TABLE_COLUMN_FILTERING_TITLE')}>
                <FilterListIcon />
            </Tooltip>
        </MenuButton>
    );

    return (
        <MuiToolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
            className="ComfortTableToolbar"
            {...toolbarProps}
        >
            <Typography className="ComfortTableTitle" variant="h6" component="div">
                {title}
            </Typography>

            {toolbarRightContent}
            {!hideColumnFiltering ? filterTableJsx : undefined}
        </MuiToolbar>
    );
};

TableToolbar.propTypes = {
    filterableDefinitions: PropTypes.array,
    title: PropTypes.string,
    hideColumnFiltering: PropTypes.bool,
    columnFilteringTitle: PropTypes.string,
    toolbarRightContent: PropTypes.object,
    toolbarProps: PropTypes.object,
};

const Table = (props) => {
    const {
        rows = DEFAULT_ROWS,
        definitions = DEFAULT_DEFINITIONS,
        page = DEFAULT_PAGE,
        rowsPerPage = DEFAULT_ROWS_PER_PAGE,
        totalRowCount = DEFAULT_TOTAL_ROW_COUNT,
        onRowsPerPage = DEFAULT_ON_ROWS_PER_PAGE,
        onPageChange = DEFAULT_ON_PAGE_CHANGE,
        className,
        paperClassName,
        tableContainerClassName,
        tableClassName,
        title,
        toolbarRightContent,
        hideToolbar,
        size = DEFAULT_SIZE,
        rowHeight = DEFAULT_ROW_HEIGHT,
        rowsPerPageOptions = DEFAULT_PER_PAGE_OPTIONS,
        toolbarProps,
        tableContainerProps,
        enablePagination = false,
        tablePaginationProps,
        enableSelection = false,
        selected = DEFAULT_SELECTED,
        onSelectionChange = DEFAULT_ON_SELECTION_CHANGE,
        enableSelectionOnRowClick = false,
        identifierKey,
        onRowClick = DEFAULT_ON_ROW_CLICK,
        onCellClick = DEFAULT_ON_CELL_CLICK,
        sortConfig = DEFAULT_SORT_CONFIG,
        onSortChange = DEFAULT_ON_SORT_CHANGE,
        tableHeadProps,
        tableBodyProps,
        beforeTableComponent,
        afterTableComponent,
        loading,
        loadingComponent = DEFAULT_LOADING_COMPONENT,
        hideColumnFiltering = false,
        columnFilteringTitle,
        dontWrapWithPaper,
        ...rest
    } = props;
    const { getLocalizedMessage } = useTranslation();

    if (!identifierKey) {
        throw new Error('comfort-react error. Table: identifierKey prop is required');
    }

    const [filteredColumns, setFilteredColumns] = useState([]);
    const [filterableDefinitions, setFilterableDefinitions] = useState([]);

    useEffect(() => {
        const defaultFilteredColumns = definitions.filter((d) => !d.defaultHidden).map((definition) => definition.key);
        setFilteredColumns(defaultFilteredColumns);
        setFilterableDefinitions(definitions.filter((definition) => !definition.notFilterable));
    }, [definitions]);

    const _className = getClassName([className, 'ComfortTable']);
    const _paperClassName = getClassName([paperClassName, 'ComfortTable__paper']);
    const _tableContainerClassName = getClassName([tableContainerClassName, 'ComfortTable__tableContainer']);
    const _tableClassName = getClassName([tableClassName, 'ComfortTable__table']);

    const getRowId = (row) => {
        return row[identifierKey];
    };

    const handleSelectAllClick = (newValue) => {
        if (newValue) {
            const newSelected = rows.map((n) => getRowId(n));
            onSelectionChange(newSelected);
            return;
        }
        onSelectionChange([]);
    };

    const handleSelection = (row) => {
        const rowId = getRowId(row);
        const selectedIndex = selected.indexOf(rowId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, rowId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        onSelectionChange(newSelected);
    };

    const handleCheckboxClick = (value, row) => {
        handleSelection(row);
    };

    const handleRowClick = (event, row, rowIndex) => {
        if (enableSelection && enableSelectionOnRowClick) {
            handleSelection(row);
        }
        onRowClick(event, row, rowIndex);
    };

    const handleCellClick = (row, key, event) => {
        onCellClick(row, key, event);
    };

    const handleChangePage = (event, newPage) => {
        onPageChange(newPage);
        onSelectionChange([]);
    };

    const handleChangeRowsPerPage = (event) => {
        onRowsPerPage(parseInt(event.target.value, 10));
        onPageChange(0);
        onSelectionChange([]);
    };

    const isSelected = (rowKey) => selected.indexOf(rowKey) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalRowCount) : 0;
    const colCount = enableSelection ? definitions.length + 1 : definitions.length;

    const filledRowsJsx = rows.map((row, rowIndex) => {
        const rowKey = getRowId(row);
        const isItemSelected = isSelected(rowKey);

        return (
            <TableRow
                hover
                onClick={(event) => handleRowClick(event, row, rowIndex)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={rowKey}
                selected={isItemSelected}
            >
                {enableSelection && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            noLabel
                            value={isItemSelected}
                            onChange={(value, event) => handleCheckboxClick(value, row, event)}
                            inputClassName="ComfortTable__select__checkbox"
                        />
                    </TableCell>
                )}
                {definitions
                    .filter((d) => filteredColumns.includes(d.key))
                    .map((definition) => {
                        if (!definition.key) {
                            throw new Error('comfort-react error. all Table definitions must have a key');
                        }

                        const defKey = definition.key;
                        const value = row[defKey];
                        const align = definition.align || DEFAULT_ALIGN;
                        const padding = definition.padding || DEFAULT_PADDING;
                        const scope = definition.scope;
                        const component = definition.component;

                        let cellValue = value;
                        if (definition.renderCell) {
                            if (!isFunction(definition.renderCell)) {
                                throw new Error('comfort-react error. Table definition.renderCell must be a function');
                            }
                            cellValue = definition.renderCell(row, defKey, rowIndex);
                        }

                        return (
                            <TableCell
                                key={defKey}
                                component={component}
                                scope={scope}
                                padding={padding}
                                align={align}
                                onClick={(event) => handleCellClick(row, defKey, event)}
                                {...definition.tableCellProps}
                            >
                                {cellValue}
                            </TableCell>
                        );
                    })}
            </TableRow>
        );
    });

    const emptyRowJsx =
        emptyRows > 0 ? (
            <TableRow
                style={{
                    height: rowHeight * emptyRows,
                }}
            >
                <TableCell colSpan={colCount} />
            </TableRow>
        ) : undefined;

    const tableJsx = (
        <>
            {beforeTableComponent}
            {!hideToolbar && (
                <TableToolbar
                    filterableDefinitions={filterableDefinitions}
                    filteredColumns={filteredColumns}
                    onFilterChange={setFilteredColumns}
                    title={title}
                    hideColumnFiltering={hideColumnFiltering}
                    columnFilteringTitle={columnFilteringTitle}
                    toolbarRightContent={toolbarRightContent}
                    toolbarProps={toolbarProps}
                />
            )}
            <TableContainer className={_tableContainerClassName} {...tableContainerProps}>
                <MuiTable className={_tableClassName} size={size} {...rest}>
                    <TableHead
                        definitions={definitions}
                        filteredColumns={filteredColumns}
                        numSelected={selected.length}
                        sortConfig={sortConfig}
                        onSelectAllClick={handleSelectAllClick}
                        onSortChange={onSortChange}
                        rowCount={rows.length}
                        enableSelection={enableSelection}
                        tableHeadProps={tableHeadProps}
                    />
                    <TableBody className="ComfortTableBody" {...tableBodyProps}>
                        {loading ? (
                            <TableRow
                                style={{
                                    height: rowHeight * rowsPerPage,
                                }}
                                className="ComfortTableLoadingRow"
                            >
                                <TableCell colSpan={colCount} className="ComfortTableLoadingColumn">
                                    {loadingComponent}
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {filledRowsJsx}
                                {emptyRowJsx}
                            </>
                        )}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            {enablePagination && (
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={totalRowCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={getLocalizedMessage('TABLE_LABEL_ROWS_PER_PAGE')}
                    labelDisplayedRows={getLocalizedMessage('TABLE_LABEL_DISPLAYED_ROWS')}
                    getItemAriaLabel={getLocalizedMessage('TABLE_GET_ITEM_ARIA_LABEL')}
                    showFirstButton
                    showLastButton
                    {...tablePaginationProps}
                />
            )}
            {afterTableComponent}
        </>
    );

    const insideBoxJsx = dontWrapWithPaper ? tableJsx : <Paper className={_paperClassName}>{tableJsx}</Paper>;

    return <Box className={_className}>{insideBoxJsx}</Box>;
};

export default memo(Table);
