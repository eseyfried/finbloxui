require('dotenv').config();

/**
 * This is the main config interface for the application.
 * For local dev, .env can be used to override these.
 * For production, these should come from the actual environment at build time.
 * If envs are missing from either, the defaults below are used.
 */

 const config = {
    /**
     * general
     */
    env: parse(process.env.NODE_ENV, 'development'),
    // the frontend site
    // site_email: parse(process.env.SITE_EMAIL, ''),
    // site_host_name: parse(process.env.SITE_HOST_NAME, 'http://localhost:9080'),
    // image_host_name: parse(process.env.IMAGE_HOST_NAME, ''),
    // jwt_secret: parse(process.env.JWT_SECRET, ''),
    /**
     * database
     */
    db_host: parse(process.env.DB_HOST, 'db'),
    db_user: parse(process.env.DB_USER, ''),
    db_pwd: parse(process.env.DB_PWD, ''),
    db_name: parse(process.env.DB_NAME, ''),
    db_port: parse(process.env.DB_PORT, ''),
    db_dialect: parse(process.env.DB_DIALECT, 'mysql'),
    /**
     * Stripe payments
     */
    
    // stripe_key: parse(process.env.STRIPE_KEY, ''),
    // stripe_webhook_secret: parse(process.env.STRIPE_WEBHOOK_SECRET, ''),
    // stripe_webhook_connect_secret: parse(process.env.STRIPE_WEBHOOK_CONNECT_SECRET, ''),
    /**
     * Mail
     */
    smtp_mail_host: parse(process.env.SMTP_MAIL_HOST, ''),
    smtp_mail_port: parse(process.env.SMTP_MAIL_PORT, ''),
    smtp_mail_user: parse(process.env.SMTP_MAIL_USER, ''),
    smtp_mail_pass: parse(process.env.SMTP_MAIL_PASS, ''),
    /**
     * Logging
     */
    //  logging_host: parse(process.env.LOGGING_HOST, ''),
    //  logging_port: parse(process.env.LOGGING_PORT, ''),
    //  logging_url: parse(process.env.LOGGING_URL, ''),
    //  logging_username: parse(process.env.LOGGING_USERNAME, ''),
    //  logging_token: parse(process.env.LOGGING_TOKEN, ''),
     // DO Spaces
    //  do_spaces_endpoint: parse(process.env.DO_SPACES_ENDPOINT, ''),
    //  do_spaces_key: parse(process.env.DO_SPACES_KEY, ''),
    //  do_spaces_secret: parse(process.env.DO_SPACES_SECRET, ''),
    //  do_spaces_name: parse(process.env.DO_SPACES_NAME, ''),
     // mailer lite
    //  mailer_lite_api_key: parse(process.env.MAILER_LITE_API_KEY, ''),
    features: {
        // example: parse(process.env.EXAMPLE, false)
    }
}
  
function feature (name) {
    return config.features[name]
}

function parse (value, fallback) {
    if (typeof value === 'undefined' || value === '') {
        return fallback
    }
    switch (typeof fallback) {
        case 'boolean' :
            return !!JSON.parse(value)
        case 'number' :
            return JSON.parse(value)
        default :
            return value
    }
}
module.exports = {
    config
}