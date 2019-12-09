import Pup from './Pup.js'

class API {
  constructor(baseURL) {
    this.pup = new Pup(baseURL)
  }

  setJWT(token) {
    sessionStorage.setItem('Authorization', `Bearer ${token}`)
  }

  clearJWT() {
    sessionStorage.removeItem('Authorization')
    // this.pup.getToken = null
  }
}

const api = new API('https://ga-reddit-api.cfapps.io')

/*
**  BODY
**  {
**	  "email" : "tester@superhero.com",
**	  "password" : "asdfhhjj",
**	  "username" : "wonderwoman"
**  }
**
** RESPONSE
**  {
**    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0c2RlckBzdXBlcmhlcm8uY29tIiwiZXhwIjoxNTY5NDUxNjMxLCJpYXQiOjE1Njk0MzM2MzF9.50d8VMMggDBuDGmiQc7on9CZnZ3Sj6qiLA1x19v2L2LiqbmSByqDHHXAuf10wq6nKtuPrL7ymKu4Rb8_Eesbqg"
**  } 
*/
api.signup = (email, password, username) => api.pup.post('/users/signup').withBody({ email, password, username }).fetch()

/*
**  BODY
**  {
**    "text" : "I don't think it's the dress. I think you are born cool."
**  }
**
**  RESPONSE
**  {
**    "id": 729,
**    "text": "I don't think it's the dress. I think you are born cool.",
**    "user": {
**        "username": "wonderfwoman"
**    },
**    "post": {
**        "id": 3,
**        "title": "I am super cool!!",
**        "description": "I think it's my dress that makes me so cool.",
**        "user": {
**            "username": "wonderwoman"
**        }
**    }
**  }
*/
api.createComment = (text, postId) => api.pup.post(`/comments/${postId}`).withBody({ text }).authenticated().fetch()


/*
**  BODY
**  {
**  	"title" : "I am super cool!!",
**  	"description" : "I think it's my dress that makes me so cool."
**  }
**
**  RESPONSE
**  {
**      "id": 1663,
**      "title": "I am super cool!!",
**      "description": "I think it's my dress that makes me so cool.",
**      "user": {
**          "username": "theflash"
**      }
**  }
*/
api.createPost = (title, description) => api.pup.post('/posts').withBody({ title, description }).authenticated().fetch()


/*
**  BODY
**  {
**  	"additionalEmail" : "wonderwoman@amazon.com",
**  	"mobile" : "000-000-0000",
**  	"address" : "Amazon"
**  }
**
**  RESPONSE
**  {
**      "id": 133,
**      "additionalEmail": "wonderwoman@amazon.com",
**      "mobile": "000-000-0000",
**      "address": "Amazon",
**      "user": {
**          "username": "wonderfwoman"
**      }
**  }
*/
api.createProfile = (additionalEmail, mobile, address) => 
  api.pup.post('/profiles').withBody({ additionalEmail, mobile, address }).authenticated().fetch()


/*
**  BODY
**  null
**
**  RESPONSE
**  [
**      {
**          "id": 3,
**          "title": "I am super cool!!",
**          "description": "I think it's my dress that makes me so cool.",
**          "user": {
**              "username": "wonderwoman"
**          }
**      }
**  ]
*/
api.listAllPosts = () => api.pup.get('/posts/list').fetch()

/*
**  BODY
**  null
**
**  RESPONSE
**  [
**    {
**        "id": 6,
**        "text": "This is a comment",
**        "user": {
**            "username": "case"
**        },
**        "post": {
**            "id": 3,
**            "title": "I am super cool!!",
**            "description": "I think it's my dress that makes me so cool.",
**            "user": {
**                "username": "wonderwoman"
**            }
**        }
**    },
**  ]
*/
api.getCommentsByPostId = (postId) => api.pup.get(`/comments/${postId}`).fetch()

/*
**  BODY
**  null
**
**  RESPONSE
**  success
*/
api.deleteCommentByCommentId = (commentId) => api.pup.delete(`/comments/${commentId}`).authenticated().fetch()

/*
**  BODY
**  null
**
**  RESPONSE
**  success
*/
api.deletePostByPostId = (postId) => api.pup.delete(`/posts/${postId}`).authenticated().fetch()

/*
**  BODY
**  {
**  	"title" : "I am super cool!!",
**  	"description" : "I think it's my dress that makes me so cool."
**  }
**  RESPONSE
**  {
**      "id": 1663,
**      "title": "I am super cool!!",
**      "description": "I think it's my dress that makes me so cool.",
**      "user": {
**          "username": "theflash"
**      }
**  }
*/
api.getProfile = () => api.pup.get('/profiles').authenticated().fetch()

/*
**  BODY
**  {
**	  "email" : "tester@superhero.com",
**	  "password" : "asdfhhjj",
**  }
**
** RESPONSE
**  {
**    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0c2RlckBzdXBlcmhlcm8uY29tIiwiZXhwIjoxNTY5NDUxNjMxLCJpYXQiOjE1Njk0MzM2MzF9.50d8VMMggDBuDGmiQc7on9CZnZ3Sj6qiLA1x19v2L2LiqbmSByqDHHXAuf10wq6nKtuPrL7ymKu4Rb8_Eesbqg"
**  } 
*/
api.login = (email, password) => api.pup.post('/users/login').withBody({ email, password }).fetch()


/*
**  BODY
**  null
**
**  RESPONSE
**  []
*/
//api.getCommentsByUser = () => api.pup.get('/users/comment').authenticated().fetch()


/*
**  BODY
**  null
**
**  RESPONSE
**  [] 
*/
// api.getPostsByUser = () => api.pup.get('/user/post').authenticated().fetch()


/*
**  BODY
**  {
**  	"mobile" : "111-111-1111"
**  }
**
** RESPONSE
**  {
**    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0c2RlckBzdXBlcmhlcm8uY29tIiwiZXhwIjoxNTY5NDUxNjMxLCJpYXQiOjE1Njk0MzM2MzF9.50d8VMMggDBuDGmiQc7on9CZnZ3Sj6qiLA1x19v2L2LiqbmSByqDHHXAuf10wq6nKtuPrL7ymKu4Rb8_Eesbqg"
**  } 
*/
api.updateProfile = () => api.pup.post('/profiles').authenticated().fetch()

export default api