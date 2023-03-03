import { Peer } from '@/common/peer';
import { ref, computed } from 'vue'
export class Store {
  static _username = ref('')

  static username = computed<string>({
    get: () => {
      this._username.value = sessionStorage.getItem('username') || '';
      this.pc.currentUser = this._username.value;
      return this._username.value
    },
    set: (val: string) => {
      this._username.value = val;
      sessionStorage.setItem('username', val);
      this.pc.currentUser = val;
    }
  })

  static pc = new Peer(this._username.value);
}