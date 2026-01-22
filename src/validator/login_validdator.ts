import Joi from "joi";

const option = {
  errors: {
    wrap: {
      label: "",
    },
  },
  allowUnknow: true,
};

const UserSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

async function isValidRequest(data: any) {
  try {
    const result = await UserSchema.validateAsync(data, option);
    return { error: false, info: "" };
  } catch (err: any) {
    return { error: true, info: err.details[0]?.message };
  }
}

export { isValidRequest };
