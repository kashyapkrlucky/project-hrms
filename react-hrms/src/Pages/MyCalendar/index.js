import React, { useEffect, useState } from 'react'
import CustomPage from '../../Common/CustomPage'
import { bgTheme, borderTheme, cards, textTheme } from '../../Utils/Classes'
import { months, days, getYears } from '../../Utils/DataService';
import LabelDropDown from '../../Common/LabelDropDown';

function MyCalendar() {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const years = getYears(1970);
  const [calender, setCalender] = useState([]);
  const [selection, setSelection] = useState({
    month: 0 || new Date().getMonth(),
    year: 0 || new Date().getFullYear(),
  });

  const onChange = async (e) => {
    const { name, value } = e.currentTarget;
    selection[name] = parseFloat(value);
    updateDates();
  }

  const eventColors = ['bg-green-500', 'bg-pink-500', 'bg-amber-500'];

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
    setCalender([...blanks, ...updatedList]);
  }

  const isTodayDate = (day) => {
    const isCheck = (new Date().getMonth() === (month - 1)) &&
      (new Date().getFullYear() === year) && (day.date === new Date().getDate());
    return isCheck ? `border-2 ${borderTheme} ${textTheme} rounded-md` : ''
  };

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
        <section className='flex flex-col gap-4'>
          <div className='grid grid-cols-7 select-none text-slate-500 text-xs'>
            {days.map((d) =>
              <div className='flex flex-row justify-center p-2 border-y-2 border-slate-200' key={d._id}>
                {d.longName}
              </div>
            )}
          </div>
          <div className='grid grid-cols-7 gap-2 text-sm select-none'>
            {
              calender.map((day, i) => (
                <div className={'flex flex-col h-16 items-center justify-center cursor-pointer ' + isTodayDate(day)} key={i}>
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
      </div>
    </CustomPage>
  )
}

export default MyCalendar