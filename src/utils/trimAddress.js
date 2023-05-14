const trimAddress = (acc) => {
  let trimmedAccount =
    acc.substring(0, 6) + "..." + acc.substring(acc.length - 4, acc.length);
  return trimmedAccount;
};

export default trimAddress;
