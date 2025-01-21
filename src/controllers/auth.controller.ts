import { User } from "../entities/user.entity";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export const Register = async (req, res) => {
  const { password, password_confirm, ...body } = req.body;

  if (password !== password_confirm) {
    return res.status(400).send({
      message: "Password's do not match",
    });
  }

  const user = await User.save({
    ...body,
    password: await bcryptjs.hash(password, 10),
  });

  res.send(user);
};

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email },
    select: ["id", "password"],
  });

  if (!user) {
    return res.status(400).send({
      message: "Invalid Credentials!",
    });
  }

  if (!(await bcryptjs.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: "Invalid Credentials!",
    });
  }

  const jwt = sign({ id: user.id }, process.env.JWT_SECRET);

  res.send({ jwt });
};

export const GetUser = async (req, res) => {
  res.send(req["user"]);
};
