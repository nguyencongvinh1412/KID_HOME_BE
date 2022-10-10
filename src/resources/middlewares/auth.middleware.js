const express = require('express');
const jwt = require('jsonwebtoken');

const authMiddleware = {

  // verify token
  verifyToken: (req, res, next) => {
    const Authorization = req.get('Authorization');
    if(Authorization) {
      const token = Authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          res.status(403).json({"detail": "Token is not valid"})
        }

        req.user = user;
        next();
      })
    }
    else {
      return res.status(401).json({"detail": "You are not authenticated"});
    }
  },
}


module.exports = authMiddleware;
