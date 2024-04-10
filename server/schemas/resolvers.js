const { User } = require('../models')
const {signToken, AuthenticationError} = require('../utils/auth')

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
              return userData;
            }
            throw AuthenticationError;
        },
        test: () => {
          return "Hello"
        },
        mult: (parent, { x, y }) => {
          return x * y
        },
        users: async () => {
          const users = await User.find({})
          return users
        }
    },

    Mutation: {
        // addUser: async (parent, args) => {
        addUser: async (parent, { username, email, password }) => {
            // const user = await User.create(args);
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
            // args are the form data that comes from the front end. Args is the umbrella term for that info which then gets assigned to the user along with a token that, together, authorizes the user. 
          },
        // email and password in this case are destructured 'args'
        login: async (parent, { email, password }) => {
            console.log("TEST")
            const user = await User.findOne({ email });
            if (!user) {
              console.log("User not found")
              throw AuthenticationError;
            }
            // isCorrectPassword decrypts the password that gets sent in the password and checks to see if the password matches the assigned hashed password.
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
              console.log("Password incorrect")
              throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
          },

          saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }
              );
              return updatedUser;
            }
            throw AuthenticationError;
          },
          removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
              );
              return updatedUser;
            }
            throw AuthenticationError;
          },
     
    }
}

module.exports = resolvers