import usersApi from '../apis/usersApi';
const BASE_URL = '';

export const findAll = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await usersApi.get(BASE_URL);
    return response;
  } catch (error) {
    throw error;
  }
};

export const save = async ({ username, email, password, admin }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await usersApi.post(BASE_URL, {
      username,
      email,
      password,
      admin,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const update = async ({ id, username, email, admin }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await usersApi.put(`${BASE_URL}/${id}`, {
      username,
      email,
      admin,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await usersApi.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};
