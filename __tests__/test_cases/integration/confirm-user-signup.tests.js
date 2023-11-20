const given = require('../../steps/given')
const when = require('../../steps/when')
const then = require('../../steps/then')
const chance = require('chance').Chance()

describe('When confirmUserSignup runs', () => {
    it("The user's profile should be saved in DynamoDB", async() => {
        const { name, email } = given.a_random_user()

        const username = chance.guid()

        await when.we_invoke_confirmUserSignup(username, name, email)

        const ddbUser = await then.user_exists_in_UsersTable(username)
        expect(ddbUser).toEqual({

        })
    })
})