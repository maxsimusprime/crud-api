export const isUserDataValid = (userData: unknown): boolean => {
  if (
    userData instanceof Object &&
    "username" in userData &&
    typeof userData.username === "string" &&
    "age" in userData &&
    typeof userData.age === "number" &&
    "hobbies" in userData &&
    userData.hobbies instanceof Array
  ) {
    if (userData.hobbies.filter((el) => typeof el !== "string").length > 0) {
      return false;
    }
    return true;
  } else {
    return false;
  }
};
