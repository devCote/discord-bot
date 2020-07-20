export const dateToday = (): string => {
  const date = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  return `${month} ${day}, ${year}`;
};

export const capitalize = (str: string) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateNumber = (greetingsSize: number): number => {
  const max = greetingsSize;
  const min = 0;
  const randomNum = Math.random() * (max - min) + min;
  return Math.round(randomNum);
};
