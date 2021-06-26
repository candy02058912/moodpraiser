export const getPraiserLink = (location: Location, habitID: string) => {
  return `${location.origin}/habits/${habitID}/praise`;
};
