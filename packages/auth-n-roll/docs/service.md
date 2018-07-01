# Service

The service implements the connection with the authentication provider.

It should provide the following methods:

### signIn
Initiate the sign-in process.
It can return a valid user and an AuthenticationResult if the login success or a challenge if further actions are required.
It thrown an error if fails.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | `string` | The username |
| password | `string` | The password |

**Returns**

| Name | Type | Description |
| --- | --- | --- |
| user | object | The user object |
| AuthenticationResult | object\|null | The additional data retrieved from the provider (sessionkey, refreshkey, etc) |
| challenge | Challenge\|null | The challenge to complete the login |

*challenges*

| Code | Description |
| --- | --- | --- |
| NEW_PASSWORD_REQUIRED | The user should change the password |
| SOFTWARE_TOKEN_MFA | A MFA software autentication is  retuired |


**Throws**

| Name | Type | Description |
| --- | --- | --- |
| user | User | The user object |
| code | string | The error code |
| messge | string | The error message |

*error codes*

| Code | Description |
| --- | --- | --- |
| USER_NOT_FOUND_ERROR | The user is not registered on the provider |
| NOT_AUTHORIZED_ERROR | The password is incorrect |
| USER_NOT_CONFIRMED_ERROR | The user exists but is not confirmed |

### resendValidationCode
Resend the validation code to the user

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | `string` | the result of the action |

**Throws**

| Name | Type | Description |
| --- | --- | --- |
| user | User | The user object |
| code | string | The error code |
| messge | string | The error message |

*error codes*

| Code | Description |
| --- | --- | --- |
| GENERIC_ERROR | an error occurred, check the message |

### confirmSignUp

Validate the user using the confirmation code received by mail

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | `string` | the user that should be confirmedaction |
| confirmationCode | `string` | The confirmation code received by mail/sms |

**Throws**

| Name | Type | Description |
| --- | --- | --- |
| user | User | The user object |
| code | string | The error code |
| messge | string | The error message |

*error codes*

| Code | Description |
| --- | --- | --- |
| VALIDATION_CODE_MISMATCH_ERROR | The code is not correct |
| USER_NOT_FOUND_ERROR | The user is not present in the system |
| EXPIRED_VALIDATION_CODE_ERROR | The code inserted is expired |
| GENERIC_ERROR | A generic error occurred, check the message |


### changePasswordForced

Chenage the password after a request to change it from the server (usually at the first login after a batch user creation)

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | `string` | the user that should be confirmedaction |
| newPassword | `string` | The new password |
| session | `string` | The session key received in the signin action |

**Throws**

| Name | Type | Description |
| --- | --- | --- |
| user | User | The user object |
| code | string | The error code |
| messge | string | The error message |

*error codes*

| Code | Description |
| --- | --- | --- |
| INVALID_PASSWORD_ERROR | The password added is not valid |
| USER_NOT_FOUND_ERROR | The user is not present in the system |
| GENERIC_ERROR | A generic error occurred, check the message |

