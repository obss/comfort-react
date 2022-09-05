import { Button, TextField, useComfortForm } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';

const initialFormData = {};

const rules = [
    { path: 'val', ruleSet: ['required'] },
    { path: 'val2', ruleSet: ['required'] },
];

const UseComfortForm = () => {
    const { isValid, getPathRelatedProps, setFormIsSubmitted } = useComfortForm({
        rules,
        initialFormData,
        hideBeforeSubmit: true,
        showAfterBlur: true,
        focusToErrorAfterSubmit: true,
    });

    return (
        <ExampleUsageWrapper header="useComfortForm" codeUrl="components/validatable-form/UseComfortForm.js">
            <p className="infoParagraph">
                <b>useComfortForm</b> is a hook extended from{' '}
                <a
                    className="outsideUrlSpan"
                    href="https://obss.github.io/react-validatable-form-demo/library-api/use-validatable-form"
                    target="_blank"
                    rel="noreferrer"
                >
                    useValidatableForm
                </a>{' '}
                with extra <b>getPathRelatedProps</b> function. <b>getPathRelatedProps</b> function returns an object
                with <b>path</b>, <b>value</b>, <b>errorMessage</b>, <b>setPathValue</b> and <b>setPathIsBlurred</b>{' '}
                properties. These properties can be used to create a comfort-react components.
            </p>
            <div>
                <TextField label="val" {...getPathRelatedProps('val')} />
            </div>
            <div>
                <TextField label="val2" {...getPathRelatedProps('val2')} />
            </div>
            <div>
                <Button variant="contained" onClick={() => setFormIsSubmitted()}>
                    Submit Form
                </Button>
            </div>
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={rules} />
        </ExampleUsageWrapper>
    );
};

export default UseComfortForm;
