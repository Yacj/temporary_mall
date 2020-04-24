import Vue from 'vue';
import { Button } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Icon } from 'vant';
import { Field } from 'vant';
import { Cell, CellGroup } from 'vant';
import {Divider} from "vant";
import { Toast } from 'vant';
import {Dialog} from "vant";
import { Empty } from 'vant';
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Empty);
Vue.use(Dialog)
Vue.use(Toast);
Vue.use(Divider)
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);