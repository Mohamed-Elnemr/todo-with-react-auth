extractTokenFromHeader = (req) =>{ 
    // Finds the token in headrs
    token = req.get("authorization")
    if(!token){ return null } 
    // Parses the token
    token = token.toString().replace("Bearer", "").trim();
    return token
}

module.exports = extractTokenFromHeader