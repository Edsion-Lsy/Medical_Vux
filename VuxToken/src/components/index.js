
import Vue from 'vue'

import Lsycheckbox from './components/Lsy-checkbox'

import Lsypopuppicker from './components/Lsy-popuppicker'
import Lsyinputpicker from './components/Lsy-inputpicker'

//用于统一注册二次封装的组件

Vue.component(Lsycheckbox.name, Lsycheckbox)
Vue.component(Lsypopuppicker.name, Lsypopuppicker)
Vue.component(Lsyinputpicker.name, Lsyinputpicker)