const applicationHelper = {
  getApplicationsWithoutNull: (applications) => {
    return applications.filter(
      (item) => item?.centre && item?.children && item?.parent && item?.state
    );
  },
};

module.exports = applicationHelper;
