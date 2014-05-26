(function()
{
	var kitsuneFunc = function(_, db)
	{
		var kitsune = function()
		{
			console.log("=== Royal Kitsune ===");

			var F = {};

			F.createEntity = function()
			{
				var hash = F.buildHash(20);
				var id = F.insertWithNextId(db.entity, { hash: hash });
				return id;
			};

			F.buildHash = function(size)
			{
				var hash = "";

				for(var i=0; i<size*2; i++)
				{
					hash += F.getRandomHexChar();
				}

				return hash;
			};

			F.getRandomHexChar = function()
			{
				var charCode = Math.floor(Math.random() * 16);
				charCode += charCode > 9 ? 87 : 48;
				var hexChar = String.fromCharCode(charCode);
				return hexChar;
			};

			F.addFunc = function()
			{
				func.insert();
			};

			F.getNextId = function(table)
			{
				var id = table().max("id") + 1;
				id = id == null ? 1 : id;
				return id;
			};

			F.insertWithNextId = function(table, data)
			{
				var nextId = F.getNextId(table);
				data["id"] = nextId;
				table.insert(data);
				return nextId;
			};

			console.log("=== END OF LINE ===");

			var exports =
			{
				db: db,
				F: F
			};

			_.each(exports, function(value, key)
			{
				window[key] = value;
			});
		};

		return kitsune;
	};

	// requireJS
	define(["lodash", "db"], kitsuneFunc);
}());
