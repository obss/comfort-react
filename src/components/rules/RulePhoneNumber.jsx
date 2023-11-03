import { PhoneInput, useValidatableForm } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';

const initialFormData = {
    val: '90555',
};

const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'phoneNumber' }] }];

const RulePhoneNumber = () => {
    const { isValid, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    return (
        <ExampleUsageWrapper header="phoneNumber" codeUrl="components/rules/RulePhoneNumber.js">
            <p className="infoParagraph">
                <b>phoneNumber</b> rule checks if the given value is a valid phone number.
            </p>
            <div>
                <PhoneInput
                    errorMessage={getError('val')}
                    label="val"
                    type="text"
                    value={getValue('val')}
                    onChange={(e) => setPathValue('val', e)}
                />
            </div>
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={rules} />
        </ExampleUsageWrapper>
    );
};

export default RulePhoneNumber;
