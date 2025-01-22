import { Not } from "typeorm";
import { User } from "../entities/user.entity";

export const Users = async (req, res) => {
  const user = req["user"];

  const users = await User.find({
    where: {
      id: Not(user.id),
    },
  });

  res.send(users);
};
