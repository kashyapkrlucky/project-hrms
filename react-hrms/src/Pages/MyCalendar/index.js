import React, { useEffect, useState } from 'react'
import CustomPage from '../../Common/CustomPage'
import { borderTheme, cards, textTheme } from '../../Utils/Classes'
import { months, days, getYears } from '../../Utils/DataService';
import LabelDropDown from '../../Common/LabelDropDown';
import Moment from 'react-moment';
import BtnOutline from '../../Common/BtnOutline';

function MyCalendar() {
  const [date, setDate] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const years = getYears(1970);
  const [calender, setCalender] = useState([]);
  const [selection, setSelection] = useState({
    month: 0 || new Date().getMonth() + 1,
    year: 0 || new Date().getFullYear(),
  });

  const [eventList, setEventList] = useState([]);

  const onChange = async (e) => {
    const { name, value } = e.currentTarget;
    selection[name] = parseFloat(value);
    updateDates();
  }

  const eventColors = ['bg-green-200', 'bg-pink-200', 'bg-amber-200'];

  const dateEvents = [
    {
      date: new Date(year, month - 1, 8),
      data: [
        {
          title: "Team Meeting - Product launch",
          description: 'Description',
          eventOn: new Date(year, month - 1, 8, 7, 8, 9),
          type: 1,
          status: 1
        }, {
          title: "Upload new data",
          description: 'Description',
          eventOn: new Date(year, month - 1, 8, 17, 18, 19),
          type: 3,
          status: 1
        }
      ]
    },
    {
      date: new Date(year, month - 1, 14),
      data: [
        {
          title: "Product Success Celeberation",
          description: 'Description',
          eventOn: new Date(year, month - 1, 14, 7, 8, 9),
          type: 2,
          status: 1
        }, {
          title: "Send Invite for New Year Party",
          description: 'Description',
          eventOn: new Date(year, month - 1, 14, 11, 13, 22),
          type: 3,
          status: 1
        }
      ]
    }
  ]


  const mergeDateEvents = (list = []) => {
    for (const item of dateEvents) {
      const index = list.findIndex(x => x.date === item.date.getDate());
      list[index].data = item.data;
    }
    return list;
  }
  const updateDates = () => {
    const leapYear = selection.year % 4 === 0 ? 29 : 28;
    const days30m = [4, 6, 9, 11];
    const dayCount = selection.month === 2 ? (leapYear) : (days30m.includes(selection.month) ? 30 : 31);
    setMonth(selection.month);
    setYear(selection.year);
    const dayOfWeek = new Date(selection.year, selection.month - 1, 1).getDay();
    const blanks = [...Array(dayOfWeek)].map((u, i) => { return { date: ' ', data: [] } });
    const dateList = [...Array(dayCount)].map((u, i) => { return { date: i + 1, data: [] } });

    const updatedList = mergeDateEvents(dateList);
    console.log([...blanks, ...updatedList]);
    setCalender([...blanks, ...updatedList]);
  }

  const isTodayDate = (day) => {
    const isCheck = (new Date().getMonth() === (month - 1)) &&
      (new Date().getFullYear() === year) && (day.date === new Date().getDate());
    return isCheck ? `border-2 ${borderTheme} ${textTheme} rounded-md` : ''
  };

  const onDateClick = (day) => {
    setDate(day.date);
    setEventList(day.data);
  }

  const isSelected = (day) => {
    const isCheck = ((selection.month - 1) === (month - 1)) &&
      (selection.year === year) && (day.date === date);
    return isCheck ? `border-2 border-red-500 text-red-500 rounded-md` : ''
  }

  useEffect(() => {
    setSelection({
      month: 0 || new Date().getMonth() + 1,
      year: 0 || new Date().getFullYear()
    })
    updateDates();
  }, []);

  return (
    <CustomPage title="My Calendar">
      <div className={'flex flex-col gap-4 h-full ' + cards}>
        <section className='flex flex-row gap-4'>
          <div className='w-28'>
            <LabelDropDown name="month" value={selection?.month} list={months} onChange={onChange} />
          </div>
          <div className='w-28'>
            <LabelDropDown name="year" value={selection?.year} list={years} onChange={onChange} />
          </div>
        </section>
        <div className='flex flex-row gap-4'>
          <section className='w-4/6 flex flex-col gap-4'>
            <div className='grid grid-cols-7 gap-2 select-none border-b border-gray-300 text-slate-500 text-xs'>
              {days.map((d) =>
                <div className='flex flex-row justify-center p-2' key={d._id}>
                  {d.longName}
                </div>
              )}
            </div>
            <div className='grid grid-cols-7 gap-2 text-sm select-none'>
              {
                calender.map((day, i) => (
                  <div className={'flex flex-col h-16 items-center justify-center cursor-pointer ' + isTodayDate(day) + isSelected(day)} key={i} onClick={() => onDateClick(day)}>
                    <div className='text-3xl'>
                      {day.date}
                    </div>
                    <div className='h-4 flex flex-row gap-1'>
                      {day.data.map(d => (
                        <p className={'w-2 h-2 rounded-full ' + eventColors[d.type - 1]} key={d.title}></p>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
          </section>
          <aside className='w-2/6 px-4 flex flex-col gap-4 border-l border-gray-300'>
            <div className='flex flex-row justify-between items-center'>
              <p>UpComing Events</p>
              <BtnOutline label="Add New"/>
            </div>
            {eventList.map((ev, i) => (
              <div className={'flex flex-col gap-1 p-2 backdrop-opacity-10 rounded-md ' + eventColors[ev.type - 1]} key={i}>
                <p className='text-xs lowercase'><Moment format="HH:MM">{ev?.eventOn}</Moment></p>
                <p className='font-medium'>{ev?.title}</p>
                <p className='text-xs capitalize'>{ev?.description}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </CustomPage>
  )
}

export default MyCalendar