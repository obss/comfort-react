import React, { memo } from 'react';
import { useMediaQuery } from '@mui/material';
import { Autocomplete, TransferList } from '../index';

const ShrinkableTransferList = (props) => {
    const mobileWidth = props.mobileWidth;
    const isMobile = useMediaQuery(`(max-width:${mobileWidth ? mobileWidth : 1024}px)`);
    const AlternativeComponent = isMobile ? Autocomplete : TransferList;
    const {
        rightHeader,
        leftHeader,
        headerClassName,
        paperClassName,
        checkBoxProps,
        buttonStyleProps,
        ...rest
    } = props;
    delete rest.rightHeader;
    delete rest.leftHeader;
    delete rest.mobileWidth;
    delete rest.multiple;
    let specificProps = null;
    if (isMobile) {
        specificProps = { multiple: true };
    } else {
        specificProps = { rightHeader, leftHeader, headerClassName, paperClassName, checkBoxProps, buttonStyleProps };
    }
    return <AlternativeComponent {...rest} {...specificProps} />;
};

export default memo(ShrinkableTransferList);
