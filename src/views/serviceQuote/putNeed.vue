<template>
    <flexbox orient="vertical" :gutter="0" class="apin-order">
        <flexbox-item class="apin-form-area">
            <group label-width="5em" label-margin-right="1.5em" ref="validate">
                <cell title="区域" value-align="left">
                    <checker v-model="formData.area_code" default-item-class="apin-select" selected-item-class="apin-selected">
                        <checker-item value="0">国内</checker-item>
                        <checker-item value="1">国外</checker-item>
                    </checker>
                </cell>
                <cell title="团散" value-align="left">
                    <checker v-model="formData.is_group" default-item-class="apin-select" selected-item-class="apin-selected">
                        <checker-item value="0">散客</checker-item>
                        <checker-item value="1">团队</checker-item>
                    </checker>
                </cell>
                <cell title="人员" value-align="left">
                    <checker v-model="formData.is_employee" default-item-class="apin-select" selected-item-class="apin-selected">
                        <checker-item value="0">计调</checker-item>
                        <checker-item value="1">员工</checker-item>
                    </checker>
                </cell>
                <datetime title="开始日期" v-model="formData.from_date" :start-date="dateDefaultStart" value-text-align="left" confirm-text="确认" cancel-text="取消" @on-change="changeStart"></datetime>
                <datetime title="结束日期" v-model="formData.to_date" :start-date="dateDefaultEnd" value-text-align="left" confirm-text="确认" cancel-text="取消"></datetime>
                <x-input title="旅行社城市" placeholder="必填" v-model="formData.trval_agency_city" value-text-align="left" required></x-input>
                <x-input title="旅行社名称" placeholder="必填" v-model="formData.trval_agency_name" required ref="trval_agency_name"></x-input>
                <x-input title="出发城市" placeholder="必填" v-model="formData.from_city" value-text-align="left" required></x-input>
                <x-input title="到达城市" placeholder="必填" v-model="formData.to_city" value-text-align="left" required></x-input>
                <x-input title="返程天数" type="number" placeholder="必填" v-model="formData.turn_days" required></x-input>
                <x-input title="出行人数" type="number" placeholder="必填" v-model="formData.total_count" required></x-input>
                <x-input title="儿童人数" type="number" placeholder="必填" v-model="formData.child_count" required></x-input>
            </group>
        </flexbox-item>
        <flexbox-item class="apin-btn-area">
            <x-button type="primary" class="apin-btn" @click.native="supply">发布</x-button>
        </flexbox-item>
    </flexbox>
</template>

<script>
import axios from 'axios'
import { Flexbox, FlexboxItem, Group, Cell, XInput, Datetime, XNumber, XButton, Checker, CheckerItem } from 'vux'
export default {
    data() {
        return {
            dateDefaultStart: '',
            dateDefaultEnd: '',
            formData: {
                area_code: '0',
                is_group: '0',
                is_employee: '0',
                from_date: '',
                to_date: '',
                trval_agency_city: '',
                trval_agency_name: '',
                from_city: '',
                to_city: '',
                turn_days: '',
                total_count: '',
                child_count: '0'
            }
        }
    },
    methods: {
        changeStart(newDate) {
            this.dateDefaultEnd = newDate;
            if (newDate > this.to_date) this.to_date = newDate;
        },
        validate() {
            var res = true;
            this.$refs.validate.$children.map(item => {
                if (('valid' in item) && !item.valid && ('iconType' in item)) {
                    item.blur();
                    res = false;
                };
            });
            return res;
        },
        supply() {
            if (!this.validate()) return;
            let formData = Object.assign({}, this.formData, {
                from_date: new Date(this.formData.from_date).getTime(),
                to_date: new Date(this.formData.to_date).getTime(),
            })
            axios.post(this.$store.state.host + '/order/orderManager/addOrder', formData)
                .then((response) => {
                    if (response.data.code == 1)
                        this.$router.push({ path: '/list' });
                    else
                        this.$vux.alert.show({
                            title: '提示',
                            content: response.data.msg,
                        })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        // 设置日期默认值
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        this.dateDefaultStart = this.dateDefaultEnd = this.formData.from_date = this.formData.to_date = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    },
    components: {
        Flexbox,
        FlexboxItem,
        Group,
        Cell,
        XButton,
        XInput,
        Datetime,
        XNumber,
        Checker,
        CheckerItem
    }
}
</script>

<style type="text/css" scoped>
.apin-order {
    min-height: 100%;
}

.vux-flexbox .vux-flexbox-item.apin-btn-area {
    flex: none;
    padding: 1em;
    box-sizing: border-box;
}

.apin-select {
    padding: 0 20px;
    border: 1px solid #ccc;
    display: inline-block;
    line-height: 25px;
    text-align: center;
    margin-right: 5px;
}

.apin-selected {
    color: #fff;
    background-color: #09bb07;
    border-color: #09bb07;
}
</style>