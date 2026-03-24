import { createApp } from 'vue';
import { Quasar, Loading, Notify, Dialog, LoadingBar } from 'quasar';
import App from './App.vue';
import './styles/_index.scss';

const app = createApp(App);

app.use(Quasar, {
  plugins: {
    Loading,
    Notify,
    Dialog,
    LoadingBar,
  },
  config: {
    loading: {
      spinnerColor: 'primary',
      messageColor: 'primary',
      backgroundColor: 'white',
    },
    notify: {
      position: 'top',
    },
    loadingBar: {
      position: 'top',
      color: 'primary',
      size: '3px',
    },
  },
});

app.mount('#app');
