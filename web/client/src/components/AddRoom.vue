<template>
    <article>
        <form @submit.prevent="addroom">
            <h1>Create a room</h1>
            <input v-model="name" name="name" placeholder=" ">
            <label>
                <icon icon="signpost"/>
                {{roomNameLabel}}
            </label>
            <input v-model="date" type="date">
            <label>
                <icon icon="calendar2-date"/>
                {{dateLabel}}
            </label>
            <TimeInput v-model="time" />
            <select v-model="mode" name="mode">
                <option value="0" selected>Mode</option>
                <option v-for="mode in modes" :key="mode.id" :value="mode.id">{{mode.name}}</option>
            </select>
            <label>
                <icon icon="controller"/>
                {{modeLabel}}
            </label>
            <button><icon icon="plus-square-fill" />Create</button>
            <div class="error" v-if="error" v-html="error"></div>
        </form>
    </article>
</template>

<script>
import TimeInput from './forms/TimeInput'
import RoomService from '@/services/RoomService'

export default {
    components: { TimeInput },
    data () {
        return {
            name: '',
            date: (new Date()).toJSON().slice(0, 10),
            modes: [],
            mode: '0',
            error: null,
            roomNameLabel: 'Room Name',
            dateLabel: 'Date',
            modeLabel: 'Mode',
            time: {
                hour: '22',
                minute: '00'
            }
        }
    },
    mounted: async function () {
        const modes = await RoomService.modes()
        this.modes = modes.modes
    },
    methods: {
        async addroom () {
            try {
                await RoomService.createRoom({
                    name: this.name,
                    date: this.date,
                    mode: this.mode,
                    hour: this.time.hour,
                    minute: this.time.minute
                })

                this.error = null
                this.$router.push('/room-success')
            } catch (error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>
