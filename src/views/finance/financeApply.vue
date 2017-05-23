<template>
    <flexbox orient="vertical" :gutter="0" class="apin-order">
        <flexbox-item class="apin-form-area">
            <group label-width="5em" label-margin-right="1.5em" ref="validate">
                <datetime
                title="申请日期"
                v-model="startTime" 
                :start-date="dateDefaultStart"
                value-text-align="left"
                onfirm-text="确认"
                cancel-text="取消"></datetime>
                <x-input title="用款用途" placeholder="必填" v-model="agencyCity" required></x-input>
                <x-input title="用款方式" placeholder="必填" v-model="agencyName" required></x-input>
                <x-input title="用款金额（大写）" placeholder="必填" v-model="startCity" required></x-input>
                <x-input title="用款金额（小写）" placeholder="必填" v-model="startCity" required type="number"></x-input>
                <x-input title="用款部门" placeholder="必填" v-model="arriveCity" required></x-input>
                <x-input title="合同号" placeholder="必填" v-model="startCity" required type="number"></x-input>
                <x-input title="申请人" placeholder="必填" v-model="arriveCity" required></x-input>
                <datetime
                title="约定交货期或报账期"
                v-model="startTime" 
                value-text-align="left"
                onfirm-text="确认"
                cancel-text="取消"></datetime>
                <x-input title="部门负责人" placeholder="必填" v-model="arriveCity" required></x-input>
                <x-input title="收款单位全称" placeholder="必填" v-model="arriveCity" required></x-input>
                <x-input title="财务签批" placeholder="必填" v-model="arriveCity" required></x-input>
                <x-input title="账号" placeholder="必填" v-model="arriveCity" required type="number"></x-input>
                <x-input title="主管签批" placeholder="必填" v-model="arriveCity" required></x-input>
                <x-input title="开户银行" placeholder="必填" v-model="arriveCity" required></x-input>
            </group>
        </flexbox-item>
        <flexbox-item class="apin-btn-area">
            <x-button type="primary" class="apin-btn" @click.native="apply">确认</x-button>
        </flexbox-item>
    </flexbox>
</template>

<script>
import { Flexbox, FlexboxItem, Group, XInput, Datetime, XNumber, XButton } from 'vux'
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
        validate() {
            this.$refs.validate.$children.map(item => {
                if (('valid' in item) && !item.valid && ('iconType' in item)) item.blur();
            });
        },
        apply() {
            if (this.validate()) ;
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
        XButton,
        XInput,
        Datetime,
        XNumber
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