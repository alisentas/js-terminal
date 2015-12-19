var ls = {
	definition: "List information  about  the FILEs (the current directory by default).",
	version: "1.0.0",
	options: {
		"version": [false, undefined, "Shows version"],
		"help": [false, undefined, "Shows help information"]
	},
	acceptArguments: true,
	action: function(arguments, options){
		if(options["version"]){
			write(this.version);
			return 0;
		}
		if(options["help"]){
			write("Usage: ls [OPTION]... [FILE]...<br />List information about the FILEs (the current directory by default).");
			return 0;
		}
	}
}

commands["ls"] = ls;
