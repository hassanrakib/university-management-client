export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const genders = ["male", "female"];

export const bloodGroupsOptions = bloodGroups.map((item) => ({
  label: item,
  value: item,
}));

export const gendersOptions = genders.map((item) => ({
  label: item.toUpperCase(),
  value: item,
}));
