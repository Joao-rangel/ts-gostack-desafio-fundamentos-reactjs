const formatDate = (date: Date): string =>
  `${String(date).slice(8, 10)}/${String(date).slice(5, 7)}/${String(
    date,
  ).slice(0, 4)}`;

export default formatDate;
