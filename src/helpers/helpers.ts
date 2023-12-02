import slotsConstant from 'src/constants/slots.constant';
import { findIndex } from 'lodash';

export function floatToTimeString(floatNumber) {
  floatNumber = floatNumber.toFixed(2);
  let minutes = '0';
  const arrNumber = (floatNumber + '').split('.');
  const hour = arrNumber[0];
  if (arrNumber.length > 1) minutes = arrNumber[1];
  const hourString = hour.toString().padStart(2, '0');
  const minuteString = minutes.toString().padStart(2, '0');
  return hourString + ':' + minuteString;
}

export function listSystemTimeSlots(): {
  timeSlots: {
    label: string;
    value: number;
    reserved: boolean;
  }[];
  slotScaleValue: number;
} {
  const slotScaleInMinutes = slotsConstant.slotScaleInMinutes;
  const slotStart = slotsConstant.slotStart;
  const slotEnd = slotsConstant.slotEnd;
  const timeSlots = [];
  let slotHour = slotStart;
  let slotMinute = 0;
  while (slotHour <= slotEnd) {
    const numericTime = parseFloat(`${slotHour}.${slotMinute}`);
    if (slotHour > slotEnd) continue;
    const timeSlot = {
      label: floatToTimeString(numericTime),
      value: numericTime,
      reserved: false,
    };
    timeSlots.push(timeSlot);
    slotMinute += slotScaleInMinutes;
    while (slotMinute >= 60) {
      slotHour += 1;
      slotMinute = slotMinute % 60;
    }
  }
  //calculate value for slotscale
  let sh = 0;
  let sm = slotScaleInMinutes;
  while (sm >= 60) {
    sh += 1;
    sm = sm % 60;
  }

  return {
    timeSlots,
    slotScaleValue: parseFloat(`${sh}.${sm}`),
  };
}

export function prepareClassroomScheduleTimeSlots(reservations): {
  label: string;
  value: number;
  reserved: boolean;
}[] {
  const timeSlots = listSystemTimeSlots().timeSlots;
  for (const reservation of reservations) {
    let fromIndex = findIndex(timeSlots, function (ts) {
      return ts.value === reservation.from;
    });
    if (fromIndex == -1) {
      fromIndex =
        findIndex(timeSlots, function (ts) {
          return ts.value > reservation.from;
        }) - 1;
    }
    let toIndex = findIndex(timeSlots, function (ts) {
      return ts.value == reservation.to;
    });
    if (toIndex == -1) {
      toIndex = findIndex(timeSlots, function (ts) {
        return ts.value > reservation.to;
      });
    }
    for (let i = fromIndex; i < toIndex; i++) {
      if (i >= fromIndex && i < toIndex) timeSlots[i]['reserved'] = true;
    }
  }
  return timeSlots;
}

export class DecimalColumnTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
