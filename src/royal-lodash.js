var _ = require("lodash");

module.exports = function(_)
{
	_.mixin(
	{
		getRandomHexChar: function()
		{
			var charCode = Math.floor(Math.random() * 16);
			charCode += charCode > 9 ? 87 : 48;
			var hexChar = String.fromCharCode(charCode);
			return hexChar;
		},

		buildHash: function(size)
		{
			var hash = "";

			for(var i=0; i<size*2; i++)
			{
				hash += _.getRandomHexChar();
			}

			return hash;
		}
	});

	return _;
}(_);
