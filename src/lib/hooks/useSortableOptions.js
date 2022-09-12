import { useEffect, useState } from 'react';

const useSortableOptions = (props = {}) => {
    const { options, sortAlphabetically, getOptionLabel, valueKey } = props;
    const [sortedOptions, setSortedOptions] = useState([]);

    useEffect(() => {
        if (sortAlphabetically) {
            const copyOptions = [...options];
            if (valueKey) {
                copyOptions.sort((a, b) => getOptionLabel(a).toString().localeCompare(getOptionLabel(b).toString()));
            } else {
                copyOptions.sort((a, b) => a.toString().localeCompare(b.toString()));
            }
            setSortedOptions(copyOptions);
        } else {
            setSortedOptions([...options]);
        }
    }, [options, sortAlphabetically, getOptionLabel, valueKey]);

    return sortedOptions;
};

export default useSortableOptions;
