import { Routes, Route } from 'react-router-dom';
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
import UseComfortForm from './validatable-form/UseComfortForm';
import AppRouteWithTitle from './AppRouteWithTitle';

const AppRoutes = (props) => {
    return (
        <>
            <NavSidebar toggleDrawer={props.toggleDrawer} menuIsHidden={props.menuIsHidden} />
            <div className="generalDiv" onClick={props.onOutsideClick}>
                <Routes>
                    <Route
                        exact
                        path="/getting-started/home"
                        element={
                            <AppRouteWithTitle title="Comfort React">
                                <Home />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/getting-started/installation"
                        element={
                            <AppRouteWithTitle title="Installation">
                                <Installation />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/getting-started/usage"
                        element={
                            <AppRouteWithTitle title="Usage">
                                <Usage openSettingsDialog={props.openSettingsDialog} />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/button"
                        element={
                            <AppRouteWithTitle title="Button">
                                <ComponentButton />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/icon-button"
                        element={
                            <AppRouteWithTitle title="IconButton">
                                <ComponentIconButton />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/menu-button"
                        element={
                            <AppRouteWithTitle title="MenuButton">
                                <ComponentMenuButton />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/text-field"
                        element={
                            <AppRouteWithTitle title="TextField">
                                <ComponentTextField />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/checkbox"
                        element={
                            <AppRouteWithTitle title="Checkbox">
                                <ComponentCheckbox />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/check-list"
                        element={
                            <AppRouteWithTitle title="CheckList">
                                <ComponentCheckList />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/number-field"
                        element={
                            <AppRouteWithTitle title="NumberField">
                                <ComponentNumberField />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/date-picker"
                        element={
                            <AppRouteWithTitle title="DatePicker">
                                <ComponentDatePicker />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/autocomplete"
                        element={
                            <AppRouteWithTitle title="Autocomplete">
                                <ComponentAutocomplete />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/radio-button"
                        element={
                            <AppRouteWithTitle title="RadioButton">
                                <ComponentRadioButton />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/transfer-list"
                        element={
                            <AppRouteWithTitle title="TransferList">
                                <ComponentTransferList />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/file-input"
                        element={
                            <AppRouteWithTitle title="FileInput">
                                <ComponentFileInput />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/mask-field"
                        element={
                            <AppRouteWithTitle title="MaskField">
                                <ComponentMaskField />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/shrinkable-transfer-list"
                        element={
                            <AppRouteWithTitle title="ShrinkableTransferList">
                                <ComponentShrinkableTransferList />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/time-picker"
                        element={
                            <AppRouteWithTitle title="TimePicker">
                                <ComponentTimePicker />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/phone-input"
                        element={
                            <AppRouteWithTitle title="PhoneInput">
                                <ComponentPhoneInput />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/switch"
                        element={
                            <AppRouteWithTitle title="Switch">
                                <ComponentSwitch />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/table"
                        element={
                            <AppRouteWithTitle title="Table">
                                <ComponentTable />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/dialog"
                        element={
                            <AppRouteWithTitle title="Dialog">
                                <ComponentDialog />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/confirm-dialog"
                        element={
                            <AppRouteWithTitle title="ConfirmDialog">
                                <ComponentConfirmDialog />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/components/form-dialog"
                        element={
                            <AppRouteWithTitle title="FormDialog">
                                <ComponentFormDialog />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/validatable-form/tckn"
                        element={
                            <AppRouteWithTitle title="Tckn">
                                <RuleTckn />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/validatable-form/phone-number"
                        element={
                            <AppRouteWithTitle title="PhoneNumber">
                                <RulePhoneNumber />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/validatable-form/time"
                        element={
                            <AppRouteWithTitle title="Time">
                                <RuleTime />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/validatable-form/vkn"
                        element={
                            <AppRouteWithTitle title="Vkn">
                                <RuleVkn />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/validatable-form/custom-message"
                        element={
                            <AppRouteWithTitle title="CustomMessage">
                                <CustomMessage />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/validatable-form/translations"
                        element={
                            <AppRouteWithTitle title="CustomTranslations">
                                <CustomTranslations />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/validatable-form/use-comfort-form"
                        element={
                            <AppRouteWithTitle title="useComfortForm">
                                <UseComfortForm />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/notistack/use-snackbar"
                        element={
                            <AppRouteWithTitle title="useSnackbar">
                                <UseSnackbar />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/notistack/use-snackbar-api"
                        element={
                            <AppRouteWithTitle title="useSnackbar Api">
                                <UseSnackbarApi />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/use-api/use-api"
                        element={
                            <AppRouteWithTitle title="useApi">
                                <UseApi />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/use-api/use-api-api"
                        element={
                            <AppRouteWithTitle title="useApi Api">
                                <UseApiApi />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/examples/list-items"
                        element={
                            <AppRouteWithTitle title="ListItems Example">
                                <ListItemsExample />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/api/comfort-react-provider"
                        element={
                            <AppRouteWithTitle title="ComfortReactProvider">
                                <ApiComfortReactProvider openSettingsDialog={props.openSettingsDialog} />
                            </AppRouteWithTitle>
                        }
                    />
                    <Route
                        exact
                        path="/"
                        element={
                            <AppRouteWithTitle title="Comfort React">
                                <Homepage />
                            </AppRouteWithTitle>
                        }
                    />
                </Routes>
            </div>
        </>
    );
};

export default AppRoutes;
