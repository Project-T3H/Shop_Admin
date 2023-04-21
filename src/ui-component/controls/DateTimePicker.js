import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function DateTimePicker(props) {
    const { name, label, value, onChange } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                    label={label}
                    value={dayjs(value)}
                    name={name}
                    onChange={date => onChange(convertToDefEventPara(name, date))}
                    format="YYYY-MM-DD HH:mm:ss"
                />
        </LocalizationProvider>
    )
}