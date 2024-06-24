const checkRole = (role) => {
    return role == 'Admin' || role == 'Teacher' || role == 'Student';
};
  
export default checkRole;