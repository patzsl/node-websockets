import { Not } from "typeorm";
import { User } from "../entities/user.entity";

export const Users = async (req, res) => {
  const user = req["user"];
  const name = req.query.name || "";

  let users = await User.find({
    where: {
      id: Not(user.id),
    },
  });

  if (name != "") {
    users = users.filter(
      (u) =>
        u.first_name.toLowerCase().includes(name.toLowerCase()) ||
        u.last_name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.send(users);
};
