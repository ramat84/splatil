<template>
    <article>
        <div class="glass glass-full rooms">
            <div class="header">
                <h4>Rooms</h4>
                <!--
                <select name="modes">
                    <option>All Modes</option>
                </select>
                <select name="type">
                    <option>Open Rooms</option>
                </select>
                -->
            </div>
            <div class="list">
                <div v-for="room in rooms" :key="room.id" :class="'row icon-' + room.icon" :data-room="room.id">
                    <div class="name">
                        {{room.name}}
                        <div class="mode">{{modes['_' + room.mode].name}} | {{room.date}} {{room.time}}</div>
                    </div>
                    <div class="ppl">
                        <span>{{room.room_user_names}}</span>
                    </div>
                    <div class="ppl_count">{{room.user_count}}/{{room.max_users}}</div>
                    <div class="icon">
                        <button v-if="!room.my_room" alt="Enter" @click="Enter(room.id)"><icon icon="person-plus-fill" /></button>
                        <button v-if="room.my_room && room.user_count == 1" alt="Exit" @click="Exit(room.id)" ><icon icon="trash" /></button>
                        <button v-if="room.my_room && room.user_count > 1" alt="Exit" @click="Exit(room.id)" ><icon icon="door-closed" /></button>
                    </div>
                </div>
            </div>
            <div class="create"><button><icon icon="plus-square-fill" /><router-link to="addroom">Create a room</router-link></button></div>
        </div>
    </article>
</template>

<script>
import RoomService from '@/services/RoomService'
import UserService from '@/services/UserService'

let version = 0

export default {
    data () {
        return {
            rooms: [],
            modes: []
        }
    },

    props: {
        'checkInterval': null
    },

    methods: {
        Exit (roomId) {
            try {
                const iconEl = document.querySelector('[data-room="' + roomId + '"] .icon')
                iconEl.classList.add('loading')
                RoomService.exitRoom(roomId, async () => this.RefreshRooms)
                setTimeout(() => iconEl.classList.remove('loading'), 2000)
            } catch (err) {
                console.log(err)
            }
        },
        Enter (roomId) {
            try {
                const iconEl = document.querySelector('[data-room="' + roomId + '"] .icon')
                iconEl.classList.add('loading')
                RoomService.enterRoom(roomId, async () => this.RefreshRooms)
                setTimeout(() => iconEl.classList.remove('loading'), 2000)
            } catch (err) {
                console.log(err)
            }
        },
        SetRoomActions (rooms) {
            const userId = UserService.getUserId() + ''
            for (var i in rooms) {
                const userIds = rooms[i].room_user_ids.split(',')
                rooms[i].my_room = userIds.includes(userId)
            }
            return rooms
        },

        async CheckForUpdate () {
            const gotVersion = await RoomService.getVersion()
            if (gotVersion.version > version) {
                version = gotVersion.version
                this.RefreshRooms()
            }
        },

        async RefreshRooms () {
            const data = await RoomService.recent()
            this.rooms = data ? data.rooms : ''
            this.rooms = this.SetRoomActions(this.rooms)
        }
    },

    async mounted () {
        const modes = await RoomService.modes()
        this.modes = modes.modes

        this.RefreshRooms()
        this.checkInterval = setInterval(this.CheckForUpdate, 2500)
    },

    beforeDestroy () {
        clearInterval(this.checkInterval)
    }
}
</script>
