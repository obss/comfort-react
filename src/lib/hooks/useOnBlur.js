const useOnBlur = ({ setPathIsBlurred, onBlur, id, path, setFocused, callback }) => {
    const handleOnBlur = (e) => {
        if (callback) {
            callback(e);
        }
        if (setFocused) {
            setFocused(false);
        }
        if (setPathIsBlurred && onBlur) {
            throw new Error('Only one of setPathIsBlurred or onBlur props should be passed');
        }
        if (setPathIsBlurred) {
            setPathIsBlurred(id || path);
        } else if (onBlur) {
            onBlur(e);
        }
    };

    return handleOnBlur;
};

export default useOnBlur;
