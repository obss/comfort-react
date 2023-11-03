import ApiInfo from '../ApiInfo';
import CodeAccordion from '../CodeAccordion';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { Link } from 'react-router-dom';

const providerFormCode = `import { ComfortReactProvider } from 'comfort-react';

const valitableFormProps = {
customRules:{customRules},
translations:{translations},
dateFormatterFunction:{dateFormatterFunction},
dateWithTimeFormatterFunction:{dateWithTimeFormatterFunction},
hideBeforeSubmit:{hideBeforeSubmit},
showAfterBlur:{showAfterBlur},
focusToErrorAfterSubmit:{focusToErrorAfterSubmit},
elementFocusHandler:{elementFocusHandler}
}
<ComfortReactProvider
    reactValidatableFormProps={valitableFormProps}
    renderErrorMessage={customRenderErrorMessage}
>
    <App />
</ComfortReactProvider>`;

const providerParametersApiInfoList = [
    {
        label: 'reactValidatableFormProps (object)',
        desc: (
            <span>
                Custom props for useValidatableForm. More detail:{' '}
                <a
                    className="inner-link"
                    target={'_blank'}
                    href="https://obss.github.io/react-validatable-form-demo/library-api/react-validatable-form-provider"
                    rel="noreferrer"
                >
                    React Validatable Form
                </a>
            </span>
        ),
    },
    {
        label: 'lang (string)',
        desc: (
            <span>
                The language of the identifier is specified. Some components, error messages and snackbars are language
                dependent.
            </span>
        ),
    },
    {
        label: 'localizationProviderLocale (object)',
        desc: <span>Provide localization for some components.</span>,
    },
    {
        label: 'notistackProviderProps (object)',
        desc: (
            <span>
                Custom props for useSnackbar. More detail:{' '}
                <Link className="inner-link" to={'/notistack/use-snackbar-api'}>
                    useSnackbar
                </Link>
            </span>
        ),
    },
    {
        label: 'useApiProps (object)',
        desc: (
            <span>
                Custom props for useSnackbar. More detail:{' '}
                <Link className="inner-link" to={'/use-api/use-api-api'}>
                    useApi
                </Link>
            </span>
        ),
    },
    {
        label: 'renderErrorMessage (function)',
        desc: <span>Custom errorMessage renderer for components.</span>,
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
