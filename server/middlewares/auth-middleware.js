/* eslint-disable arrow-body-style */
// import { NextResponse, NextRequest } from 'next/server';
// const { NextResponse, NextRequest } = require('next/server');

const authMiddleware = (req, res, next) => {
  // show the page
  // next();
  return next();
};

module.exports = authMiddleware;
