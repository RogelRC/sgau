const isStrongPassword = (password) => {
  if (password.length < 8) return false;

  let cap = false, min = false, num = false, other = false;

  for (const char of password) {
      if (char >= 'a' && char <= 'z') min = true;
      else if (char >= 'A' && char <= 'Z') cap = true;
      else if (char >= '0' && char <= '9') num = true;
      else other = true;
  }

  return cap && min && other && num;
};

export default isStrongPassword;