const { groupBy } = require("lodash");

const insightHelper = {
    groupByApplicationState: (applications) => {
        let res = groupBy(applications, "state.name");
        return res;
    }
}

module.exports = insightHelper;