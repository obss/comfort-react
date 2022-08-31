const useOnBlur = ({ setPathIsBlurred, onBlur, id, path, setFocused }) => {
    const handleOnBlur = () => {
        setFocused && setFocused(false);
        if (setPathIsBlurred && onBlur) {
            throw new Error('Only one of setPathIsBlurred or onBlur props should be passed');
        }
        if (setPathIsBlurred) {
            setPathIsBlurred(id || path);
        } else if (onBlur) {
            onBlur();
        }
    };

    return handleOnBlur;
};

export default useOnBlur;
