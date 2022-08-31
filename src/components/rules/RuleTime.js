import { Autocomplete, Checkbox, TextField, TimePicker, useValidatableForm } from '../../lib';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import ValidationResult from '../ValidationResult';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { useState } from 'react';
import { ruleOptions } from '../../constants/RuleConstants';

const defaultComparisonValue = '12:12';
const numberRule = { rule: 'time' };
numberRule[ruleOptions[0]] = defaultComparisonValue;
const rules = [{ path: 'val', ruleSet: ['required', numberRule], dependantPaths: ['comparisonValue'] }];
const initialFormData = {
    val: '25:12',
    ruleOption: ruleOptions[0],
    comparisonValue: defaultComparisonValue,
};

const RuleTime = () => {
    const { isValid, setPathValue, setRules, getValue, getError } = useValidatableForm({
        rules,
        initialFormData,
    });
    const [currentRules, setCurrentRules] = useState(rules);
    const [ruleOption, setRuleOption] = useState(ruleOptions[0]);
    const [isFunc, setIsFunc] = useState(false);

    const updateRules = (funcParam, ruleParam) => {
        const newRules = JSON.parse(JSON.stringify(rules));
        const newRuleSet = [...newRules[0].ruleSet];
        const newRule = { rule: 'time' };
        if (ruleParam) {
            if (funcParam) {
                newRule[ruleParam] = (formData) => formData['comparisonValue'];
            } else {
                newRule[ruleParam] = defaultComparisonValue;
            }
        }
        newRuleSet.splice(1, 1, newRule);
        newRules[0].ruleSet = newRuleSet;
        setCurrentRules(newRules);
        setRules(newRules);
    };

    const handleSetIsFunc = (newValue) => {
        updateRules(newValue, ruleOption);
        setIsFunc(newValue);
    };

    const handleRuleOptionChange = (newValue) => {
        updateRules(isFunc, newValue);
        setRuleOption(newValue);
    };

    const updateComparisonValue = (newValue) => {
        setPathValue('comparisonValue', newValue);
    };

    return (
        <ExampleUsageWrapper header="time" codeUrl="components/rules/RuleTime.js">
            <p className="infoParagraph">
                <b>time</b> rule checks if the given value is a valid time.
            </p>
            <div className={'comparisonDiv'}>
                <TimePicker
                    errorMessage={getError('val')}
                    label="val"
                    type="text"
                    value={getValue('val') || ''}
                    onChange={(val) => setPathValue('val', val)}
                />
                <Autocomplete
                    className="ruleOptionComponent"
                    value={ruleOption}
                    onChange={(val) => {
                        handleRuleOptionChange(val);
                    }}
                    options={ruleOptions}
                    disableClearable={false}
                    label={'ruleOption'}
                />
                {isFunc ? (
                    <TimePicker
                        className="comparisonComponent"
                        label="comparisonValue"
                        value={getValue('comparisonValue')}
                        onChange={(e) => updateComparisonValue(e)}
                    />
                ) : (
                    <TextField
                        disabled={true}
                        className="comparisonComponent"
                        label="comparisonValue"
                        value={defaultComparisonValue}
                        onChange={() => {}}
                    />
                )}
                <Checkbox
                    label={'as Function'}
                    value={isFunc}
                    onChange={(newValue) => {
                        handleSetIsFunc(newValue);
                    }}
                />
            </div>
            <ValidationResult isValid={isValid} />
            <CurrentRulesInfo currentRules={currentRules} />
        </ExampleUsageWrapper>
    );
};

export default RuleTime;
