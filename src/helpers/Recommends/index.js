// const { PythonShell } = require("python-shell");

// const recommendFunc = async (params) => {
//   try {
//     const {userLength, ratings, items} = params;
//     let rs;
//     await PythonShell.run("./recommendSys.py", {
//       args: []
//     }, async (err, results) => {
//       if (err) throw err;
//       rs = await results;
//     });
//     return rs;
//   } catch (error) {
//     throw new Error(error);
//   }
// }


// // recommendFunc();
// module.exports = recommendFunc;
