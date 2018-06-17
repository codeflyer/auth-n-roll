import {
  SIGN_IN_RESPONSE_USER_NOT_FOUND,
  SIGN_IN_RESPONSE_NOT_AUTHORIZED,
  SIGN_IN_RESPONSE_OK,
  SIGN_IN_RESPONSE_CHANGE_PASSWORD,
  SIGN_IN_RESPONSE_NOT_CONFIRMED,
  SIGN_IN_RESPONSE_SOFTWARE_TOKEN_MFA,
  SIGN_IN_RESPONSE_VALIDATION_DATA,
  CONFIRM_SIGN_UP_CODE_MISMATCH,
  CONFIRM_SIGN_UP_EXPIRED_CODE,
  CONFIRM_SIGN_UP_USER_NOT_FOUND,
  RESEND_VALIDATION_CODE_RESPONSE_OK,
  RESEND_VALIDATION_CODE_RESPONSE_ERROR
} from 'auth-n-roll'

const delay = time => new Promise(resolve => setTimeout(resolve, time))

let state = {
  signinResponse: SIGN_IN_RESPONSE_OK,
  resendValidationCodeResponse: RESEND_VALIDATION_CODE_RESPONSE_OK
}

const STORAGE_KEY = 'auth-n-roll-dev-state'
const storeState = () => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const restoreState = () => {
  let stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      state = JSON.parse(stored)
    } catch (e) {}
  }
}

export const setSignInResponse = response => {
  state.signinResponse = response
  storeState()
}
export const getSignInResponse = () => state.signinResponse

export const setConfirmSignUpReponse = response => {
  state.confirmSignUpResponse = response
  storeState()
}
export const getConfirmSignUpReponse = () => state.confirmSignUpResponse

export const setResendValidationCodeResponse = response => {
  state.resendValidationCodeResponse = response
  storeState()
}
export const getResendValidationCodeResponse = () =>
  state.resendValidationCodeResponse

