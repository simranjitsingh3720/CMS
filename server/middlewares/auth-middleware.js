/* eslint-disable arrow-body-style */
// import { NextResponse, NextRequest } from 'next/server';
const { NextResponse, NextRequest } = require('next/server');

const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    console.log('path ', req.path);
    // if (req.path.includes('/signup') || req.path.includes('/signin') || req.path.includes('/forgot-password') || req.path.includes('/password-change')) {
    //   // show the page
    //   next();
    // }
    return next();
  }
  // if (req.path.includes('/signup') || req.path.includes('/signin') || req.path.includes('/forgot-password') || req.path.includes('/password-change')) {
  // return next('/admin');
  // }
  // show the page
  // next();
};

module.exports = authMiddleware;
