import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      const error = new Error('User already exists');
      error.status = 400;
      return next(error);
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      role,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    const isMatch = await user.comparePassword(password);

    // ユーザー存在の有無を隠す
    if (!user || !isMatch) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      return next(error);
    }

    // Create JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Save to Cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false, // development
      sameSite: 'Lax',
      maxAge: 1 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'User logged in',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: 'User logged out',
  });
};
