import * as moment from 'moment';

export const getDuration = (dt: number) => {
  const duration = moment.duration(Math.floor(Date.now()) - (dt * 1000));

  let months = duration.months();
  let days = duration.days();
  let hours = duration.hours();
  let minutes = duration.minutes();
  let seconds = duration.seconds();

  if (dt * 1000 > Math.floor(Date.now()))
    return 'A few seconds';

  return months ? months > 1 ? months + ' months' : months + ' month' :
    days ? days > 1 ? days + ' days' : days + ' day' :
      hours ? hours > 1 ? hours + ' hours' : hours + ' hour' :
        minutes ? minutes > 1 ? minutes + ' minutes' : minutes + ' minute' :
          seconds ? seconds > 1 ? Math.abs(seconds) + ' seconds' : Math.abs(seconds) + ' second' : null;
}