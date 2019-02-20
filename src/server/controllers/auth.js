import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';

import {
  AUTHORIZATION_REQUEST__SUCCESS,
  TOKEN_REQUEST__SUCCESS,
  TOKEN_REQUEST__FAILURE
}from '../../shared/reducers/auth'

const authController = {
  authenticate: async (client, token) => {
    const user = jwt.verify(token, JWT_SECRET);
    if(user) client.user = user;
    client.send(AUTHORIZATION_REQUEST__SUCCESS)
  },
  getToken: async (client, name) => {
    if(name && name.length){
      let userData = {
        name,
        id: uuidv4()
      };
      var token = jwt.sign(userData, JWT_SECRET);
      client.send(TOKEN_REQUEST__SUCCESS, token)
      client.user = userData;
    } else {
      client.send(TOKEN_REQUEST__FAILURE)
    }
  }
}

export default authController;
