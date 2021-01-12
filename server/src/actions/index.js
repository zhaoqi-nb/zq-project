export default {
  async handler(ctx) {
    let userInfo = ctx.user ? ctx.user.user_info : {};
    const { id, email } = userInfo;
    ctx.cookies.set('_userEmail_', email.split('@')[0]);
    ctx.cookies.set('_ucid_', String(id));
    let result;
    console.log(API, userInfo, 111)
    try {
      result = await API.uc.update_by_ucid({
        ucid: String(id),
        do: 'login',
      });
    } catch (error) { }

    if (result && result.code === 44444) {
      ctx.response.render('403', { userInfo });
    } else {
      ctx.response.render('index', {
        userInfo,
      });
    }
  },
};
