import ApiInfo from '../ApiInfo';
import CodeAccordion from '../CodeAccordion';
import ExampleUsageWrapper from '../ExampleUsageWrapper';

const providerFormCode = `import { ComfortReactProvider } from 'comfort-react';

const notistackProviderProps = {
  maxSnack:{5}
  autoHideDuration:{3000}
  anchorOrigin:{{
      vertical: 'bottom',
      horizontal: 'left',
  }}
  action:{(key) => <NotificationDismissAction id={key} />}
}
<ComfortReactProvider
    notistackProviderProps={notistackProviderProps}
>
    <App />
</ComfortReactProvider>`;

const providerParametersApiInfoList = [
    {
        label: 'maxSnack (number)',
        desc: <span>Change maximum snackbar in same time</span>,
    },
    {
        label: 'autoHideDuration (number)',
        desc: <span>Change hide duration snackbars</span>,
    },
    {
        label: 'anchorOrigin (object)',
        desc: <span>Change anchor origin snackbars</span>,
    },
    {
        label: 'action (func)',
        desc: <span>Add action on snackbar</span>,
    },
];

const ApiComfortReactProvider = (props) => {
    return (
        <ExampleUsageWrapper header="ComfortReactProvider">
            <CodeAccordion code={providerFormCode} />
            <div className="apiInfoSectionHeader">
                Provider Parameters
                <div>
                    <span className="inner-link" onClick={props.openSettingsDialog}>
                        See Example Usages
                    </span>
                </div>
            </div>
            <ApiInfo apiInfoList={providerParametersApiInfoList} />
        </ExampleUsageWrapper>
    );
};

export default ApiComfortReactProvider;
