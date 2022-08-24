import { TextField, useValidatableForm } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';

const initialFormData = {
    val: '21421',
};

const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }, { rule: 'vkn' }] }];

const RuleVkn = () => {
    const { isValid, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    return (
        <ExampleUsageWrapper header="vkn" codeUrl="components/rules/RuleVkn.js">
            <p className="infoParagraph">
                <b>vkn</b> rule checks if the given value is a valid vkn.
            </p>
            <div>
                <TextField
                    errorMessage={getError('val')}
                    label="val"
                    type="text"
                    value={getValue('val') || ''}
                    onChange={(val) => setPathValue('val', val)}
                />
            </div>
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={rules} />
        </ExampleUsageWrapper>
    );
};

export default RuleVkn;
