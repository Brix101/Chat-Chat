import config from "config";
import jwt from "jsonwebtoken";

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, "secret", {
    ...(options && options),
  });
};

const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, "secret");
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};

export { signJwt, verifyJwt };
