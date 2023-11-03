import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, useSnackbar } from '../../lib';
import Stack from '@mui/material/Stack';
import ExampleUsageWrapper from '../ExampleUsageWrapper';

const variantList = ['success', 'error', 'warning', 'info'];

const UseSnackbar = () => {
    const isMobile = useMediaQuery('(max-width:1024px)');
    const { enqueueSnackbar } = useSnackbar();

    return (
        <ExampleUsageWrapper
            header="useSnackbar"
            codeUrl={['components/use-snackbar/UseSnackbar.js', 'components/Main.js']}
        >
            <Stack spacing={2} direction={isMobile ? 'column' : 'row'}>
                {variantList.map((variant) => {
                    return (
                        <Button
                            key={variant}
                            variant="contained"
                            color="primary"
                            onClick={() => enqueueSnackbar(`This is ${variant} snackbar`, { variant })}
                        >
                            {variant}
                        </Button>
                    );
                })}
            </Stack>
        </ExampleUsageWrapper>
    );
};

export default UseSnackbar;
