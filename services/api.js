import {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete,
  HttpPostJson,
} from "./network.js";

export const login = (data, useLoading, useError) =>
  HttpPost("/client/user/login", data, useLoading, useError); //系统登录

export const getExample = (data, useLoading, useError) =>
  HttpGet("/client/get/list", data, useLoading, useError); //HttpGet example

export const putExample = (data, useLoading, useError) =>
  HttpPut("/client/put/test", data, useLoading, useError); //HttpPut example

export const deleteExample = (data, useLoading, useError) =>
  HttpDelete("/client/delete/test", data, useLoading, useError); // HttpDelete example

export const postJsonExample = (data, useLoading, useError) =>
  HttpPostJson("/client/putjson/test", data, useLoading, useError); // HttpPostJson example

export default {
  login,
  getExample,
};
