

class UserController{
    // static async addUser(req, res, next) {
    //     try {
    //       const { email, password } = req.body;
    //       let user = await User.create({
    //         email,
    //         password,
    //       });
    //       res.status(201).json({ id: user.id, email: user.email });
    //     } catch (error) {
          
    //       next(error)
    //     }
    //   }

    // static async loginUser(req, res, next) {
    //     try {
    //       let { email, password } = req.body;
    //       if (!email) {
    //         throw {
    //           name: "CustomError",
    //           status: 400,
    //           message: "Email is required",
    //         };
    //       }
    
    //       if (!password) {
    //         throw {
    //           name: "CustomError",
    //           status: 400,
    //           message: "Password is required",
    //         };
    //       }
    
    //       let user = await User.findOne({
    //         where: {
    //           email: email,
    //         },
    //       });
    //       if (!user || !comparePassword(password, user.password)) {
    //         throw {
    //           name: "CustomError",
    //           status: 400,
    //           message: "Invalid Email/Password",
    //         };
    //       }
    
    //       let token = signToken({ id: user.id });
    //       res.status(200).json({ access_token: token });
    //     } catch (error) {
    //         next(error)
    //     }
    //   }
}

module.exports = UserController