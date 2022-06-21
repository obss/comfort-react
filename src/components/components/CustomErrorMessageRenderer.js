import CancelIcon from '@mui/icons-material/Cancel';
import './CustomErrorMessageRenderer.css';

export const customErrorMessageRenderer = (errorMessage) => {
    return (
        <span className="CustomErrorMessage">
            <CancelIcon className="CustomErrorMessageIcon" />
            {errorMessage}
        </span>
    );
};
