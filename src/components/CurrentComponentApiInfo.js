import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import './CurrentComponentApiInfo.css';
import { DataGrid } from '../lib';

const definitions = [
    {
        key: 'name',
        align: 'left',
        padding: 'normal',
        header: 'Name',
        sortable: false,
    },
    {
        key: 'type',
        align: 'left',
        padding: 'normal',
        header: 'Type',
        sortable: false,
    },
    {
        key: 'defaultValue',
        align: 'left',
        padding: 'normal',
        header: 'Default Value',
        sortable: false,
    },
    {
        key: 'description',
        align: 'left',
        padding: 'normal',
        header: 'Description',
        sortable: false,
    },
];

const CurrentComponentInfo = ({
    currentApiInfo,
    currentApiLinks: currentApiLink,
    header,
    extraApiInfo,
    extraApiInfoHeader,
}) => {
    return (
        <>
            <div className={'currentRuleInfoDiv'}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <span className={'currentRuleLabel'}>{header}</span>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DataGrid
                            title={header}
                            identifierKey={'name'}
                            rows={currentApiInfo}
                            totalRowCount={50}
                            enablePagination={false}
                            definitions={definitions}
                        />
                        {currentApiLink ? (
                            <span className={'moreInformationLink'}>
                                <a href={currentApiLink} target="_blank" rel="noreferrer">
                                    More Information{' '}
                                </a>
                            </span>
                        ) : null}
                    </AccordionDetails>
                </Accordion>
            </div>

            {extraApiInfo && extraApiInfo.length > 0 ? (
                <div className={'currentRuleInfoDiv'}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <span className={'currentRuleLabel'}>{extraApiInfoHeader}</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <DataGrid
                                title={extraApiInfoHeader}
                                identifierKey={'name'}
                                rows={extraApiInfo}
                                totalRowCount={50}
                                enablePagination={false}
                                definitions={definitions}
                            />
                        </AccordionDetails>
                    </Accordion>
                </div>
            ) : null}
        </>
    );
};

export default CurrentComponentInfo;
