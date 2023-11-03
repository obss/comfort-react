import ApiInfo from '../ApiInfo';
import CodeAccordion from '../CodeAccordion';
import ExampleUsageWrapper from '../ExampleUsageWrapper';

const providerFormCode = `import { ComfortReactProvider } from 'comfort-react';

const useApiProviderProps = {
  apiUrl: contextApiUrl,
  dontStringifyBody: contextDontStringifyBody,
  handleThen: contextHandleThen,
  handleCatch: contextHandleCatch,
  handleFinally: contextHandleFinally,
  successMessage: contextSuccessMessage,
  getHeaders: contextGetHeaders,
  handleResponseNotOk: contextHandleResponseNotOk,
  disableLoading: contextDisableLoading
}
<ComfortReactProvider
    useApiProps={useApiProviderProps}
>
    <App />
</ComfortReactProvider>`;

const providerParametersApiInfoList = [
    {
        label: 'apiUrl (string)',
        desc: <span>Base URL for requests</span>,
    },
    {
        label: 'dontStringifyBody (boolean)',
        desc: <span>Prevent to stringify request body</span>,
    },
    {
        label: 'handleThen (function)',
        desc: <span>Handle after request</span>,
    },
    {
        label: 'handleCatch (function)',
        desc: <span>Handle catch request</span>,
    },
    {
        label: 'handleFinally (function)',
        desc: <span>Handle finally after request</span>,
    },
    {
        label: 'successMessage (string)',
        desc: <span>Default snackbar success message</span>,
    },
    {
        label: 'getHeaders (number)',
        desc: <span>Change maximum snackbar in same time</span>,
    },
    {
        label: 'handleResponseNotOk (number)',
        desc: <span>Handle if response not ok</span>,
    },
    {
        label: 'disableLoading (boolean)',
        desc: <span>Disable loading</span>,
    },
];

const UseApiApi = () => {
    return (
        <ExampleUsageWrapper header="UseApiProvider">
            <CodeAccordion code={providerFormCode} />
            <div className="apiInfoSectionHeader">UseApi Provider Parameters</div>
            <ApiInfo apiInfoList={providerParametersApiInfoList} />
        </ExampleUsageWrapper>
    );
};

export default UseApiApi;
