<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-5-widescreen">
            <div class="box">
              <div class="field has-text-centered">
                <div class="label">
                  <div class="is-size-3 is-capitalized">LOGIN</div>
                  <hr />
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" 
                    v-model="user.email"
                  required>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input type="password" placeholder="*******" class="input" 
                    v-model="user.password"
                  required>
                </div>
              </div>
              <div class="field">
                <button class="button is-success" @click="login()">
                  Login
                </button>
              </div>
              <hr />
              <div class="field">
                <div id="google-signin-button"></div>
              </div>
              <div class="field">
                <span class="is-size-5">Dont have an account? </span>
                <router-link
                        class="has-text-right is-size-5"
                        v-bind:to="{ name: 'Signup' }"
                        style="color:blue"
                >signin</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import PostServices from '@/services/PostServices';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'login',
  setup() {
    const toast = useToast();
    const router = useRouter();
    let gapi = window.gapi;
    const state = reactive({
      user: {
        email: '',
        password: '',
      }
    });
    async function onSuccess(googleUser) {
      var profile = googleUser.getBasicProfile();
      try {
        const { data: result } = await PostServices.login({
          email: profile.getEmail(),
          password: profile.getId()
        });
        console.log(result)
        if (result) {
          toast.success('logged in succesfully');
          const { token } = result;
          localStorage.setItem('auth-token', token);
          router.push({ name: 'Home'});
        }
      } catch (e) {
        console.error('error', e);
        toast.error('unable to login. Please check your credentials');
      }
    }
    function onFailure(error) {
       toast.error(error);
    }
    const login = async () => {
      try {
        const { data: result } = await PostServices.login({
          email: state.user.email,
          password: state.user.password
        });
        if (result) {
          toast.success('logged in succesfully');
          const { token } = result;
          localStorage.setItem('auth-token', token);
          router.push({ name: 'Home'});
        }
      } catch (e) {
        console.error('error', e);
        toast.error('user already exists');
      }
    }
    onMounted(() => {
      gapi.signin2.render('google-signin-button', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      })
    });
    return {
      ...toRefs(state),
      login,
    }
  },
})
</script>

<style scoped>
.hero {
  background-color: #bfb7b7;
}

</style>
