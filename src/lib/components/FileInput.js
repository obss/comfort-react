import React, { useState, memo } from 'react';
import numeral from 'numeral';
import { useSnackbar } from 'notistack';
import Dropzone from 'react-dropzone';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    FormHelperText,
    ListItem,
    Paper,
    Tooltip,
} from '@mui/material';
import '../styles/FileInput.css';
import { Clear, Close, InsertDriveFile, FileDownload as FileDownloadIcon } from '@mui/icons-material';
import { IconButton } from '../index';
import { getClassName } from '../utils/ClassNameUtils';
import PropTypes from 'prop-types';
import Switch from './Switch';
import useTranslation from '../hooks/useTranslation';
import useHelperText from '../hooks/useHelperText';

export function fData(number) {
    return numeral(number).format('0.0 b');
}

const DEFAULT_LOADING_COMPONENT = <CircularProgress />;

const FileInput = ({
    id,
    path,
    label,
    description,
    value,
    fullWidth,
    onChange,
    onDownload,
    disabled,
    onBlur,
    setPathIsBlurred,
    setPathValue,
    onReject,
    previewLabel,
    hidePreviewArea,
    errorMessage,
    noHelperText,
    accept,
    maxFiles = 1,
    maxTotalFileSizeInBytes = 0,
    maxFileSizeInBytes = 0,
    loading,
    loadingComponent = DEFAULT_LOADING_COMPONENT,
    width,
    height = '100%',
    removePadding = true,
    renderErrorMessage,
    hideErrorMessage = false,
    cardClassName,
    uploadAreaClassName,
    ...rest
}) => {
    const helperText = useHelperText({ errorMessage, noHelperText, renderErrorMessage });
    const { enqueueSnackbar } = useSnackbar();
    const { getLocalizedMessage } = useTranslation();
    const [showPreview, setShowPreview] = useState(false);
    const _className = getClassName([cardClassName, 'ComfortFileInputUploadCard', errorMessage ? 'hasError' : '']);
    const _uploadClassName = getClassName([uploadAreaClassName, 'ComfortFileInputUploadArea']);

    const isMultiple = maxFiles && maxFiles > 1;

    const getFinalValueArray = () => {
        if (value) {
            if (isMultiple) {
                if (Array.isArray(value)) {
                    return value;
                } else {
                    throw new Error('FileInput value should be an array if maxFiles > 1');
                }
            } else {
                if (Array.isArray(value)) {
                    throw new Error('FileInput value should not be an array if maxFiles = 1');
                } else {
                    return [value];
                }
            }
        }
        return [];
    };

    const handleDropMultiFile = ({ files }) => {
        let copyValue = [...getFinalValueArray()];
        if (maxFileSizeInBytes) {
            if (
                copyValue.some((element) => element.size > maxFileSizeInBytes) ||
                files.some((element) => element.size > maxFileSizeInBytes)
            ) {
                enqueueSnackbar(getLocalizedMessage('FILE_INPUT_MAX_FILE_SIZE_MESSAGE', { maxFileSizeInBytes }), {
                    variant: 'error',
                });
                return;
            }
        }

        if (maxTotalFileSizeInBytes) {
            const sumOfBytes =
                copyValue.reduce((total, element) => total + element.size, 0) +
                files.reduce((total, element) => total + element.size, 0);
            if (sumOfBytes > maxTotalFileSizeInBytes) {
                enqueueSnackbar(
                    getLocalizedMessage('FILE_INPUT_MAX_TOTAL_FILE_SIZE_MESSAGE', { maxTotalFileSizeInBytes }),
                    {
                        variant: 'error',
                    }
                );
                return;
            }
        }

        if (isMultiple) {
            const newLength = copyValue.length + files.length;
            if (newLength > maxFiles) {
                enqueueSnackbar(getLocalizedMessage('FILE_INPUT_MAX_ACCEPT_MESSAGE', { maxFiles }), {
                    variant: 'error',
                });
                return;
            }
        } else {
            copyValue = [];
        }
        files.forEach((file) => {
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            });
            copyValue.push(file);
        });
        handleOnChange(copyValue);
    };

    const handleRemove = (file) => {
        let copyValue = [...getFinalValueArray()];
        const newFiles = copyValue.filter((element) => element !== file);
        handleOnChange(newFiles);
    };

    const handleOnChange = (newFiles) => {
        if (setPathValue && onChange) {
            throw new Error('Only one of setPathValue or onChange props should be passed');
        }

        if (setPathValue) {
            if (isMultiple) {
                setPathValue(path, newFiles);
            } else {
                if (newFiles.length > 0) {
                    setPathValue(path, newFiles[0]);
                } else {
                    setPathValue(path, null);
                }
            }
        } else if (onChange) {
            if (isMultiple) {
                onChange(newFiles);
            } else {
                if (newFiles.length > 0) {
                    onChange(newFiles[0]);
                } else {
                    onChange(null);
                }
            }
        } else {
            throw new Error('Either one of setPathValue or onChange props should be passed');
        }
    };

    const handleOnBlur = () => {
        if (setPathIsBlurred && onBlur) {
            throw new Error('Only one of setPathIsBlurred or onBlur props should be passed');
        }
        if (setPathIsBlurred) {
            setPathIsBlurred(id || path);
        } else if (onBlur) {
            onBlur();
        }
    };

    const handleReject = (files) => {
        if (onReject) {
            onReject(files);
        } else {
            enqueueSnackbar(getLocalizedMessage('FILE_INPUT_REJECT_MESSAGE', { fileCount: files.length }), {
                variant: 'error',
            });
        }
    };

    const handleDownload = (file) => {
        if (onDownload) {
            onDownload(file);
        } else {
            const fileUrl = URL.createObjectURL(file);
            window.open(fileUrl);
        }
    };

    return (
        <Card
            id={id || path}
            className={_className}
            onBlur={handleOnBlur}
            sx={{
                width: fullWidth ? '100%' : width,
                height: height,
            }}
        >
            <CardHeader
                title={label}
                action={
                    hidePreviewArea ? undefined : (
                        <Switch
                            value={showPreview}
                            onChange={(newValue) => setShowPreview(newValue)}
                            label={previewLabel ? previewLabel : getLocalizedMessage('FILE_INPUT_PREVIEW_LABEL')}
                        />
                    )
                }
                className={'ComfortFileInputHeader'}
            />
            <CardContent className={'ComfortFileInputCardContent'}>
                <UploadMultiFile
                    className={_uploadClassName}
                    showPreview={showPreview}
                    files={value}
                    description={description}
                    disabled={disabled}
                    onReject={(files) => {
                        handleReject(files);
                    }}
                    onDrop={(files) => {
                        handleDropMultiFile({ files: files });
                    }}
                    onRemove={(file) => {
                        handleRemove(file);
                    }}
                    accept={accept}
                    maxFiles={maxFiles}
                    loading={loading}
                    loadingComponent={loadingComponent}
                    removePadding={removePadding}
                    {...rest}
                />
            </CardContent>
            <Box px={4}>
                {!hideErrorMessage && <FormHelperText error={!!errorMessage}>{helperText}</FormHelperText>}
            </Box>
            <Box px={4}>
                {!showPreview &&
                    getFinalValueArray().map((file, index) => {
                        return (
                            <Card key={index} className={'ComfortFileInputUploadCardPreview'}>
                                <CardHeader
                                    className={'ComfortFileInputUploadCardPreviewHeader'}
                                    avatar={<InsertDriveFile />}
                                    title={file.name}
                                    subheader={fData(file.size)}
                                    action={
                                        <>
                                            <IconButton
                                                className={'ComfortFileInputUploadCardPreviewDownloadButton'}
                                                onClick={() => handleDownload(file)}
                                            >
                                                <FileDownloadIcon />
                                            </IconButton>
                                            <IconButton
                                                className={'ComfortFileInputUploadCardPreviewRemoveButton'}
                                                disabled={disabled || loading}
                                                onClick={() => handleRemove(file)}
                                            >
                                                <Clear />
                                            </IconButton>
                                        </>
                                    }
                                />
                            </Card>
                        );
                    })}
            </Box>
            <Box px={4}>
                {showPreview &&
                    getFinalValueArray().length > 0 &&
                    getFinalValueArray().map((element, index) => {
                        return (
                            <ListItem key={index} className={'ComfortFileInputUploadCardPreviewList'}>
                                {element.type.includes('image/') ? (
                                    <Tooltip title={element.name}>
                                        <Paper
                                            variant="outlined"
                                            component={'img'}
                                            src={element.preview}
                                            className={'ComfortFileInputUploadCardPreviewListPaper'}
                                            onClick={() => handleDownload(element)}
                                        />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title={element.name}>
                                        <Paper
                                            variant="outlined"
                                            component={'div'}
                                            className={'ComfortFileInputUploadCardPreviewListPaper'}
                                            onClick={() => handleDownload(element)}
                                            title={element.name}
                                        >
                                            <InsertDriveFile className={'ComfortReactFileInputFilePreviewIcon'} />
                                        </Paper>
                                    </Tooltip>
                                )}

                                <Box className={'ComfortFileInputUploadCardPreviewListBox'}>
                                    <IconButton
                                        disabled={disabled || loading}
                                        size="small"
                                        onClick={() => handleRemove(element)}
                                        className={'ComfortFileInputUploadCardPreviewListButton'}
                                    >
                                        <Close />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        );
                    })}
            </Box>
        </Card>
    );
};

