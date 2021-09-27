<template>
   <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-3-tablet is-2-desktop is-5-widescreen">
            <div class="field has-text-centered">
              <div class="label">
                <div class="is-size-3 is-capitalized">URL SHORTENER</div>
              </div>
            </div>
            <div class="container is-flex">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input is-info is-large" 
                    placeholder="Enter Url to Shorten" 
                    v-model="inputUrl"
                  >
                </div>
                <div class="control">
                    <a class="button is-info is-large" @click="shortenURL()">Shorten</a>
                </div>
              </div>
            </div>
            <hr/>
            <div class="container is-flex" v-if="shortUrl">
              <div class="field has-addons">
                <div class="control">
                  <input type="text" class="input is-link is-normal copy-input"
                    id="copy-input"
                    placeholder="shortened Url" 
                    v-model="shortUrl"
                  >
                </div>
                &nbsp;&nbsp;
                <div class="control">
                    <a class="button is-info " @click="copyURl()">copy</a>
                </div>
              </div>
            </div>
            <div class="field reset">
              <button class="button is-success is-normal" @click="clearUrl()">
                clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { useToast } from 'vue-toastification';
import PostServices from '@/services/PostServices';

export default defineComponent({
  setup() {
    const toast = useToast();
    const state = reactive({
      inputUrl: '',
      shortUrl: '',
    });
    const shortenURL = async () => {
      if (!state.inputUrl) {
        toast.error('Please enter valid url');
        return;
      }
      try {
        const { data: res } = await PostServices.shorten({
          longUrl: state.inputUrl,
        })
        if (res && res.shortUrl) {
          state.shortUrl = res.shortUrl;
        }
      } catch (e) {
        console.log('error', e);
      }
    }
    function copyURl() {
      var copyText = document.getElementById("copy-input");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
      toast.success('copied the url to clipboard');
    }
    const clearUrl = () => {
      state.inputUrl = '';
    }
    return {
      ...toRefs(state),
      shortenURL,
      copyURl,
      clearUrl,
    }
  },
})
</script>

<style scoped>
.reset {
  margin-top: 19px;
  padding-left: 154px;
}
</style>
