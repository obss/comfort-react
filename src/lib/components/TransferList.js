import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Paper, FormHelperText, Typography } from '@mui/material';
import { getClassName } from '../utils/ClassNameUtils';
import Button from './Button';
import Checkbox from './Checkbox';
import useHelperText from '../hooks/useHelperText';
import useSortableOptions from '../hooks/useSortableOptions';
import useOnBlur from '../hooks/useOnBlur';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function mapValueKey(a, key) {
    if (key) {
        return a.map((value) => value[key]);
    }
    return a;
}

function getValueByValueKey(a, key) {
    if (key) {
        return a[key];
    }
    return a;
}

const defaultOptions = [];
const defaultOptionLabel = (option) => option.label;

const TransferList = (props) => {
    const {
        id,
        valueKey,
        getOptionLabel = valueKey ? defaultOptionLabel : undefined,
        className,
        headerClassName,
        paperClassName,
        leftHeader = '',
        noHelperText,
        onChange,
        onBlur,
        options = defaultOptions,
        path,
        rightHeader = '',
        setPathIsBlurred,
        setPathValue,
        sortAlphabetically = false,
        value,
        disabled = false,
        errorMessage,
        renderErrorMessage,
        checkboxProps,
        buttonStyleProps,
        getOptionDisabled,
    } = props;
    const helperText = useHelperText({ errorMessage, noHelperText, renderErrorMessage });
    const sortedOptions = useSortableOptions({ options, sortAlphabetically, getOptionLabel, valueKey });
    const handleOnBlur = useOnBlur({ setPathIsBlurred, onBlur, id, path });
    const [checked, setChecked] = useState([]);
    const _className = getClassName([className, 'ComfortTransferList']);
    const _headerClassName = getClassName([headerClassName, 'ComfortTransferListHeader']);
    const _paperClassName = getClassName([paperClassName, 'ComfortTransferListPaper']);

    const getValue = () => {
        const defaultValue = [];
        if (value) {
            if (valueKey) {
                return sortedOptions.filter((option) => value.includes(option[valueKey])) || [];
            }
            return value;
        }
        return defaultValue;
    };

    const valueToBeUsed = getValue();

    const leftItems = sortedOptions.filter((o) => {
        return !mapValueKey(valueToBeUsed, valueKey).includes(getValueByValueKey(o, valueKey));
    });
    const rightItems = sortedOptions.filter((o) => {
        return mapValueKey(valueToBeUsed, valueKey).includes(getValueByValueKey(o, valueKey));
    });

    const leftChecked = intersection(checked, leftItems);
    const rightChecked = intersection(checked, rightItems);

    const handleToggle = (toggleValue) => {
        const currentIndex = checked.indexOf(toggleValue);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(toggleValue);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleOnChange = (val) => {
        if (setPathValue && onChange) {
            throw new Error('Only one of setPathValue or onChange props should be passed');
        }
        if (setPathValue) {
            setPathValue(path, val);
        } else if (onChange) {
            onChange(val);
        } else {
            throw new Error('Either one of setPathValue or onChange props should be passed');
        }
    };

    const handleAllRight = () => {
        const result = mapValueKey(rightItems.concat(leftItems), valueKey);
        handleOnChange(result);
    };

    const handleCheckedRight = () => {
        setChecked(not(checked, leftChecked));
        const result = mapValueKey(rightItems.concat(leftChecked), valueKey);
        handleOnChange(result);
    };

    const handleCheckedLeft = () => {
        setChecked(not(checked, rightChecked));
        const result = mapValueKey(not(rightItems, rightChecked), valueKey);
        handleOnChange(result);
    };

    const handleAllLeft = () => {
        handleOnChange([]);
    };

    const isOptionDisabled = (option) => {
        if (disabled) {
            return true;
        }
        if (getOptionDisabled) {
            return getOptionDisabled(option);
        }
        return false;
    };

    const customList = (header, items) => (
        <Paper className={_paperClassName}>
            <Typography className={_headerClassName}>{header}</Typography>
            <List dense component="div" role="list">
                {items.map((option) => {
                    let currentId = null;
                    if (valueKey) {
                        currentId = option[valueKey];
                    } else {
                        currentId = option;
                    }
                    let label = null;
                    if (typeof option === 'string') {
                        label = option;
                    } else {
                        label = getOptionLabel(option);
                    }

                    const labelId = `transfer-list-item-${currentId}-label`;

                    return (
                        <ListItem
                            key={currentId}
                            role="listitem"
                            button
                            onClick={() => handleToggle(option)}
                            disabled={isOptionDisabled(option)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    noLabel
                                    disabled={isOptionDisabled(option)}
                                    value={checked.indexOf(option) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    {...checkboxProps}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${label}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <div id={id || path} className={_className} onBlur={handleOnBlur}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>{customList(leftHeader, leftItems)}</Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            sx={{ my: 0.5, ...buttonStyleProps }}
                            variant="outlined"
                            size="small"
                            onClick={handleAllRight}
                            disabled={disabled || leftItems.length === 0}
                            aria-label="move all right"
                        >
                            ≫
                        </Button>
                        <Button
                            sx={{ my: 0.5, ...buttonStyleProps }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedRight}
                            disabled={disabled || leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            sx={{ my: 0.5, ...buttonStyleProps }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedLeft}
                            disabled={disabled || rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                        <Button
                            sx={{ my: 0.5, ...buttonStyleProps }}
                            variant="outlined"
                            size="small"
                            onClick={handleAllLeft}
                            disabled={disabled || rightItems.length === 0}
                            aria-label="move all left"
                        >
                            ≪
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>{customList(rightHeader, rightItems)}</Grid>
            </Grid>
            <FormHelperText error={!!errorMessage}>{helperText}</FormHelperText>
        </div>
    );
};

TransferList.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    headerClassName: PropTypes.string,
    paperClassName: PropTypes.string,
    getOptionLabel: PropTypes.func,
    leftHeader: PropTypes.string,
    noHelperText: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    options: PropTypes.array,
    path: PropTypes.string,
    rightHeader: PropTypes.string,
    setPathValue: PropTypes.func,
    setPathIsBlurred: PropTypes.func,
    errorMessage: PropTypes.string,
    value: PropTypes.array,
    valueKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    renderErrorMessage: PropTypes.func,
    getOptionDisabled: PropTypes.func,
};

export default memo(TransferList);
