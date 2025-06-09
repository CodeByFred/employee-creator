import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type MUIXDatePickerProps = {
  children: string;
};

const MUIXDatePicker = ({children}: MUIXDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label={children}/>
      </DemoContainer>
    </LocalizationProvider>
  );
}
export default MUIXDatePicker