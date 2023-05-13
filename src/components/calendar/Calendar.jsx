import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import '../../styles/calendar/Calendar.scss';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());

  registerLocale('ko', ko);

  return (
    <div className={'calendar'}>
      <DatePicker locale={'ko'} selected={startDate} onChange={date => setStartDate(date)} inline />
    </div>
  );
};

export default Calendar;