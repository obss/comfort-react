import { TextField, useValidatableForm } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';

const initialFormData = {
    val: 'aa',
};

const rules = [{ path: 'val', ruleSet: ['required', { rule: 'tckn' }] }];

const RuleTckn = () => {
    const { isValid, setPathValue, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });

    return (
        <ExampleUsageWrapper header="tckn" codeUrl="components/rules/RuleTckn.js">
            <p className="infoParagraph">
                <b>tckn</b> rule checks if the given value is a valid TCKN.
            </p>
            <div>
                <TextField
                    error={!!getError('val')}
                    helperText={getError('val') || ' '}
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

export default RuleTckn;
