/*
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-06-14 11:10:14
 * @LastEditors: Seven
 * @LastEditTime: 2022-06-14 13:17:19
 * @FilePath: \uniDemod:\MFK\mfk-project\mfk-more\src\mixin\shieldMixin.js
 * @Description: 
 * @Version: 2.0
 */
import {
    shield
} from '@/api/index';
export default {
    data() {
        return {
            shield: {}
        }
    },
    onLoad() {
        this.getShield();
    },
    methods: {
        getShield() {
            shield()
                .then(res => {
                    if (res.code == 200) {
                        getApp().globalData.shield = res.data;
                        this.shield = res.data;
                    }
                })
        },
    }
}