(function()
{
	var moduleDeps = ["lodash"];
	var moduleFunc = function(_)
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
	};

	if(typeof module.exports == "object")
	{
		// commonjs module support
		module.exports = moduleFunc;
	}
	else if(typeof define == "function")
	{
		// requirejs module support
		define(moduleDeps, moduleFunc);
	}
	else
	{
		// browser support
		window.royal-lodash = moduleFunc;
	}
}());
