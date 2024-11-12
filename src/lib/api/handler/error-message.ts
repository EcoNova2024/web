// ErrorMessages.ts
import ErrorCode from "./error-codes"

type Language = "en" | "tr"

export function getErrorMessage(
  code: ErrorCode,
  lang: Language = "en"
): string {
  const messages = {
    [ErrorCode.SUCCESS]: {
      en: "Success.",
      tr: "Başarılı.",
    },

    // Client Errors (1xx)
    [ErrorCode.BAD_REQUEST]: {
      en: "Bad request. The server could not understand the request.",
      tr: "Geçersiz istek. Sunucu isteği anlayamadı.",
    },
    [ErrorCode.UNAUTHORIZED]: {
      en: "Unauthorized access.",
      tr: "Yetkisiz erişim.",
    },
    [ErrorCode.ALREADY_VERIFIED]: {
      en: "Email is already verified.",
      tr: "E-posta zaten doğrulandı.",
    },
    [ErrorCode.TOO_MANY_REQUEST]: {
      en: "Too many requests. Please try again later.",
      tr: "Çok fazla istek. Lütfen daha sonra tekrar deneyin.",
    },

    // Authentication Errors (2xx)
    [ErrorCode.INVALID_EMAIL_OR_PASSWORD]: {
      en: "Invalid email or password.",
      tr: "Geçersiz e-posta veya şifre.",
    },
    [ErrorCode.EMAIL_NOT_VERIFIED]: {
      en: "Email not verified.",
      tr: "E-posta doğrulanmadı.",
    },
    [ErrorCode.INVALID_PASSWORD]: {
      en: "Invalid password.",
      tr: "Geçersiz şifre.",
    },
    [ErrorCode.PASSWORD_RESET_CODE_EXPIRED]: {
      en: "Password reset code has expired.",
      tr: "Şifre sıfırlama kodunun süresi doldu.",
    },
    [ErrorCode.INVALID_RESET_CODE]: {
      en: "Invalid password reset code.",
      tr: "Geçersiz şifre sıfırlama kodu.",
    },
    [ErrorCode.BCRYPT_CANT_HASH]: {
      en: "Unable to hash password.",
      tr: "Şifre şifrelenemedi.",
    },
    [ErrorCode.TOKEN_GENERATION_ERROR]: {
      en: "Error generating token.",
      tr: "Token oluşturulurken hata oluştu.",
    },

    // User-Related Errors (3xx)
    [ErrorCode.USER_NOT_FOUND]: {
      en: "User not found.",
      tr: "Kullanıcı bulunamadı.",
    },
    [ErrorCode.CANNOT_CREATE_USER]: {
      en: "Cannot create user.",
      tr: "Kullanıcı oluşturulamadı.",
    },
    [ErrorCode.CANNOT_UPDATE_USER]: {
      en: "Cannot update user.",
      tr: "Kullanıcı güncellenemedi.",
    },
    [ErrorCode.CANNOT_DELETE_USER]: {
      en: "Cannot delete user.",
      tr: "Kullanıcı silinemedi.",
    },
    [ErrorCode.CANNOT_FETCH_USER]: {
      en: "Cannot fetch user details.",
      tr: "Kullanıcı bilgileri alınamadı.",
    },
    [ErrorCode.CANNOT_UPDATE_USER_IMAGE]: {
      en: "Cannot update user image.",
      tr: "Kullanıcı resmi güncellenemedi.",
    },
    [ErrorCode.CANNOT_GET_USER_IMAGE_NAME]: {
      en: "Cannot get user image name.",
      tr: "Kullanıcı resmi adı alınamadı.",
    },
    [ErrorCode.CANNOT_DELETE_IMAGE]: {
      en: "Cannot delete image.",
      tr: "Resim silinemedi.",
    },
    [ErrorCode.UUID_CONVERSION_ERR]: {
      en: "UUID conversion error.",
      tr: "UUID dönüştürme hatası.",
    },

    // Employee-Related Errors (4xx)
    [ErrorCode.EMPLOYEE_NOT_FOUND]: {
      en: "Employee not found.",
      tr: "Çalışan bulunamadı.",
    },
    [ErrorCode.EMPLOYEE_REPO_ERR]: {
      en: "Employee repository error.",
      tr: "Çalışan veritabanı hatası.",
    },
    [ErrorCode.CANNOT_CREATE_EMPLOYEE]: {
      en: "Cannot create employee.",
      tr: "Çalışan oluşturulamadı.",
    },
    [ErrorCode.CANNOT_UPDATE_EMPLOYEE]: {
      en: "Cannot update employee.",
      tr: "Çalışan güncellenemedi.",
    },
    [ErrorCode.CANNOT_DELETE_EMPLOYEE]: {
      en: "Cannot delete employee.",
      tr: "Çalışan silinemedi.",
    },
    [ErrorCode.CANNOT_FETCH_EMPLOYEE]: {
      en: "Cannot fetch employee data.",
      tr: "Çalışan verileri alınamadı.",
    },

    // Manager-Related Errors (5xx)
    [ErrorCode.MANAGER_NOT_FOUND]: {
      en: "Manager not found.",
      tr: "Yönetici bulunamadı.",
    },
    [ErrorCode.CANNOT_CREATE_MANAGER]: {
      en: "Cannot create manager.",
      tr: "Yönetici oluşturulamadı.",
    },
    [ErrorCode.CANNOT_UPDATE_MANAGER]: {
      en: "Cannot update manager.",
      tr: "Yönetici güncellenemedi.",
    },
    [ErrorCode.CANNOT_DELETE_MANAGER]: {
      en: "Cannot delete manager.",
      tr: "Yönetici silinemedi.",
    },
    [ErrorCode.CANNOT_FETCH_MANAGER]: {
      en: "Cannot fetch manager data.",
      tr: "Yönetici verileri alınamadı.",
    },

    // Company-Related Errors (6xx)
    [ErrorCode.COMPANY_NOT_FOUND]: {
      en: "Company not found.",
      tr: "Şirket bulunamadı.",
    },
    [ErrorCode.COMPANY_REPO_ERR]: {
      en: "Company repository error.",
      tr: "Şirket veritabanı hatası.",
    },
    [ErrorCode.CANNOT_CREATE_COMPANY]: {
      en: "Cannot create company.",
      tr: "Şirket oluşturulamadı.",
    },
    [ErrorCode.CANNOT_UPDATE_COMPANY]: {
      en: "Cannot update company.",
      tr: "Şirket güncellenemedi.",
    },
    [ErrorCode.CANNOT_DELETE_COMPANY]: {
      en: "Cannot delete company.",
      tr: "Şirket silinemedi.",
    },
    [ErrorCode.CANNOT_FETCH_COMPANY]: {
      en: "Cannot fetch company data.",
      tr: "Şirket verileri alınamadı.",
    },
    [ErrorCode.CANNOT_FETCH_COMPANY_IMAGE]: {
      en: "Cannot fetch company image.",
      tr: "Şirket resmi alınamadı.",
    },
    [ErrorCode.CANNOT_UPDATE_COMPANY_IMAGE]: {
      en: "Cannot update company image.",
      tr: "Şirket resmi güncellenemedi.",
    },

    // Workplace-Related Errors (7xx)
    [ErrorCode.WORKPLACE_NOT_FOUND]: {
      en: "Workplace not found.",
      tr: "Çalışma alanı bulunamadı.",
    },
    [ErrorCode.CANNOT_CREATE_WORKPLACE]: {
      en: "Cannot create workplace.",
      tr: "Çalışma alanı oluşturulamadı.",
    },
    [ErrorCode.CANNOT_UPDATE_WORKPLACE]: {
      en: "Cannot update workplace.",
      tr: "Çalışma alanı güncellenemedi.",
    },
    [ErrorCode.CANNOT_DELETE_WORKPLACE]: {
      en: "Cannot delete workplace.",
      tr: "Çalışma alanı silinemedi.",
    },
    [ErrorCode.CANNOT_FETCH_WORKPLACE]: {
      en: "Cannot fetch workplace data.",
      tr: "Çalışma alanı verileri alınamadı.",
    },

    // Role-Related Errors (8xx)
    [ErrorCode.ROLE_NOT_FOUND]: {
      en: "Role not found.",
      tr: "Rol bulunamadı.",
    },
    [ErrorCode.CANNOT_CREATE_ROLE]: {
      en: "Cannot create role.",
      tr: "Rol oluşturulamadı.",
    },
    [ErrorCode.CANNOT_UPDATE_ROLE]: {
      en: "Cannot update role.",
      tr: "Rol güncellenemedi.",
    },
    [ErrorCode.CANNOT_DELETE_ROLE]: {
      en: "Cannot delete role.",
      tr: "Rol silinemedi.",
    },
    [ErrorCode.CANNOT_FETCH_ROLE]: {
      en: "Cannot fetch role data.",
      tr: "Rol verileri alınamadı.",
    },

    // Password Reset Errors (9xx)
    [ErrorCode.PASSWORD_RESET_CODE_NOT_FOUND]: {
      en: "Password reset code not found.",
      tr: "Şifre sıfırlama kodu bulunamadı.",
    },
    [ErrorCode.CANNOT_CREATE_PASSWORD_RESET_CODE]: {
      en: "Cannot create password reset code.",
      tr: "Şifre sıfırlama kodu oluşturulamadı.",
    },
    [ErrorCode.CANNOT_FETCH_PASSWORD_RESET_CODE]: {
      en: "Cannot fetch password reset code.",
      tr: "Şifre sıfırlama kodu alınamadı.",
    },
    [ErrorCode.CANNOT_DELETE_PASSWORD_RESET_CODE]: {
      en: "Cannot delete password reset code.",
      tr: "Şifre sıfırlama kodu silinemedi.",
    },

    // Email Errors (10xx)
    [ErrorCode.CANNOT_SEND_EMAIL]: {
      en: "Cannot send email.",
      tr: "E-posta gönderilemedi.",
    },
    [ErrorCode.EMAIL_VERIFICATION_NOT_FOUND]: {
      en: "Email verification not found.",
      tr: "E-posta doğrulaması bulunamadı.",
    },
    [ErrorCode.CANNOT_CREATE_EMAIL_VERIFICATION]: {
      en: "Cannot create email verification.",
      tr: "E-posta doğrulaması oluşturulamadı.",
    },
    [ErrorCode.CANNOT_UPDATE_EMAIL_VERIFICATION]: {
      en: "Cannot update email verification.",
      tr: "E-posta doğrulaması güncellenemedi.",
    },
    [ErrorCode.CANNOT_DELETE_EMAIL_VERIFICATION]: {
      en: "Cannot delete email verification.",
      tr: "E-posta doğrulaması silinemedi.",
    },
    [ErrorCode.CANNOT_FETCH_EMAIL_VERIFICATION]: {
      en: "Cannot fetch email verification.",
      tr: "E-posta doğrulaması alınamadı.",
    },
    [ErrorCode.VERIFICATION_CODE_INVALID]: {
      en: "Verification code is invalid.",
      tr: "Doğrulama kodu geçersiz.",
    },
    [ErrorCode.VERIFICATION_CODE_EXPIRED]: {
      en: "Verification code has expired.",
      tr: "Doğrulama kodunun süresi doldu.",
    },
    [ErrorCode.UNKNOWN_EMAIL_VERIFICATION_TYPE]: {
      en: "Unknown email verification type.",
      tr: "Bilinmeyen e-posta doğrulama türü.",
    },

    // Employee Code Errors (11xx)
    [ErrorCode.EMPLOYEE_CODE_NOT_FOUND]: {
      en: "Employee code not found.",
      tr: "Çalışan kodu bulunamadı.",
    },
    [ErrorCode.INVALID_EMPLOYEE_CODE]: {
      en: "Invalid employee code.",
      tr: "Geçersiz çalışan kodu.",
    },
    [ErrorCode.CANNOT_CREATE_EMPLOYEE_CODE]: {
      en: "Cannot create employee code.",
      tr: "Çalışan kodu oluşturulamadı.",
    },
    [ErrorCode.CANNOT_UPDATE_EMPLOYEE_CODE]: {
      en: "Cannot update employee code.",
      tr: "Çalışan kodu güncellenemedi.",
    },
    [ErrorCode.CANNOT_FETCH_EMPLOYEE_CODE]: {
      en: "Cannot fetch employee code.",
      tr: "Çalışan kodu alınamadı.",
    },
    [ErrorCode.CANNOT_GENERATE_UNIQUE_CODE]: {
      en: "Cannot generate unique employee code.",
      tr: "Benzersiz çalışan kodu oluşturulamadı.",
    },

    // File/Image Errors (12xx)
    [ErrorCode.CANNOT_REMOVE_IMAGE_FROM_FILE]: {
      en: "Cannot remove image from file.",
      tr: "Dosyadan resim kaldırılamadı.",
    },
    [ErrorCode.CANNOT_ADD_IMAGE_TO_FILE]: {
      en: "Cannot add image to file.",
      tr: "Dosyaya resim eklenemedi.",
    },

    // Validation Errors (13xx)
    [ErrorCode.VALIDATION_CODE_INCORRECT]: {
      en: "Validation code is incorrect.",
      tr: "Doğrulama kodu yanlış.",
    },

    // Other Errors (9xxx)
    [ErrorCode.UNABLE_TO_HASH]: {
      en: "Unable to hash data.",
      tr: "Veri şifrelenemedi.",
    },
    [ErrorCode.UNABLE_TO_ADD_TO_DB]: {
      en: "Unable to add to database.",
      tr: "Veritabanına eklenemedi.",
    },
    [ErrorCode.CANNOT_DELETE_VERIFICATION_CODE]: {
      en: "Cannot delete verification code.",
      tr: "Doğrulama kodu silinemedi.",
    },

    [ErrorCode.UNKNOWN]: {
      en: "An unknown error occurred.",
      tr: "Bilinmeyen bir hata oluştu.",
    },
  }

  // Retrieve the message based on the error code and language
  const message = messages[code]?.[lang]

  // Return the message if found, otherwise return a default message
  return message || messages[ErrorCode.UNKNOWN][lang]
}
