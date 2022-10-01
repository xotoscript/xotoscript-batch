// apollo.config.js
module.exports = {
	client: {
		addTypename: false,
		service: {
			name: "xotosphere-graphql",
			url: "http://localhost:8443/graphql"
		},
		includes: ["./src/**/*.vue", "./src/**/*.ts"],
	},
};
