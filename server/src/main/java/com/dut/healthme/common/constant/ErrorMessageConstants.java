package com.dut.healthme.common.constant;

public final class ErrorMessageConstants {

    public static final String INTERNAL_SERVER_ERROR_CODE = "ERR_SER0101";
    public static final String BAD_REQUEST_ERROR_CODE = "ERR_SER0102";

    /**
     * Common
     */
    public static final String INTERNAL_SERVER_ERROR = "internal_server_error";
    public static final String PAGE_NOT_FOUND = "page_not_found";
    public static final String FORBIDDEN = "forbidden";
    public static final String UNAUTHORIZED = "unauthorized";


    /**
     * File
     */
    public static final String UPLOAD_FILE_FAILED = "upload_file_failed";
    public static final String FILE_NOT_FOUND = "file_not_found";
    public static final String DELETE_FILE_FAILED = "delete_file_failed";
    public static final String FILE_SIZE_LIMIT_EXCEEDED = "file_size_limit_exceeded";

    /**
     * Authentication
     */
    public static final String API_KEY_IS_REQUIRED = "api_key_is_required";
    public static final String API_KEY_NOT_MATCH = "api_key_not_match";
    public static final String INVALID_TOKEN = "invalid_token";
    public static final String EXPIRED_TOKEN = "expired_token";
    public static final String REVOKED_TOKEN = "revoked_token";
    public static final String INVALID_REFRESH_TOKEN = "invalid_refresh_token";
    public static final String EXPIRED_REFRESH_TOKEN = "expired_refresh_token";
    public static final String REVOKED_REFRESH_TOKEN = "revoked_refresh_token";
    public static final String REFRESH_TOKEN_NOT_FOUND = "refresh_token_not_found";
    public static final String ACCOUNT_IS_ACTIVE = "account_is_active";
    public static final String ACCOUNT_IS_NOT_ACTIVE = "account_is_not_active";
    public static final String USERNAME_ALREADY_EXISTS = "username_already_exists";
    public static final String EMAIL_ALREADY_EXISTS = "email_already_exists";
    public static final String CONFIRM_PASSWORD_NOT_MATCHING = "confirm_password_not_matching";

    /**
     * Account
     */
    public static final String ACCOUNT_NOT_FOUND = "account_not_found";
    public static final String INCORRECT_EMAIL_OR_PASSWORD = "incorrect_email_or_password";
    public static final String ACCOUNT_IS_DISABLED = "account_is_disabled";
    public static final String ACCOUNT_ID_IS_REQUIRED = "account_id_is_required";
    public static final String ACCOUNT_IS_NOT_AVAILABLE = "account_is_not_available";

    private ErrorMessageConstants() {
    }
}
