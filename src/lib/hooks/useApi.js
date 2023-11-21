import { useContext, useState } from 'react';
import { useSnackbar } from 'notistack';
import withQuery from 'with-query';
import ComfortReactContext from '../ComfortReactContext';
import { isEmptyString, isFunction, isNullOrUndefined } from '../utils/ControlUtils';

const useApi = (props = {}) => {
    const {
        apiUrl: hookApiUrl,
        dontStringifyBody: hookDontStringifyBody,
        handleThen: hookHandleThen,
        handleCatch: hookHandleCatch,
        handleFinally: hookHandleFinally,
        successMessage: hookSuccessMessage,
        getHeaders: hookGetHeaders,
        handleResponseNotOk: hookHandleResponseNotOk,
        disableLoading: hookDisableLoading,
    } = props;

    const [loadingCount, setLoadingCount] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const context = useContext(ComfortReactContext);
    if (!context) {
        throw new Error('comfort-react error. useApi hook must be used inside ComfortReactContext context');
    }

    const { useApiProps = {} } = context;

    const {
        apiUrl: contextApiUrl,
        dontStringifyBody: contextDontStringifyBody,
        handleThen: contextHandleThen,
        handleCatch: contextHandleCatch,
        handleFinally: contextHandleFinally,
        successMessage: contextSuccessMessage,
        getHeaders: contextGetHeaders,
        handleResponseNotOk: contextHandleResponseNotOk,
        disableLoading: contextDisableLoading,
    } = useApiProps;

    const getFinalApiUrl = (apiUrl) => {
        return apiUrl || hookApiUrl || contextApiUrl;
    };

    const getFinalDontStringifyBody = (dontStringifyBody) => {
        if (!isNullOrUndefined(dontStringifyBody)) {
            return dontStringifyBody;
        }
        if (!isNullOrUndefined(hookDontStringifyBody)) {
            return hookDontStringifyBody;
        }
        if (!isNullOrUndefined(contextDontStringifyBody)) {
            return contextDontStringifyBody;
        }
        return false;
    };

    const getFinalHandleThen = (handleThen) => {
        return handleThen || hookHandleThen || contextHandleThen;
    };

    const getFinalHandleCatch = (handleCatch) => {
        return handleCatch || hookHandleCatch || contextHandleCatch;
    };

    const getFinalHandleFinally = (handleFinally) => {
        return handleFinally || hookHandleFinally || contextHandleFinally;
    };

    const getFinalSuccessMessage = (successMessage) => {
        return successMessage || hookSuccessMessage || contextSuccessMessage;
    };

    const getFinalGetHeaders = (getHeaders) => {
        return getHeaders || hookGetHeaders || contextGetHeaders;
    };

    const getFinalHandleResponseNotOk = (handleResponseNotOk) => {
        return handleResponseNotOk || hookHandleResponseNotOk || contextHandleResponseNotOk;
    };

    const getFinalDisableLoading = (disableLoading) => {
        if (!isNullOrUndefined(disableLoading)) {
            return disableLoading;
        }
        if (!isNullOrUndefined(hookDisableLoading)) {
            return hookDisableLoading;
        }
        if (!isNullOrUndefined(contextDisableLoading)) {
            return contextDisableLoading;
        }
        return false;
    };

    const makeRequest = (requestProps = {}) => {
        const {
            method,
            apiUrl,
            url,
            body,
            dontStringifyBody,
            afterSuccess,
            afterFailure,
            showSuccessMessage,
            successMessage,
            hideErrorMessage,
            errorMessage,
            handleThen,
            handleCatch,
            handleFinally,
            handleResponseNotOk,
            disableLoading,
            getHeaders,
            queryParams,
        } = requestProps;
        const finalApiUrl = getFinalApiUrl(apiUrl);
        const finalDontStringifyBody = getFinalDontStringifyBody(dontStringifyBody);
        const finalHandleThen = getFinalHandleThen(handleThen);
        const finalHandleCatch = getFinalHandleCatch(handleCatch);
        const finalHandleFinally = getFinalHandleFinally(handleFinally);
        const finalGetHeaders = getFinalGetHeaders(getHeaders);

        if (!finalApiUrl && !url) {
            throw new Error('comfort-react error. Both apiUrl & url could not be found on makeRequest');
        }
        if (!method) {
            throw new Error('comfort-react error. method could not be found on makeRequest');
        }
        if (finalGetHeaders && !isFunction(finalGetHeaders)) {
            throw new Error('comfort-react error. getHeaders must be a function on makeRequest');
        }

        let urlWithQueryParams = url || '';
        if (queryParams) {
            urlWithQueryParams = withQuery(url, queryParams);
        }

        const finalUrl = `${finalApiUrl}/${urlWithQueryParams}`;
        let finalBody = body;
        if (!isEmptyString(body)) {
            finalBody = finalDontStringifyBody ? body : JSON.stringify(body);
        }

        let finalHeaders;
        if (finalGetHeaders) {
            finalHeaders = finalGetHeaders(requestProps);
        }

        const finalDisableLoading = getFinalDisableLoading(disableLoading);

        if (!finalDisableLoading) {
            setLoadingCount((currentLoadingCount) => {
                return currentLoadingCount + 1;
            });
        }

        fetch(finalUrl, {
            method,
            body: finalBody,
            headers: finalHeaders,
        })
            .then(async (response) => {
                if (finalHandleThen) {
                    finalHandleThen(response, requestProps, enqueueSnackbar, makeRequest);
                } else {
                    if (response.ok) {
                        const jsonResult = await response.json();
                        if (showSuccessMessage) {
                            const finalSuccessMessage = getFinalSuccessMessage(successMessage);
                            if (!finalSuccessMessage) {
                                console.error('comfort-react error. successMessage could not be found on makeRequest');
                            } else {
                                enqueueSnackbar(finalSuccessMessage, {
                                    variant: 'success',
                                });
                            }
                        }
                        if (afterSuccess) {
                            afterSuccess(jsonResult, requestProps, enqueueSnackbar, makeRequest);
                        }
                    } else {
                        const finalHandleResponseNotOk = getFinalHandleResponseNotOk(handleResponseNotOk);
                        if (isFunction(finalHandleResponseNotOk)) {
                            finalHandleResponseNotOk(response, requestProps, enqueueSnackbar, makeRequest);
                        } else {
                            console.warn('comfort-react warning. handleResponseNotOk is not a function on makeRequest');
                        }
                    }
                }
            })
            .catch((error) => {
                if (finalHandleCatch) {
                    finalHandleCatch(error, requestProps, enqueueSnackbar, makeRequest);
                } else {
                    if (!hideErrorMessage) {
                        const finalErrorMessage = errorMessage || error.message;
                        enqueueSnackbar(finalErrorMessage, {
                            variant: 'error',
                        });
                    }
                    if (afterFailure) {
                        afterFailure(error, requestProps, enqueueSnackbar, makeRequest);
                    }
                }
            })
            .finally(() => {
                if (!finalDisableLoading) {
                    setLoadingCount((currentLoadingCount) => {
                        return currentLoadingCount - 1;
                    });
                }

                if (finalHandleFinally) {
                    finalHandleFinally(requestProps, enqueueSnackbar, makeRequest);
                }
            });
    };

    const getRequest = (requestProps = {}) => {
        if (requestProps.body) {
            console.warn('comfort-react warning. getRequest does not support body. body will be ignored');
        }
        const newProps = { ...requestProps, method: 'GET' };
        delete newProps.body;
        makeRequest(newProps);
    };

    const postRequest = (requestProps = {}) => {
        const newProps = { ...requestProps, method: 'POST' };
        makeRequest(newProps);
    };

    const putRequest = (requestProps = {}) => {
        const newProps = { ...requestProps, method: 'PUT' };
        makeRequest(newProps);
    };

    const deleteRequest = (requestProps = {}) => {
        const newProps = { ...requestProps, method: 'DELETE' };
        makeRequest(newProps);
    };

    const loading = loadingCount > 0;

    return {
        loading,
        makeRequest,
        getRequest,
        postRequest,
        putRequest,
        deleteRequest,
    };
};

export default useApi;
