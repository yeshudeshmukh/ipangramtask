import React, { useState } from "react";
import { format, subWeeks, addWeeks, startOfWeek, addDays, setHours, setMinutes, setSeconds, setMilliseconds, addMinutes, isBefore } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const Scheaduler = () => {
    const [activeDate, setActiveDate] = useState(new Date());
    const [timezone, settimezone] = useState()

    const handleChange = (e) => {
        const name = e.target.value;
        settimezone(name);
    };

    const submitForm = (e) => {
        e.preventDefault();
        setActiveDate(utcToZonedTime(new Date(), timezone));
        console.log(activeDate)
    };
    const GetWeekDaysNames = () => {

        const setTime = (x, h = 0, m = 0, s = 0, ms = 0) => setHours(setMinutes(setSeconds(setMilliseconds(x, ms), s), m), h)

        const from = setTime(activeDate, 8)
        const to = setTime(activeDate, 24)
        const step = (x) => addMinutes(x, 30)

        const blocks = []
        let cursor = from

        while (isBefore(cursor, to)) {
            blocks.push(
                <div className="slot">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">{format(cursor, 'hh:mm  a')}</label>
                </div>)
            cursor = step(cursor)
        }

        const weekStartDate = startOfWeek(activeDate);
        const weekDays = [];
        for (let day = 1; day < 6; day++) {
            weekDays.push(
                <div >
                    <div className="container">
                        {
                            <table>
                                <tr>
                                    <td className="dayname">
                                        {format(addDays(weekStartDate, day), "E dd/MM")}
                                    </td>
                                    <td className="timer">
                                        {blocks}
                                    </td>
                                </tr>
                            </table>
                        }
                    </div>
                </div>

            );

        }
        return (
            <div className="">{weekDays}</div>
        );
    };


    return (
        <div className="container">
            <div className="scheduler">
                <div className="scheduler__header">
                    <button className="scheduler__btn"
                        onClick={() => setActiveDate(subWeeks(activeDate, 1))}><i className="fa fa-caret-left"></i>Previous Week</button>
                    <div className="scheduler__currentdate"><h2>{format(activeDate, "MMMM dd yyyy")}</h2> </div>
                    <button className="scheduler__btn" onClick={() => setActiveDate(addWeeks(activeDate, 1))}>Next Week<i className="fa fa-caret-right"></i></button>
                </div>
                <div className="scheduler__timezone">
                    <form onSubmit={submitForm} >

                        <label htmlFor="" className="timezone">TimeZone</label><br />
                        <div className="scheduler__select">
                            <select name="" id="" onChange={handleChange}>
                                <option value="Portugal">Western European Time</option>
                                <option value="Europe/Paris">Europe/Paris</option>
                            </select>
                            <input type="submit" value="submit" />
                        </div>
                    </form>
                </div>
                <div className="scheduler__calender">
                    <GetWeekDaysNames />
                </div>
            </div>
        </div>

    )
}
export default Scheaduler;