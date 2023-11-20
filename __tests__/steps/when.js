require('dotenv').config()

const we_invoke_confirmUserSignup = async (username, name, email) => {
    const handler = require('../../functions/confirm-user-signup').handler

    const context = {}

    const event = {
        "version": "1",
        "triggerSource": "PostConfirmation_ConfirmSignUp",
        //"region": "us-east-1",
        //"userPoolId": "us-east-1_XgzZmqL3b",
        "region": process.env.AWS_REGION,
        "userPoolId": process.env.COGNITO_USER_POOL_ID,
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