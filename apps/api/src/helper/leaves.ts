export const statusNumToString = (status: number) => {
  switch (status) {
    case 1:
      return 'approved';
    case 2:
      return 'rejected';
    default:
      return 'pending';
  }
};
