import { Box, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './Installation.css';
import { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const npmCommand = 'npm install comfort-react';
const yarnCommand = 'yarn add comfort-react';

const Home = () => {
    const [npmCopied, setNpmCopied] = useState(false);
    const [yarnCopied, setYarnCopied] = useState(false);

    const handleNpmCopy = () => {
        setYarnCopied(false);
        setNpmCopied(true);
        navigator.clipboard.writeText(npmCommand);
        setTimeout(() => {
            setNpmCopied(false);
        }, 1000);
    };

    const handleYarnCopy = () => {
        setNpmCopied(false);
        setYarnCopied(true);
        navigator.clipboard.writeText(yarnCommand);
        setTimeout(() => {
            setYarnCopied(false);
        }, 1000);
    };

    return (
        <Box
            className={'homeContainer'}
            display={'flex'}
            textAlign={'center'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            rowGap={5}
            pt={2}
        >
            <img width={'200px'} src={import.meta.env.BASE_URL + '/logo.png'} alt={'logo'} />
            <Typography variant={'h3'}> comfort-react </Typography>
            <Typography variant={'h6'}>
                {' '}
                <a
                    className="outsideUrlSpan"
                    href={'https://www.npmjs.com/package/comfort-react'}
                    target="_blank"
                    rel="noreferrer"
                >
                    comfort-react
                </a>{' '}
                is a React.js framework for react projects.{' '}
            </Typography>
            <Box display={'flex'} flexWrap={'wrap'} flexDirection={'row'} gap={1}>
                <Tooltip className={'copyButtons'} open={npmCopied} placement="top" title="copied!">
                    <Button variant="outlined" onClick={handleNpmCopy}>
                        <div className="commandBox">
                            <p className="commandText">{npmCommand}</p>
                        </div>
                        <span className="installButtonIcon">
                            {npmCopied ? <DoneOutlineIcon /> : <ContentCopyIcon />}
                        </span>
                    </Button>
                </Tooltip>
                <Tooltip className={'copyButtons'} open={yarnCopied} placement="bottom" title="copied!">
                    <Button variant="outlined" onClick={handleYarnCopy}>
                        <div className="commandBox">
                            <p className="commandText">{yarnCommand}</p>
                        </div>
                        <span className="installButtonIcon">
                            {yarnCopied ? <DoneOutlineIcon /> : <ContentCopyIcon />}
                        </span>
                    </Button>
                </Tooltip>
            </Box>
            <Box display={'flex'} flexWrap={'wrap'} gap={1} justifyContent={'center'} py={1}>
                <Link to={'/getting-started/installation'}>
                    <Button size={'large'} variant={'contained'} sx={{ borderRadius: '30px' }}>
                        Get Started
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Home;