export const ServiceInMemory = () => {
  restoreState()

  const signIn = async (username, password) => {
    await delay(1000)

    switch (state.signinResponse) {
      case SIGN_IN_RESPONSE_USER_NOT_FOUND:
        throw {
          code: SIGN_IN_RESPONSE_USER_NOT_FOUND,
          message: 'User does not exist.',
          user: { username }
        }

      case SIGN_IN_RESPONSE_NOT_AUTHORIZED:
        throw {
          code: SIGN_IN_RESPONSE_NOT_AUTHORIZED,
          message: 'Incorrect username or password.',
          user: { username }
        }

      case SIGN_IN_RESPONSE_NOT_CONFIRMED:
        throw {
          code: SIGN_IN_RESPONSE_NOT_CONFIRMED,
          message: 'User is not confirmed.',
          user: { username: username }
        }

      case SIGN_IN_RESPONSE_CHANGE_PASSWORD:
        return {
          ChallengeName: 'NEW_PASSWORD_REQUIRED',
          user: { username }
        }

      case SIGN_IN_RESPONSE_SOFTWARE_TOKEN_MFA:
        return {
          challengeName: 'SOFTWARE_TOKEN_MFA',
          user: {
            username,
            firstName: 'Davide',
            lastName: 'Fiorello'
          }
        }
      default:
        return {
          AuthenticationResult: {
            AccessToken:
              'eyJraWQiOiJGUEVYRmFKWnZaWTdyZEFiM1pcL3l1UWg5czB4NDErMHRrMzZCUkdcL3lzazQ9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI5ZGYxZmMzNi0zODdkLTQ4YTYtODA4YS00YjQ0ODcwZDNlYmMiLCJldmVudF9pZCI6ImYzYmNmY2I4LTZjZDYtMTFlOC04NDRlLThmNTQ3ZTZmMGVmMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1Mjg2NTMxMTAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX2ZIVTVQeWdZNSIsImV4cCI6MTUyODY1NjcxMCwiaWF0IjoxNTI4NjUzMTEwLCJqdGkiOiJiZDNhMzZmYy0wZjQ5LTQ2NTItYWY4NS0zODY2MmVhMGYyODIiLCJjbGllbnRfaWQiOiI1N2VxbDNpMGw2czc0NWJ0OWRhOXVia2g3aCIsInVzZXJuYW1lIjoiZGF2aWRlLmZpb3JlbGxvQG5lYXJmb3JtLmNvbSJ9.WKxrOEzmbB6Jhh-FCtNPuXbG0SaBJ5bI45VODU0wIC0OEBv9BY9QOpLXimZG9bQdt-JKcmOl1pLLjimFqcTm1ztpzSxlU_3nAlx5FcSa9cef23rNsasJ3FHIxsYTYo55rQtXdGA5RnfGSfxFAyeqW0CYRRFembMWVtj1AJcZYb1UTMjXqq6pCjfai4utJOHge60BJ7aSUARMQQtRVaI84hp5MunsMW1AYfC7KEi5f-4_GOixG5JFTy96PQt41vyJyEQAz_G8jZRiWfji1tpk8vKizDFzkmdqAC1n4vamuSeCdZ_saNbDDnBC56m7zLOZUmLGXRgwNLVKZ_LAP-Vjbg',
            ExpiresIn: 3600,
            IdToken:
              'eyJraWQiOiJ2a2QzNTlMb3F3K1RmTE1mUkpDSHBnb0ZaMTJxT2lET1FMK1pVU2pWbHNBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5ZGYxZmMzNi0zODdkLTQ4YTYtODA4YS00YjQ0ODcwZDNlYmMiLCJhdWQiOiI1N2VxbDNpMGw2czc0NWJ0OWRhOXVia2g3aCIsImV2ZW50X2lkIjoiZjNiY2ZjYjgtNmNkNi0xMWU4LTg0NGUtOGY1NDdlNmYwZWYzIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1Mjg2NTMxMTAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX2ZIVTVQeWdZNSIsImNvZ25pdG86dXNlcm5hbWUiOiJkYXZpZGUuZmlvcmVsbG9AbmVhcmZvcm0uY29tIiwiZXhwIjoxNTI4NjU2NzEwLCJpYXQiOjE1Mjg2NTMxMTAsImVtYWlsIjoiZGF2aWRlLmZpb3JlbGxvQG5lYXJmb3JtLmNvbSJ9.blM41EX1aKzQpJUPzrCELRvkGd0PcEh7CFVGncojqPgx9Wz_P0UwifrpCHhLHkr77yAjI6OzdtefnAb9dtV__GaQVwferWtML2lvx5aEJiioVp3dEa1wcWvDPCjW0rmloFD11vJhzpeWYYIFOYFeNNHn7H0o0lLob8nWWoGymBoI7Eom32az4G5shbdH-1yFXw16SexwxmQ6qCSNB-mR466Gky3HzcJIhhkC-_GHyM48tf8f_y4NW8TcdiefxYm6QZPGCHh0rlyTJup6UthBVQ1uesKmsgh4HhtOS_Z3HzeeBCEtVo6Ad4__Nz0165jTUSstxKT3melb6ZArO738rg',
            RefreshToken:
              'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.gkMWqwcQHwsyBUc0WBXrq4AG8PlnU7uZ5O9LmSj65ZZqd7xBXBWG9mcoptejsSRHWaqzGLMwUVFG4ROyC-3c2RySOHBhISCq9xBu4PXDC9KuFx9RcPTnNXvM1_xixjJSm2o5V98sctso8PxyFoc3c9JYVUJ_rCCUG7jNtqtFgMfd3q9vWwLG6JLbSBjyeOvd-4o-dZj-rX7muHdfcdI0Qtz43lXuzCK6dfQ5BZRyJ5H6b8H8Ijb_8BlLQ3XLqojxNWmY3VzpCPUilo60SLJKFkPo7n5l5mVpVcvCcy6dqB0uAAA3GDwaopZbTO9IHsaooB4uiedrGY69lY8I44Ts9w.MHs5Qmb_U_95uzpS.3ZSEWSXaPDHj40C91aRZaKBAZhLz1F4wpTKK8wvpUeQiUZnVws-Cw04_u0eDNpuD5e9itUmS4A_XM8t9iEHFLmhGrxrDNe9pDUZ8kASxSPHkCGCmoXPey9fs-0GRU9EwaKGNllFwJJGegsKdWJ6RkV5AQgCMTPBmj8TSezfcF117SpiY71Tj-cBy7_UW9Mxz6etnmwSSSkpmIKO5xQvp3cydlOQHWnGt8nEuBN3idRJKv-10-W0ATnod-X0ZpT4dqzs-YLPZM1iZnpG49AFDF2-D1QHMgOpba_So5LgLC4XJLYG4V2pVJdY_1tNhV7An2le6b9CQKaE2p741w_yxkxNTmIYU7sz44Lh0eINVN_GoU8BonX1Z86VPeZsvhLKfie_gRe3hntasbQp-LjrX2i1nEmY-_Oe-Ibr9-azkWWaYjd9tdMMviiUmrcBSezEu_pwtNXYX85ZGb1MrpQdWTmzh2wek4xDzO3kqPfj8SXed0uwTRUbeD2IcL4eU0bHGaERIg6E9L9A0hom-wvszr-fqyCTlp-oH08Fxo6AC_YSILeNZT8xSjGPNyVDh8dd4SGRv9wKIygM00BNu1DphkTCYW729vIBW_sQ9wgHCr7paQXVsfE0OpxwyfnZsx6sCa-1_FSdJstDFpMqb6ztkKu20xbsRlN6_VkitmoQ7EYbwglh-Gowi1V994woZsUiSkohDadkSA-ACcJ6QgO1ltkNRSIWYB3hD31EOpLRZTWHfK7dwuy8ZF0ZhuTI3OFnQR68sU9YLLj8LR31o3V3NtpK_ILLPlInTUBmWH_93biQRB8iPeLJ23yiqPa7AM9uNBPR7YtFz9FHQHsktT6DFXy7HQKoiJihW4YD8ktYtYon0EO09_ZQkD8M0KkrZ-FdPOoeC_fEST3w2KDtJMkKJykE3Lgv2kv29IpMGVqO-fJOGsx7yo8U19mQcK0E-eTrIpKhK29v-zj3bG0FjEHPqeltop5fPemSlaDnQtV9uzc54ggT7_6s5G3YQqQ7dSY0K8Zb2gia_ZvGnc5ZYs8OydYdhLzTFlI_hflg6bx-o3sgMUuu3G8pS_Z_LnzCu-YhMYBKje_i9QUR4CPO4L2kW_CEl16U54NXOhk5CjTypQYi88NGXA5zF1Y2xdJ38EDSw-duRWDxq9nWteJW405j4OIFmIlRd6aolbd0oqjxhXrXp2qcIhFS6TiDb50RKbc3hVlOBBuuO6yMnZwKjkJqDr4yXcHSP5bMmO74cVRBjkZJ4HSz8o6MIkyrSXhuPGt8kCdWuDgH-TlQtT0kTAEWaKWVWurSinM5qhgMb-mzjVzoH.Dk-l1gwwlOkbVwGczxyJGA',
            TokenType: 'Bearer'
          },
          user: { username }
        }
    }
  }

  const resendValidationCode = async username => {
    await delay(1000)
    switch (state.resendValidationCodeResponse) {
      case RESEND_VALIDATION_CODE_RESPONSE_ERROR:
        throw {
          code: RESEND_VALIDATION_CODE_RESPONSE_ERROR,
          message: 'Email already verifyed',
          user: { username }
        }
      default:
        return {
          result: 'OK'
        }
    }
  }

  const getLoggedUser = () => {
    return {
      username: 'davide'
    }
  }

  const confirmSignUp = async (username, confirmationCode) => {
    if (!confirmationCode || !username) {
      throw {
        code: SIGN_IN_RESPONSE_VALIDATION_DATA,
        message: 'Username and ConfirmationCode required'
      }
    }

    try {
      const result = await cognito
        .resendConfirmationCode({
          ClientId: stack.UserPoolClientId,
          Username: username,
          ConfirmationCode: confirmationCode
        })
        .promise()

      return Object.assign({}, result, { user: { username } })
    } catch (err) {
      switch (err.code) {
        case 'UserNotFoundException':
          throw {
            code: CONFIRM_SIGN_UP_USER_NOT_FOUND,
            message: err.message,
            user: { username }
          }
        case 'CodeMismatchException':
          throw {
            code: CONFIRM_SIGN_UP_CODE_MISMATCH,
            message: err.message,
            user: { username }
          }
        case 'ExpiredCodeException':
          throw {
            code: CONFIRM_SIGN_UP_EXPIRED_CODE,
            message: err.message,
            user: { username }
          }
        default:
          console.log(err)
          throw { code: err.code, message: err.message, user: { username } }
      }
    }
  }

  return {
    signIn,
    confirmSignUp,
    getLoggedUser,
    resendValidationCode
  }
}
