import { Button, Tooltip } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import './Settings.css';

const Settings = (props) => {
    const { openSettingsDialog } = props;
    const versionInfo = `Version: ${import.meta.env.VITE_REACT_APP_VERSION}`;

    return (
        <div className={'settings-div'}>
            <span className={'settingsTitle'}>
                <Button variant="contained" className="topButton" onClick={() => openSettingsDialog()}>
                    <SettingsOutlined />
                </Button>
            </span>
            <Tooltip placement="bottom" title="View on GitHub">
                <span className={'githubIcon'}>
                    <a href={'https://github.com/obss/comfort-react'} target="_blank" rel="noreferrer">
                        <img src={import.meta.env.BASE_URL + '/github.png'} alt="github_icon" />
                    </a>
                </span>
            </Tooltip>
            <Tooltip placement="bottom" title="View on npmjs">
                <span className={'npmIcon'}>
                    <a href={'https://www.npmjs.com/package/comfort-react'} target="_blank" rel="noreferrer">
                        <img src={import.meta.env.BASE_URL + '/npm.png'} alt="npm_icon" />
                    </a>
                </span>
            </Tooltip>
            <Tooltip placement="bottom" title="Current Version">
                <span className={'versionInfo'}>
                    <a href={'https://www.npmjs.com/package/comfort-react'} target="_blank" rel="noreferrer">
                        {versionInfo}
                    </a>
                </span>
            </Tooltip>
        </div>
    );
};

export default Settings;
