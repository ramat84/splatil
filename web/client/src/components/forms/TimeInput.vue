<template>
    <div class="time_input">
        <select name="hours" ref="hour" v-model="hour" @change="updateValues">
            <option disabled value="">Hour</option>
            <option v-for="hour in hours" :key="hour">{{hour}}</option>
        </select>
        <label>
            <icon icon="watch"/>
            {{hourLabel}}
        </label>
        <select name="minutes" ref="minute" v-model="minute" @change="updateValues">
            <option disabled value="">Minute</option>
            <option v-for="minute in minutes" :key="minute">{{minute}}</option>
        </select>
        <label>
            <icon icon="watch"/>
            {{minuteLabel}}
        </label>
    </div>
</template>
<script>
export default {
    name: 'Time',
    data () {
        return {
            hours: [],
            minutes: [],
            hour: '22',
            minute: '00',
            hourLabel: 'Hour',
            minuteLabel: 'Minute'
        }
    },
    mounted () {
        for (let i = 23; i >= 0; i--) {
            this.hours.push(i.toString().padStart(2, '0'))
        }
        for (let i = 0; i <= 50; i += 10) {
            this.minutes.push(i.toString().padStart(2, '0'))
        }
    },
    methods: {
        updateValues () {
            this.$emit('input', {
                hour: this.$refs.hour.value,
                minute: this.$refs.minute.value
            })
        }
    }
}
</script>