const UploadMultiFile = (props) => {
    const { getLocalizedMessage } = useTranslation();
    return (
        <Box width={props.width} height={props.height} className={props.className}>
            {props.loading ? (
                <Box className={'ComfortFileInputUploadAreaBox'} p={props.removePadding ? 1 : 10}>
                    {props.loadingComponent}
                </Box>
            ) : (
                <Dropzone
                    className={'ComfortFileInputUploadAreaDropzone'}
                    accept={props.accept}
                    onDrop={props.onDrop}
                    noClick={props.disabled || props.loading}
                    noKeyboard={props.disabled || props.loading}
                    disabled={props.disabled}
                    onDropRejected={props.onReject}
                    maxFiles={props.maxFiles}
                >
                    {({ getRootProps, getInputProps }) => (
                        <section
                            className={
                                props.disabled || props.loading
                                    ? 'ComfortFileInputDropzoneSection__Disabled'
                                    : 'ComfortFileInputDropzoneSection'
                            }
                        >
                            <div {...getRootProps()}>
                                <Box className={'ComfortFileInputUploadAreaBox'} p={props.removePadding ? 1 : 10}>
                                    <input {...getInputProps()} />
                                    <p className="ComfortFileInputDescription">
                                        {props.description
                                            ? props.description
                                            : getLocalizedMessage('FILE_INPUT_DESCRIPTION')}
                                    </p>
                                </Box>
                            </div>
                        </section>
                    )}
                </Dropzone>
            )}
        </Box>
    );
};

export default memo(FileInput);

FileInput.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.any,
    value: PropTypes.any,
    fullWidth: PropTypes.bool,
    onChange: PropTypes.func,
    onDownload: PropTypes.func,
    disabled: PropTypes.bool,
    onBlur: PropTypes.func,
    setPathIsBlurred: PropTypes.func,
    setPathValue: PropTypes.func,
    onReject: PropTypes.func,
    previewLabel: PropTypes.any,
    hidePreviewArea: PropTypes.any,
    errorMessage: PropTypes.string,
    noHelperText: PropTypes.bool,
    accept: PropTypes.any,
    maxFileSizeInBytes: PropTypes.number,
    maxTotalFileSizeInBytes: PropTypes.number,
    maxFiles: PropTypes.number,
    loading: PropTypes.bool,
    loadingComponent: PropTypes.any,
    width: PropTypes.string,
    height: PropTypes.string,
    removePadding: PropTypes.bool,
    renderErrorMessage: PropTypes.bool,
    hideErrorMessage: PropTypes.bool,
    cardClassName: PropTypes.string,
    uploadAreaClassName: PropTypes.string,
};
