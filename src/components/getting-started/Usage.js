import { Link } from 'react-router-dom';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import './Usage.css';

const Usage = (props) => {
    const providerCode = `import { ComfortReactProvider } from 'comfort-react';
    
    //....
    return <ComfortReactProvider 
        reactValidatableFormProps={reactValidatableFormProps}
        lang={lang} 
        notistackProviderProps={notistackProviderProps}
        localizationProviderLocale={localizationProviderLocale}
        useApiProps={useApiProps}>
                <App />
        </ComfortReactProvider>;
    `;

    return (
        <ExampleUsageWrapper header="ValidatableFormUsage">
            <div className="infoParagraph">
                <b>comfort-react</b> is based on{' '}
                <a
                    className="outsideUrlSpan"
                    href={'https://reactjs.org/docs/context.html'}
                    target="_blank"
                    rel="noreferrer"
                >
                    Context
                </a>
                . <b>useValidatableForm</b> hook should be used inside <b>ComfortReactProvider</b>. Wrap your App inside{' '}
                <b>ComfortReactProvider</b> and pass the app-scoped{' '}
                <span className="inner-link" onClick={props.openSettingsDialog}>
                    props
                </span>
                . ComfortReactProvider contains ReactValidatableForm therefore if need props for ReactValidatableForm
                you can add props with reactValidatableFormProps. Example usage of <b>ComfortReactProvider</b>:{' '}
                <Link className="inner-link" to="/api/comfort-react-provider">
                    See API
                </Link>
            </div>
            <div className="codeBox">
                <span>{providerCode}</span>
            </div>
        </ExampleUsageWrapper>
    );
};

export default Usage;
