import './ExampleUsageWrapper.css';

const ExampleUsageWrapper = (props) => {
    let urlsJsx = null;

    const wrapperClassName = props.wrapperClassName || 'examplesUsageWrapperDiv';

    return (
        <div className={wrapperClassName}>
            <span className="pageTitle">{props.header}</span>
            {urlsJsx}
            <div className="mainWrapperDiv">{props.children}</div>
        </div>
    );
};

export default ExampleUsageWrapper;
