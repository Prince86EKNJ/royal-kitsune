var fs = require("fs");

module.exports = function(T, F)
{
	var fData = fs.readFileSync("/home/ubuntu/.bashrc", "UTF-8");
	console.log(fData);

	console.log("=== SCRATCH ===");

	console.log(T, F)
	F.insertWithNextId(T.name, { name: "prince" });
	F.insertWithNextId(T.name, { name: "hime" });
	F.insertWithNextId(T.name, { name: "james" });

	console.log("=== END SCRATCH ===");
};
