const we_invoke_confirmUserSignup = async (username, name, email) => {
    const handler = require('../../functions/confirm-user-signup').handler

    const context = {}

    const event = {
        "version": "1",
        "triggerSource": "PostConfirmation_ConfirmSignup",
        "region": "us-east-1",
        "userPoolId": "us-east-1_XgzZmqL3b",
        "userName": username,
        "request":
        {
            "userAttributes": {
                "sub": username,
                "cognito:email_alias": email,
                "cognito:user_status": "CONFIRMED",
                "email_verified": "false",
                "name": name,
                "email": email
            }
        },
        "response": { }
}

    await handler(event, context)
}

module.exports = {
    we_invoke_confirmUserSignup
}