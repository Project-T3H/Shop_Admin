import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


export default function BasicDatePicker(props) {

  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name, value
    }
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField']}>
        <DatePicker
          label={label}
          value={dayjs(value)}
          name={name}
          // defaultValue={dayjs('2022-04-17')}
          onChange={date => onChange(convertToDefEventPara(name, date))}
          format="YYYY-MM-DD"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}