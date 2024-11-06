import User from "../model/user";
import CryptoJS from "crypto-js";

export const getUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("bad request");
  }
};

export const checkUser = async (req, res) => {
  try {
    const { password, username } = req.query;
    const hashPwd = CryptoJS.SHA256(password).toString();
    const data = await User.findOne(
      { username: username, password: hashPwd }
    );
    res.status(200).json(data ? true : false);
  } catch (error) {}
};

export const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const data = await User.findOne(
      { username: username },
      { username: 1, typeUser: 1, imgUri: 1, _id: 0 }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    const { password, typeUser, imgUri } = req.body;
    const hashPwd = CryptoJS.SHA256(password).toString();
    await User.findOneAndUpdate(
      { username: username },
      { password: hashPwd, typeUser: typeUser, imgUri: imgUri }
    );
    const data = await User.findOne({username});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //   return true;
};

export const createUser = async (req, res) => {
  try {
    const { username, password, typeUser, imgUri } = req.body;
    const hashPwd = CryptoJS.SHA256(password).toString();
    const data = await User({
      username,
      password: hashPwd,
      typeUser,
      imgUri,
    }).save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    const data = await User.findOneAndDelete(
      { username: username },
      { username: 1, typeUser: 1, imgUri: 1, _id: 0 }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
