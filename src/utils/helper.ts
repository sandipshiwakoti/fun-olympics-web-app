import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(relativeTime);

import { baseUrl } from "../config/url";

export const getImgLink = (img: string) => {
  return img
    ? `${baseUrl}/${img}`
    : `https://mapbiomas.org/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png`;
};

export const getFirstLetterCapitalized = (title: string) => {
  return title.charAt(0).toUpperCase() + title.slice(1);
};

export const getFormattedDateWithoutTime = (date: string) => {
  return dayjs(date).utc().format("dddd, MMM D, YYYY");
};

export const getDateTime = (date: string) => {
  return dayjs(date).format("dddd, MMM D, YYYY, h:mm A");
};

export const getFormattedTime = (date: string) => {
  return dayjs(date).utc().format("h:mm A");
};

export const getTruncatedText = (text: string) => {
  if (text?.length > 70) {
    return text?.slice(0, 70) + "...";
  } else {
    return text;
  }
};

export const getRelativeTime = (date: string) => {
  return dayjs(date).utc().fromNow();
};

export const isEventLive = (date: string) => {
  const currDate: any = new Date();
  const eventDate: any = new Date(date);
  const diffHrs = Math.floor(Math.abs(currDate - eventDate) / 36e5);
  return diffHrs <= 5;
};

export const isEventUpcoming = (date: string) => {
  const currDate: any = new Date();
  const eventDate: any = new Date(date);
  const diffHrs = Math.floor(Math.abs(currDate - eventDate) / 36e5);
  if (diffHrs > 5 && eventDate - currDate > 0) return true;
  return false;
};

export const isEventOld = (date: string) => {
  const currDate: any = new Date();
  const eventDate: any = new Date(date);
  const diffHrs = Math.floor(Math.abs(currDate - eventDate) / 36e5);
  if (diffHrs > 5 && eventDate - currDate < 0) return true;
  return false;
};
