require('dotenv').config({ path: '.env' })
const AWS = require('aws-sdk')

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

const a_user_signs_up = async (password, name, email) => {
    const cognito = new AWS.CognitoIdentityServiceProvider()

    console.log(`ENVS: ${process.env.COGNITO_USER_POOL_ID}`)
    const userPoolId = process.env.COGNITO_USER_POOL_ID

    const clientId = process.env.WEB_COGNITO_USER_POOL_CLIENT_ID

    const signUpResp = await cognito.signUp({
        ClientId: clientId,
        Username: email,
        Password: password,
        UserAttributes: [
            { Name: 'name', Value: name }
        ]
    }).promise()

    const username = signUpResp.UserSub
    console.log(`[${email}] - user has signed [${username}]`)

    console.log(`TESTING1111`)
    await cognito.adminConfirmSignUp({
        UserPoolId: userPoolId,
        Username: username
    }).promise()
    console.log(`TESTING2222`)

    console.log(`[${email}] - confirmed sign up`)

    return {
        username,
        name,
        email
    }
}

module.exports = {
    we_invoke_confirmUserSignup,
    a_user_signs_up
}