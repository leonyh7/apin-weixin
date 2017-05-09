<template>
    <flexbox orient="vertical" :gutter="0" class="apin-order">
        <flexbox-item class="apin-form-area">
            <group label-width="5em" label-margin-right="1.5em" ref="validate">
                <cell title="区域" value-align="left">
                    <checker v-model="zone" default-item-class="apin-select" selected-item-class="apin-selected">
                        <checker-item value="1">国内</checker-item>
                        <checker-item value="2">国外</checker-item>
                    </checker>
                </cell>
                <cell title="团散" value-align="left">
                    <checker v-model="person" default-item-class="apin-select" selected-item-class="apin-selected">
                        <checker-item value="1">散客</checker-item>
                        <checker-item value="2">团队</checker-item>
                    </checker>
                </cell>
                <cell title="人员" value-align="left">
                    <checker v-model="people" default-item-class="apin-select" selected-item-class="apin-selected">
                        <checker-item value="1">计调</checker-item>
                        <checker-item value="2">员工</checker-item>
                    </checker>
                </cell>
                <datetime title="开始日期" v-model="startTime" :start-date="dateDefaultStart" value-text-align="left" confirm-text="确认" cancel-text="取消" @on-change="changeStart"></datetime>
                <datetime title="结束日期" v-model="endTime" :start-date="dateDefaultEnd" value-text-align="left" confirm-text="确认" cancel-text="取消"></datetime>
                <x-input title="旅行社城市" placeholder="必填" v-model="agencyCity" value-text-align="left" required></x-input>
                <x-input title="旅行社名称" placeholder="必填" v-model="agencyName" required ref="agencyName"></x-input>
                <x-input title="出发城市" placeholder="必填" v-model="startCity" value-text-align="left" required></x-input>
                <x-input title="到达城市" placeholder="必填" v-model="arriveCity" value-text-align="left" required></x-input>
                <x-input title="返程天数" type="number" placeholder="必填" v-model="days" required></x-input>
                <x-input title="出行人数" type="number" placeholder="必填" v-model="total" required></x-input>
                <x-input title="儿童人数" type="number" placeholder="必填" v-model="child" required></x-input>
            </group>
        </flexbox-item>
        <flexbox-item class="apin-btn-area">
            <x-button type="primary" class="apin-btn" @click.native="supply">发布</x-button>
        </flexbox-item>
    </flexbox>
</template>

<script>
import { Flexbox, FlexboxItem, Group, Cell, XInput, Datetime, XNumber, XButton, Checker, CheckerItem } from 'vux'
export default {
    data() {
        return {
            dateDefaultStart: '',
            dateDefaultEnd: '',
            zone: '1',
            person: '1',
            people: '1',
            startTime: '',
            endTime: '',
            agencyCity: '',
            agencyName: '',
            startCity: '',
            arriveCity: '',
            days: '',
            total: '',
            child: '0'
        }
    },
    methods: {
        changeStart(newDate) {
            this.dateDefaultEnd = newDate;
            if (newDate > this.endTime) this.endTime = newDate;
        },
        validate() {
            this.$refs.validate.$children.map(item => {
                if(('valid' in item) && !item.valid && ('iconType' in item)) item.iconType = 'error';
            });
        },
        supply() {
            if (this.validate()) this.$router.push({ path: '/list' });
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
        this.dateDefaultStart = this.dateDefaultEnd = this.startTime = this.endTime = date.getFullYear() + seperator1 + month + seperator1 + strDate;
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
    height: 100%;
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