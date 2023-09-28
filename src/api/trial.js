export default (axios) => ({
  /**
   * Create a Trial License
   * @param {string} email
   * @returns {Object} trial
   */
  create(email) {
    return axios.post(`trial`, {
        email: email
    });
  },
});
