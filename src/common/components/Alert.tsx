import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert = (props: AlertProps) => <MuiAlert elevation={0} variant="filled" {...props} />;

export default Alert;