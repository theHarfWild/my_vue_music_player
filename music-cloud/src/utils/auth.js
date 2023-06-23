// 关于本地存储的方法
const TOKEN_KEY = 'music-token';
const USER_KEY = 'music-user';

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
}
// 获取用户信息
export function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

export function setUser(user) {
  return localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// 移除用户信息
export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}