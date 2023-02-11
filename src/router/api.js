
export const baseApi = '/api'
export const baseApiAuth = `${baseApi}/auth`
export const baseApiVersion = `${baseApi}/v1`

export const routesApiAuth = {
    login: `${baseApiAuth}/login`,
    refresh: `${baseApiAuth}/refresh`,
    register: `${baseApiAuth}/register`,

    password_email: `${baseApiAuth}/password/email`,
    password_reset: `${baseApiAuth}/password/reset`,

    email_verify: `${baseApiAuth}/email/verify`,
    email_resend: `${baseApiAuth}/email/resend`,

    oauth: `${baseApiAuth}/api/oauth`,

    logout: `${baseApiVersion}/logout`,
}

export const routesApiUsers = {
    me: `${baseApiVersion}/user/me`,
}

export const routesApiCards = {
    index: `${baseApiVersion}/cards`,
    list: `${baseApiVersion}/cards/list`,
}
