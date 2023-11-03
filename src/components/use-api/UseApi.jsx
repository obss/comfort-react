import { useState } from 'react';
import { Autocomplete, Button, Checkbox, TextField, useApi, useSnackbar } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { Grid } from '@mui/material';

const DEFAULT_URL = 'users';
const NOT_OK_URL = 'users-error';
const NOT_A_VALID_URL = 'not-a-valid-url';
const ANOTHER_API = '/another-api';
const methods = ['GET', 'POST', 'PUT', 'DELETE'];

const myQueryParamsObject = {
    myQueryStringParam: 'myQueryStringValue',
    myQueryNumberParam: 123,
};

const myRequstBodyObject = {
    myRequestBodyStringKey: 'myRequestBodyStringValue',
    myRequestBodyStringNumberKey: 456,
};

const UseApi = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { loading, getRequest, postRequest, putRequest, deleteRequest } = useApi();
    const [users, setUsers] = useState([]);
    const [resultInfo, setResultInfo] = useState({});
    const [selectedMethod, setSelectedMethod] = useState(methods[0]);
    const [enableAnotherApi, setEnableAnotherApi] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [enableFailure, setEnableFailure] = useState(false);
    const [hideErrorMessage, setHideErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [enableAfterFailure, setEnableAfterFailure] = useState(false);
    const [enableAfterSuccess, setEnableAfterSuccess] = useState(true);
    const [enableHandleThen, setEnableHandleThen] = useState(false);
    const [enableHandleCatch, setEnableHandleCatch] = useState(false);
    const [enableHandleFinally, setEnableHandleFinally] = useState(false);
    const [disableLoading, setDisableLoading] = useState(false);
    const [enableGetHeaders, setEnableGetHeaders] = useState(false);
    const [enableQueryParams, setEnableQueryParams] = useState(false);
    const [enableBody, setEnableBody] = useState(false);
    const [dontStringifyBody, setDontStringifyBody] = useState(false);
    const [enableNotOk, setEnableNotOk] = useState(false);
    const [enableHandleResponseNotOk, setEnableHandleResponseNotOk] = useState(false);

    const handleAfterSuccess = (response) => {
        setUsers(response.users);
        setResultInfo(response.resultInfo);
    };

    const customGetHeaders = () => {
        return {
            'X-My-Custom-Header': 'my-custom-value',
        };
    };

    const handleRetrieveUsers = () => {
        const requestParams = { url: DEFAULT_URL };
        if (enableAnotherApi) {
            requestParams.apiUrl = ANOTHER_API;
        }
        requestParams.showSuccessMessage = showSuccessMessage;
        requestParams.successMessage = successMessage;
        if (enableFailure) {
            requestParams.url = NOT_A_VALID_URL;
        }
        requestParams.hideErrorMessage = hideErrorMessage;
        requestParams.errorMessage = errorMessage;
        if (enableAfterFailure) {
            requestParams.afterFailure = () => {
                enqueueSnackbar('Custom after failure', { variant: 'error' });
            };
        }
        if (enableAfterSuccess) {
            requestParams.afterSuccess = handleAfterSuccess;
        }
        if (enableHandleThen) {
            requestParams.handleThen = () => {
                enqueueSnackbar('Custom handle then', { variant: 'info' });
            };
        }
        if (enableHandleCatch) {
            requestParams.handleCatch = () => {
                enqueueSnackbar('Custom handle catch', { variant: 'info' });
            };
        }
        if (enableHandleFinally) {
            requestParams.handleFinally = () => {
                enqueueSnackbar('Custom handle finally', { variant: 'info' });
            };
        }
        requestParams.disableLoading = disableLoading;
        if (enableGetHeaders) {
            requestParams.getHeaders = customGetHeaders;
        }
        if (enableQueryParams) {
            requestParams.queryParams = myQueryParamsObject;
        }
        if (enableBody) {
            requestParams.body = myRequstBodyObject;
        }
        requestParams.dontStringifyBody = dontStringifyBody;
        if (enableNotOk) {
            requestParams.url = NOT_OK_URL;
        }
        if (enableHandleResponseNotOk) {
            requestParams.handleResponseNotOk = (response) => {
                enqueueSnackbar(`Custom handle response not ok, reponse status is ${response.status}`, {
                    variant: 'info',
                });
            };
        }

        let requestToBeCalled = getRequest;
        switch (selectedMethod) {
            case 'GET':
                requestToBeCalled = getRequest;
                break;
            case 'POST':
                requestToBeCalled = postRequest;
                break;
            case 'PUT':
                requestToBeCalled = putRequest;
                break;
            case 'DELETE':
                requestToBeCalled = deleteRequest;
                break;
            default:
                break;
        }

        requestToBeCalled(requestParams);
    };

    let bodyStr =
        typeof resultInfo.requestBody === 'string' ? resultInfo.requestBody : JSON.stringify(resultInfo.requestBody);
    if (!bodyStr) {
        bodyStr = '';
    }
    bodyStr = bodyStr.replaceAll(',', ', ');
    bodyStr = bodyStr.replaceAll(':', ': ');

    return (
        <ExampleUsageWrapper header="useApi" codeUrl={['components/use-api/UseApi.js', 'components/Main.js']}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'apiUrl (retrieve from another API)'}
                        value={enableAnotherApi}
                        onChange={(newValue) => {
                            setEnableAnotherApi(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        disableClearable
                        value={selectedMethod}
                        options={methods}
                        onChange={(val) => {
                            setSelectedMethod(val);
                        }}
                        label={'method'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'showSuccessMessage'}
                        value={showSuccessMessage}
                        onChange={(newValue) => {
                            setShowSuccessMessage(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label={'successMessage'}
                        type={'text'}
                        value={successMessage}
                        onChange={(val) => setSuccessMessage(val)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'enable Failure (not a valid URL)'}
                        value={enableFailure}
                        onChange={(newValue) => {
                            setEnableFailure(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'hideErrorMessage'}
                        value={hideErrorMessage}
                        onChange={(newValue) => {
                            setHideErrorMessage(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label={'errorMessage'}
                        type={'text'}
                        value={errorMessage}
                        onChange={(val) => setErrorMessage(val)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'afterFailure'}
                        value={enableAfterFailure}
                        onChange={(newValue) => {
                            setEnableAfterFailure(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'afterSuccess'}
                        value={enableAfterSuccess}
                        onChange={(newValue) => {
                            setEnableAfterSuccess(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'handleThen'}
                        value={enableHandleThen}
                        onChange={(newValue) => {
                            setEnableHandleThen(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'handleCatch'}
                        value={enableHandleCatch}
                        onChange={(newValue) => {
                            setEnableHandleCatch(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'handleFinally'}
                        value={enableHandleFinally}
                        onChange={(newValue) => {
                            setEnableHandleFinally(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'disableLoading'}
                        value={disableLoading}
                        onChange={(newValue) => {
                            setDisableLoading(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'getHeaders'}
                        value={enableGetHeaders}
                        onChange={(newValue) => {
                            setEnableGetHeaders(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'queryParams'}
                        value={enableQueryParams}
                        onChange={(newValue) => {
                            setEnableQueryParams(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'body'}
                        value={enableBody}
                        onChange={(newValue) => {
                            setEnableBody(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'dontStringifyBody'}
                        value={dontStringifyBody}
                        onChange={(newValue) => {
                            setDontStringifyBody(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'response not ok'}
                        value={enableNotOk}
                        onChange={(newValue) => {
                            setEnableNotOk(newValue);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Checkbox
                        label={'handleResponseNotOk'}
                        value={enableHandleResponseNotOk}
                        onChange={(newValue) => {
                            setEnableHandleResponseNotOk(newValue);
                        }}
                    />
                </Grid>
            </Grid>

            <Button variant="contained" color="primary" onClick={handleRetrieveUsers} loading={loading}>
                Retrieve Users
            </Button>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <b>method:</b>
                            {resultInfo.method}
                        </Grid>
                        <Grid item xs={12}>
                            <b>fromAnotherApi:</b>
                            {resultInfo.fromAnotherApi ? 'Yes' : 'No'}
                        </Grid>
                        <Grid item xs={12}>
                            <b>retrieveCount:</b>
                            {resultInfo.retrieveCount}
                        </Grid>
                        <Grid item xs={12}>
                            <b>requestHeaders:</b>
                            {JSON.stringify(resultInfo.requestHeaders)}
                        </Grid>
                        <Grid item xs={12}>
                            <b>url:</b>
                            {resultInfo.url}
                        </Grid>
                        <Grid item xs={12}>
                            <b>body:</b>
                            {bodyStr}
                        </Grid>
                        <Grid item xs={12}>
                            <b>typeof body:</b>
                            {typeof resultInfo.requestBody}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    Retrieved Users
                    <table className="comfort-demo-table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        </ExampleUsageWrapper>
    );
};

export default UseApi;
