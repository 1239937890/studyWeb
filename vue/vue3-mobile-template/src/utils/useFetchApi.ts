import { createFetch } from '@vueuse/core';
import { Notify } from 'vant';

const useFetchApi = createFetch({
  baseUrl: '/api',
  options: {
    async beforeFetch({ options }) {
      const myToken = 'token';
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${myToken}`
      };
      return { options };
    },
    afterFetch(ctx) {
      const { data, response } = ctx;
      if (response.status >= 200 && response.status < 300) {
        try {
          const jsonObj = JSON.parse(data);
          if (jsonObj.code != 200) {
            Notify({ type: 'danger', message: jsonObj.message || 'Error' });
          }

          ctx.data = jsonObj.data;
        } catch (error) {
          console.error(error);
          ctx.data = null;
        }
      } else {
        Notify({ type: 'danger', message: response.statusText || 'Error' });
        ctx.data = null;
      }

      return ctx;
    }
  }
});

export default useFetchApi;
