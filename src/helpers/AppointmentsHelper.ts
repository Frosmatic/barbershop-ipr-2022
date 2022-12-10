import { DateTime } from 'luxon';

export default class AppointmentsHelper {
  static generateAppointmentTimeSlots(date: Date, duration: number) {
    const timeSlots = [];
    let start = DateTime.fromJSDate(date)
      .startOf('day')
      .plus({ hours: 9 })
      .startOf('hour');

    const end = DateTime.fromJSDate(date)
      .startOf('day')
      .plus({ hours: 20 })
      .startOf('hour');

    while (start < end) {
      timeSlots.push({
        startTime: start.toISO(),
        endTime: start.plus({ minutes: duration }).toISO(),
      });
      start = start.plus({ minutes: duration });
    }

    return timeSlots;
  }
}
