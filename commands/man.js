var man = {
	definition: "man - an interface to the on-line reference manuals",
	version: "1.0.0",
	options: {
		"help": [false, undefined, "Show help text"],
		"usage": [false, undefined, "Show usage"],
	},
	acceptArguments: true,
	action: function(argument, options){
		for(command in arguments){
			if(commands[arguments[command]] != undefined){
				if(commands[arguments[command]].definition != undefined){
					write(commands[arguments[command]].definition);
					return 0;
				}else{
					write("No manual entry for " + arguments[command]);
					return 0;
				}
			}else{
				write("No manual entry for " + arguments[command]);
				return 0;
			}
		}
	}
}

commands["man"] = man;
