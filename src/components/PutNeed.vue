<template>
    <flexbox orient="vertical" :gutter="0" class="apin-order">
        <flexbox-item class="apin-form-area">
            <group label-width="5em" label-margin-right="1.5em">
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
                <datetime title="开始日期" v-model="time1" :start-date="today" value-text-align="left" confirm-text="确认" cancel-text="取消"></datetime>
                <datetime title="结束日期" v-model="time2" :start-date="today" value-text-align="left" confirm-text="确认" cancel-text="取消"></datetime>
                <x-address title="旅行社城市" v-model="addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
                <x-input title="旅行社名称" placeholder="必填" v-model="agencyName"></x-input>
                <x-address title="出发城市" v-model="startCity" raw-value :list="addressData" value-text-align="left"></x-address>
                <x-address title="到达城市" v-model="arriveCity" raw-value :list="addressData" value-text-align="left"></x-address>
                <x-input title="返程天数" type="number" placeholder="必填" v-model="days"></x-input>
                <x-input title="出行人数" type="number" placeholder="必填" v-model="number"></x-input>
                <x-input title="儿童人数" type="number" placeholder="必填" v-model="child"></x-input>
            </group>
        </flexbox-item>
        <flexbox-item class="apin-btn-area">
            <x-button type="primary" class="apin-btn" @click.native="supply">供应商报价</x-button>
        </flexbox-item>
    </flexbox>
</template>

<script>
import { Flexbox, FlexboxItem, XButton,Range, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea,Checker, CheckerItem } from 'vux'
export default {
  data () {
    return {
        
        value1: '张三',
        value2: '工艺技术',
        value3: '',
        value7: '',
        value8: '',
        value4: '',
        value5: ['A'],
        value6: [],
        list: [['A', 'B', 'C']],
        numberValue: 0,

        today: '',
        zone: '1',
        person: '1',
        people: '1',
        time1: '',
        time2: '',
        addressData: ChinaAddressData,
        addressValue: [],
        agencyName:'',
        startCity: [],
        arriveCity: [],
        days: '',
        number: '',
        child: 0
    }
  },
  components: {
      Flexbox, FlexboxItem, XButton,
    Group,
    Cell,
    XInput,
    Selector,
    PopupPicker,
    XAddress,
    Datetime,
    XNumber,
    XTextarea,
    Checker, CheckerItem,Range
  },
  mounted () {
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
        this.today = this.time1 = this.time2 = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  }

//   methods: {
//       getNowFormatDate() {
// 			var date = new Date();
// 			var seperator1 = "-";
// 			var seperator2 = ":";
// 			var month = date.getMonth() + 1;
// 			var strDate = date.getDate();
// 			if (month >= 1 && month <= 9) {
// 				month = "0" + month;
// 			}
// 			if (strDate >= 0 && strDate <= 9) {
// 				strDate = "0" + strDate;
// 			}
// 			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
// 			return currentdate;
// 		},
// 		// 弹出框
// 		showMessage(info) {
// 			this.info = info;
// 			$("#iosDialog").fadeIn(200);
// 		},
// 		// 日期验证
// 		validateDate(event) {
// 			var element = event.target;
// 			var value = element.value;
// 			var date = new Date(value);
// 			var today = new Date();
// 			if (startDate && (!endDate || endDate && (startDate > endDate))) {
// 				this.endDate = startDate;
// 				return false;
// 			}
// 			if (element.id == 'startDate' && (date < today || !value)) {
// 				var mydate = getNowFormatDate();
// 				$(element).val(mydate);
// 				return;
// 			}
// 		},
// 		// 非空、数字验证
// 		validateRequired() {
// 			var validates = $(".validate");
// 			for (var i = 0; i < validates.length; i++) {
// 				var item = $(validates[i]);
// 				var name = item.data('name');
// 				var val = item.val();
// 				if (!val) {
// 					showMessage(name + '不能为空！');
// 					item.val('')
// 					break;
// 				}
// 			}
// 		}

//   },
//   mounted () {
// 		$("#startDate, #endDate").on('change', function () {
// 			validateDate(event);
// 		})

// 		$("#hideDialog").on('click', function () {
// 			$("#iosDialog").fadeOut(200);
// 		})
// 		$("#showTooltips").on('click', function () {
// 			validateRequired();
// 		}
// 		)
// 			var date = this.getNowFormatDate();
// 			this.startDate = this.endDate = date;
//   }
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