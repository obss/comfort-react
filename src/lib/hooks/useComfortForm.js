import { useValidatableForm } from '..';

const useComfortForm = (props) => {
    const useValidatableFormResult = useValidatableForm(props);

    const getPathRelatedProps = (path) => {
        return {
            path: path,
            value: useValidatableFormResult.getValue(path),
            errorMessage: useValidatableFormResult.getError(path),
            setPathValue: useValidatableFormResult.setPathValue,
            setPathIsBlurred: useValidatableFormResult.setPathIsBlurred,
        };
    };

    return {
        ...useValidatableFormResult,
        getPathRelatedProps,
    };
};

export default useComfortForm;
