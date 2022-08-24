import { useContext } from 'react';
import ComfortReactContext from '../ComfortReactContext';

const useHelperText = (props = {}) => {
    const context = useContext(ComfortReactContext);
    if (!context) {
        throw new Error('comfort-react error. useHelperText hook must be used inside ComfortReactContext context');
    }
    const { renderErrorMessage: contextRenderErrorMessage } = context;
    const { renderErrorMessage: hookRenderErrorMessage, errorMessage, noHelperText } = props;
    const finalRenderErrorMessage = hookRenderErrorMessage || contextRenderErrorMessage;

    const getEmptyHelperText = () => {
        if (noHelperText) {
            return '';
        }
        return ' ';
    };

    const getHelperText = () => {
        if (errorMessage) {
            if (finalRenderErrorMessage) {
                return finalRenderErrorMessage(errorMessage);
            } else {
                return errorMessage;
            }
        }
        return getEmptyHelperText();
    };

    return getHelperText();
};

export default useHelperText;
