const express = require('express');
const jwt = require('jsonwebtoken');
const { ROLE } = require('../../constants/role.constant');

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const Authorization = req.get('Authorization');
    if(Authorization) {
      const token = Authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          res.status(403).json({message: "Forbidden", data: {}})
        }

        req.user = user;
        next();
      })
    }
    else {
      return res.status(401).json({message: "Unauthorized", data: {}});
    }
  },

  isSuperAdmin: (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (req.user.roleId.name === ROLE.SUPER_ADMIN) {
        next();
      }
      return res.status(403).json({message: "Forbidden", data: {}});
    });
  },

  isCentreAdmin: (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (req.user.roleId.name === ROLE.CENTRE_ADMIN) {
        next();
      }
      return res.status(403).json({message: "Forbidden", data: {}});
    })
  },

  isCentreStaff: (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (req.user.roleId.name === ROLE.CENTRE_STAFF) {
        next();
      }
      return res.status(403).json({message: "Forbidden", data: {}});
    })
  },

  isParent: (req, res, next) => {
    this.verifyToken(req, res, () => {
      if (req.user.roleId.name === ROLE.PARENT) {
        next();
      }
      return res.status(403).json({message: "Forbidden", data: {}});
    })
  }
}


module.exports = authMiddleware;
