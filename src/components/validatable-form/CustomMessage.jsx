import { TextField, useValidatableForm } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';

const initialFormData = {
    val1: 'a',
    val2: 'a',
    val3: 's',
    val4: 'sdd',
    checkVal: false,
};

const customMessageFunc = (errorParams) => {
    if (errorParams.value > errorParams.comparisonValue) {
        return `This field's length should be ${errorParams.comparisonValue}, your input's (${errorParams.value}) is greater than this value`;
    }
    return `This field's length should be ${errorParams.comparisonValue}, your input's (${errorParams.value}) is less than this value`;
};

const customMessageFuncJsx = (errorParams) => {
    return (
        <span>
            This field{"'"}s length should be <b>{errorParams.comparisonValue} </b>, your input length is{' '}
            <b> {errorParams.value} </b>
        </span>
    );
};

const rules = [
    {
        path: 'val1',
        ruleSet: [
            'required',
            {
                rule: 'length',
                greaterThan: 8,
                customMessage: "This field's length is ${value}, however it should be greater than ${comparisonValue}",
            },
        ],
    },
    { path: 'val2', ruleSet: ['required', { rule: 'length', equalTo: 5, customMessage: customMessageFunc }] },
    {
        path: 'val3',
        ruleSet: [
            'required',
            {
                rule: 'myCustomRule2',
                customMessage:
                    "Hello, this is myCustomRule2 customMessage. This field is not valid, because text ${value} should either include letter 'a' or its length should be greater than 4",
            },
        ],
    },
    {
        path: 'val4',
        ruleSet: [
            {
                rule: 'required',
                customMessage: (
                    <span>
                        This field is <b> required </b>
                    </span>
                ),
            },
            {
                rule: 'length',
                equalTo: 6,
                customMessage: customMessageFuncJsx,
            },
        ],
    },
];

const CustomMessage = () => {
    const { isValid, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    return (
        <ExampleUsageWrapper header="customMessage" codeUrl="components/validatable-form/CustomMessage.js">
            <p className="infoParagraph">
                Validation error message of a rule can be customized by passing <b>customMessage</b> param to the rule.
            </p>
            <div>
                <div>
                    <TextField
                        errorMessage={getError('val1')}
                        label="val1 (customMessage as string)"
                        type="text"
                        value={getValue('val1') || ''}
                        onChange={(val) => setPathValue('val1', val)}
                    />
                </div>
                <div>
                    <TextField
                        errorMessage={getError('val2')}
                        label="val2 (customMessage as function)"
                        type="text"
                        value={getValue('val2') || ''}
                        onChange={(val) => setPathValue('val2', val)}
                    />
                </div>
                <div>
                    <TextField
                        errorMessage={getError('val3')}
                        label="val3 (customMessage for custom rule)"
                        type="text"
                        value={getValue('val3') || ''}
                        onChange={(val) => setPathValue('val3', val)}
                    />
                </div>
                <div>
                    <TextField
                        errorMessage={getError('val4')}
                        label="val4 (customMessage for jsx)"
                        type="text"
                        value={getValue('val4') || ''}
                        onChange={(val) => setPathValue('val4', val)}
                    />
                </div>
                <ValidationResult isValid={isValid} />
                <CurrentRulesInfo currentRules={rules} />
            </div>
        </ExampleUsageWrapper>
    );
};

export default CustomMessage;
