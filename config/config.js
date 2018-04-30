module.exports = {
    port: process.env.PORT || 8080,
    bodyLimit: process.env.bodyLimit || "100kb",
    JWT_KEY: process.env.JWT_KEY || ""
}
