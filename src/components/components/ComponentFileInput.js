import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import CurrentRulesInfo from '../CurrentRulesInfo';
import FormGroup from '@mui/material/FormGroup';
import { Autocomplete, Checkbox, FileInput, NumberField, TextField, useSnackbar, useValidatableForm } from '../../lib';
import { Grid } from '@mui/material';
import { FileDownload } from '@mui/icons-material';
import { customErrorMessageRenderer } from './CustomErrorMessageRenderer';

const FILE_TYPE = ['all', 'images', 'videos'];

const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];

export const ComponentFileInput = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [selectedFileType, setSelectedFileType] = useState(FILE_TYPE[0]);
    const [selectedFullWidth, setSelectedFullWidth] = useState(false);
    const [selectedMaxFiles, setSelectedMaxFiles] = useState();
    const [selectedMaxFileBytes, setSelectedMaxFileBytes] = useState();
    const [selectedCustomDescription, setSelectedCustomDescription] = useState(false);
    const [selectedRemovePadding, setSelectedRemovePadding] = useState(false);
    const [selectedRenderErrorMessage, setSelectedRenderErrorMessage] = useState(false);
    const [selectedHideErrorMessage, setSelectedHideErrorMessage] = useState(false);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedHidePreviewArea, setSelectedHidePreviewArea] = useState(false);
    const [selectedWidth, setSelectedWidth] = useState();
    const [selectedHeight, setSelectedHeight] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedBlur, setSelectedBlur] = useState(false);
    const [enableUseValidatableForm, setEnableUseValidatableForm] = useState(false);
    const [selectedLoading, setSelectedLoading] = useState(false);
    const [value, setValue] = useState();
    const { setPathValue, setPathIsBlurred, getValue, getError } = useValidatableForm({
        rules,
    });

    const handleChangeSelectedMaxFiles = (newMaxFilex) => {
        setValue(null);
        setPathValue('val', null);
        setSelectedMaxFiles(newMaxFilex);
    };

    const handleChangeSelectedMaxFileBytes = (newMaxFileBytes) => {
        setValue(null);
        setPathValue('val', null);
        setSelectedMaxFileBytes(newMaxFileBytes);
    };

    const handleBlur = () => {
        enqueueSnackbar('FileInput is blurred', { variant: 'info' });
    };

    const handleOnChange = (newValue) => {
        const fLength = Array.isArray(newValue) ? newValue.length : newValue ? 1 : 0;
        if (fLength > 0) {
            enqueueSnackbar(`${fLength} files currently added`, { variant: 'info' });
        }
        setValue(newValue);
    };

    const fileInputElementJsx = (
        <FileInput
            path="val"
            loading={selectedLoading}
            label={'FileInput'}
            value={!enableUseValidatableForm ? value : getValue('val')}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            errorMessage={enableUseValidatableForm ? getError('val') : errorMessage}
            onChange={!enableUseValidatableForm ? handleOnChange : null}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            fullWidth={selectedFullWidth}
            height={selectedHeight ? `${selectedHeight}px` : undefined}
            width={selectedWidth ? `${selectedWidth}px` : undefined}
            maxFileBytes={selectedMaxFileBytes}
            maxFiles={selectedMaxFiles}
            hidePreviewArea={selectedHidePreviewArea}
            description={
                selectedCustomDescription && (
                    <span>
                        {' '}
                        <FileDownload /> File Upload Area{' '}
                    </span>
                )
            }
            removePadding={selectedRemovePadding}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
            hideErrorMessage={selectedHideErrorMessage}
            disabled={selectedDisabled}
            accept={
                selectedFileType === 'videos'
                    ? {
                          'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.m4v', '.mts', '.m2ts', '.mkv'],
                      }
                    : selectedFileType === 'images'
                    ? {
                          'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.bmp', '.svg'],
                      }
                    : undefined
            }
        />
    );

    let currentJsx = jsxToString(fileInputElementJsx, {
        displayName: 'FileInput',
        useFunctionCode: true,
    });

    currentJsx = "import { FileInput } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper>
            {fileInputElementJsx}
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <NumberField
                        value={selectedWidth}
                        onChange={(val) => {
                            setSelectedWidth(val);
                        }}
                        label="width"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumberField
                        value={selectedHeight}
                        onChange={(val) => {
                            setSelectedHeight(val);
                        }}
                        label="height"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedFileType}
                        options={FILE_TYPE}
                        onChange={(val) => {
                            setSelectedFileType(val);
                        }}
                        label={'file type'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'fullWidth'}
                            value={selectedFullWidth}
                            onChange={(newValue) => {
                                setSelectedFullWidth(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <NumberField
                            value={selectedMaxFiles}
                            onChange={(val) => {
                                handleChangeSelectedMaxFiles(val);
                            }}
                            label="maxFiles"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <NumberField
                            value={selectedMaxFileBytes}
                            onChange={(val) => {
                                handleChangeSelectedMaxFileBytes(val);
                            }}
                            label="maxFileBytes"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'custom description'}
                            value={selectedCustomDescription}
                            onChange={(newValue) => {
                                setSelectedCustomDescription(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'hide preview area'}
                            value={selectedHidePreviewArea}
                            onChange={(newValue) => {
                                setSelectedHidePreviewArea(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'remove padding'}
                            value={selectedRemovePadding}
                            onChange={(newValue) => {
                                setSelectedRemovePadding(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'disabled'}
                            value={selectedDisabled}
                            onChange={(newValue) => {
                                setSelectedDisabled(newValue);
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
                    <TextField
                        value={errorMessage}
                        onChange={(val) => {
                            setErrorMessage(val);
                        }}
                        label="errorMessage"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'renderErrorMessage'}
                            value={selectedRenderErrorMessage}
                            onChange={(newValue) => {
                                setSelectedRenderErrorMessage(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'hideErrorMessage'}
                            value={selectedHideErrorMessage}
                            onChange={(newValue) => {
                                setSelectedHideErrorMessage(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable useValidatableForm'}
                            value={enableUseValidatableForm}
                            onChange={(newValue) => {
                                setEnableUseValidatableForm(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'blur'}
                            value={selectedBlur}
                            onChange={(newValue) => {
                                setSelectedBlur(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            <CurrentRulesInfo currentRules={currentJsx} dontStringify={true} header="Current Jsx" />
        </ExampleUsageWrapper>
    );
};
