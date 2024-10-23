import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from '../models/User.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    
    if (!user) {
      user = await User.create({
        email: profile.emails[0].value,
        name: profile.displayName,
        password: 'google-auth', // Set a placeholder password
        isVerified: true,
        provider: 'google',
        providerId: profile.id
      });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id, provider: 'github' });
    
    if (!user) {
      user = await User.create({
        email: profile.emails[0].value,
        name: profile.displayName || profile.username,
        password: 'github-auth', // Set a placeholder password
        isVerified: true,
        provider: 'github',
        providerId: profile.id
      });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

export default passport;