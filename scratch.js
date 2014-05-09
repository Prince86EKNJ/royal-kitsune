//map <C-x> :wall \| !node kitsune.js
//map <S-x> :wall \| !node kitsune.js -r

var fs = require("fs");

module.exports = function(T, F)
{
	// var fData = fs.readFileSync("/home/prince/.bashrc", "UTF-8");
	// console.log(fData);

	console.log("=== SCRATCH ===");

	//console.log(T, F)
	F.insertWithNextId(T.name, { name: "prince" });
	F.insertWithNextId(T.name, { name: "hime" });
	F.insertWithNextId(T.name, { name: "james" });

	F.renderInJavaScript(T.func().get());

	console.log("=== END SCRATCH ===");
};
