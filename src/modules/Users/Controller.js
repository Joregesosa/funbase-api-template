import { hash } from "bcrypt";
import { Users } from "./Model.js"

/**
 * @description Get all Userss
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const index = async (req, res, next) => {
  try {
    const users = await Users.findAll({
      where: { status: true },
      attributes: { exclude: ["password"] }
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get a single Users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const show = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.params.id);

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Create a new Users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const store = async (req, res, next) => {
  try {
    const requeredFields = ["name", "lastname", "email", "password"];
    const missingFields = requeredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      throw { status: 400, message: `Missing fields: ${missingFields.join(", ")}` };
    }

    const existingUser = await Users.findOne({ where: { email: req.body.email } });

    if (existingUser) {
      throw { status: 400, message: "Email already exists" };
    }

    req.body.password = await hash(req.body.password, 10);

    await Users.create(req.body, {
      validate: true,
    });

    res.status(201).json({
      status: "ok",
      message: "User created successfully"
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @description Update a Users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const update = async (req, res, next) => {
  try {
    const users = await Users.findByPk(req.params.id);
    if (!users) {
      throw { status: 404, message: "Users not found" };
    }
    await Users.update(req.body);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a Users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const destroy = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      throw { status: 404, message: "Users not found" };
    }
    await user.update({ status: false });
    await user.save();
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

/**
 * @description Restore a Users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const restore = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      throw { status: 404, message: "Users not found" };
    }
    await user.update({ status: true });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * @description Get profile of the authenticated user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const profile = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.user.id);
    if (!user) {
      throw { status: 404, message: "Users not found" };
    }
    
    res.status(200).json(user);

  } catch (error) {
    next(error);
  }
}

export default { index, show, store, update, destroy, restore, profile };