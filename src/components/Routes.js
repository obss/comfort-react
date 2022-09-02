import { Route, Switch } from 'react-router-dom';
import '../App.css';
import { NavSidebar } from './NavSidebar';
import Homepage from './Homepage';
import CustomMessage from './validatable-form/CustomMessage';
import CustomTranslations from './validatable-form/CustomTranslations';
import Installation from './getting-started/Installation';
import ApiComfortReactProvider from './api/ApiComfortReactProvider';
import Home from './getting-started/Home';
import RuleTckn from './rules/RuleTckn';
import RulePhoneNumber from './rules/RulePhoneNumber';
import RuleTime from './rules/RuleTime';
import RuleVkn from './rules/RuleVkn';
import UseSnackbar from './use-snackbar/UseSnackbar';
import UseApi from './use-api/UseApi';
import ComponentButton from './components/ComponentButton';
import ComponentIconButton from './components/ComponentIconButton';
import ComponentTextField from './components/ComponentTextField';
import ComponentCheckbox from './components/ComponentCheckbox';
import ComponentAutocomplete from './components/ComponentAutocomplete';
import ComponentRadioButton from './components/ComponentRadioButton';
import ComponentTransferList from './components/ComponentTransferList';
import ComponentNumberField from './components/ComponentNumberField';
import ComponentDatePicker from './components/ComponentDatePicker';
import ComponentMaskField from './components/ComponentMaskField';
import ComponentTimePicker from './components/ComponentTimePicker';
import ComponentPhoneInput from './components/ComponentPhoneInput';
import ComponentTable from './components/ComponentTable';
import ComponentMenuButton from './components/ComponentMenuButton';
import ListItemsExample from './examples/ListItemsExample';
import ComponentShrinkableTransferList from './components/ComponentShrinkableTransferList';
import ComponentDialog from './components/ComponentDialog';
import Usage from './getting-started/Usage';
import UseSnackbarApi from './use-snackbar/UseSnackbarApi';
import UseApiApi from './use-api/UseApiApi';
import ComponentConfirmDialog from './components/ComponentConfirmDialog';
import ComponentFormDialog from './components/ComponentFormDialog';
import ComponentFileInput from './components/ComponentFileInput';
import ComponentSwitch from './components/ComponentSwitch';
import ComponentCheckList from './components/ComponentCheckList';

const Routes = (props) => {
    return (
        <>
            <NavSidebar toggleDrawer={props.toggleDrawer} menuIsHidden={props.menuIsHidden} />
            <div className="generalDiv" onClick={props.onOutsideClick}>
                <Switch>
                    <Route exact path="/getting-started/home">
                        <Home />
                    </Route>
                    <Route exact path="/getting-started/installation">
                        <Installation />
                    </Route>
                    <Route exact path="/getting-started/usage">
                        <Usage openSettingsDialog={props.openSettingsDialog} />
                    </Route>
                    <Route exact path="/components/button">
                        <ComponentButton />
                    </Route>
                    <Route exact path="/components/icon-button">
                        <ComponentIconButton />
                    </Route>
                    <Route exact path="/components/menu-button">
                        <ComponentMenuButton />
                    </Route>
                    <Route exact path="/components/text-field">
                        <ComponentTextField />
                    </Route>
                    <Route exact path="/components/checkbox">
                        <ComponentCheckbox />
                    </Route>
                    <Route exact path="/components/checklist">
                        <ComponentCheckList />
                    </Route>
                    <Route exact path="/components/number-field">
                        <ComponentNumberField />
                    </Route>
                    <Route exact path="/components/date-picker">
                        <ComponentDatePicker />
                    </Route>
                    <Route exact path="/components/autocomplete">
                        <ComponentAutocomplete />
                    </Route>
                    <Route exact path="/components/radio-button">
                        <ComponentRadioButton />
                    </Route>
                    <Route exact path="/components/transfer-list">
                        <ComponentTransferList />
                    </Route>
                    <Route exact path="/components/file-input">
                        <ComponentFileInput />
                    </Route>
                    <Route exact path="/components/mask-field">
                        <ComponentMaskField />
                    </Route>
                    <Route exact path="/components/shrinkable-transfer-list">
                        <ComponentShrinkableTransferList />
                    </Route>
                    <Route exact path="/components/time-picker">
                        <ComponentTimePicker />
                    </Route>
                    <Route exact path="/components/phone-input">
                        <ComponentPhoneInput />
                    </Route>
                    <Route exact path="/components/switch">
                        <ComponentSwitch />
                    </Route>
                    <Route exact path="/components/table">
                        <ComponentTable />
                    </Route>
                    <Route exact path="/components/dialog">
                        <ComponentDialog />
                    </Route>
                    <Route exact path="/components/confirm-dialog">
                        <ComponentConfirmDialog />
                    </Route>
                    <Route exact path="/components/form-dialog">
                        <ComponentFormDialog />
                    </Route>
                    <Route exact path="/validatable-form/tckn">
                        <RuleTckn />
                    </Route>
                    <Route exact path="/validatable-form/phone-number">
                        <RulePhoneNumber />
                    </Route>
                    <Route exact path="/validatable-form/time">
                        <RuleTime />
                    </Route>
                    <Route exact path="/validatable-form/vkn">
                        <RuleVkn />
                    </Route>
                    <Route exact path="/validatable-form/custom-message">
                        <CustomMessage />
                    </Route>
                    <Route exact path="/validatable-form/translations">
                        <CustomTranslations />
                    </Route>
                    <Route exact path="/notistack/use-snackbar">
                        <UseSnackbar />
                    </Route>
                    <Route exact path="/notistack/use-snackbar-api">
                        <UseSnackbarApi />
                    </Route>
                    <Route exact path="/use-api/use-api">
                        <UseApi />
                    </Route>
                    <Route exact path="/use-api/use-api-api">
                        <UseApiApi />
                    </Route>
                    <Route exact path="/examples/list-items">
                        <ListItemsExample />
                    </Route>
                    <Route exact path="/api/comfort-react-provider">
                        <ApiComfortReactProvider openSettingsDialog={props.openSettingsDialog} />
                    </Route>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                </Switch>
            </div>
        </>
    );
};

export default Routes;
