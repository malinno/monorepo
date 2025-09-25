import * as yup from "yup";

// Common validation schemas
export const emailSchema = yup
  .string()
  .email("Email không hợp lệ")
  .required("Email là bắt buộc");

export const passwordSchema = yup
  .string()
  .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
  )
  .required("Mật khẩu là bắt buộc");

export const nameSchema = yup
  .string()
  .min(2, "Tên phải có ít nhất 2 ký tự")
  .max(50, "Tên không được quá 50 ký tự")
  .required("Tên là bắt buộc");

export const phoneSchema = yup
  .string()
  .matches(/^(\+84|84|0)[1-9][0-9]{8,9}$/, "Số điện thoại không hợp lệ")
  .required("Số điện thoại là bắt buộc");

// Form validation schemas
export const loginSchema = yup.object({
  email: emailSchema,
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  rememberMe: yup.boolean(),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("Mật khẩu hiện tại là bắt buộc"),
  newPassword: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

export const profileSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  avatar: yup.string().url("URL avatar không hợp lệ").optional(),
});

// Utility functions
export const validateEmail = (email: string): boolean => {
  return emailSchema.isValidSync(email);
};

export const validatePassword = (password: string): boolean => {
  return passwordSchema.isValidSync(password);
};

export const validatePhone = (phone: string): boolean => {
  return phoneSchema.isValidSync(phone);
};

// Error message formatter
export const formatValidationError = (error: yup.ValidationError): string => {
  return error.errors.join(", ");
};

// Custom validators
export const createCustomValidator = (
  validator: (value: any) => boolean,
  message: string
) => {
  return yup.mixed().test("custom", message, validator);
};

// File validation
export const fileSchema = yup.object({
  file: yup
    .mixed()
    .test("fileSize", "File quá lớn", (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024; // 5MB
    })
    .test("fileType", "Loại file không được hỗ trợ", (value) => {
      if (!value) return true;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      return allowedTypes.includes(value.type);
    }),
});

export default {
  emailSchema,
  passwordSchema,
  nameSchema,
  phoneSchema,
  loginSchema,
  changePasswordSchema,
  profileSchema,
  validateEmail,
  validatePassword,
  validatePhone,
  formatValidationError,
  createCustomValidator,
  fileSchema,
};
