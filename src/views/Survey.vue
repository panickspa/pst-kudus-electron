<template>
    <div @submit.stop.prevent @submit="saveSurvey" class="survey d-flex flex-column justify-content-center">
        <b-container fluid>
            <h1 class="mb-4">Survey Kepuasan</h1>
            <b-form class="form-survey">
                <b-form-group label="Nama Lengkap" label-for="nama">
                    <b-form-input v-model="nama" id="nama" name="nama" type="text" placeholder="Nama Lengkap Anda"></b-form-input>
                </b-form-group>
                <b-form-group label="Email" label-for="email">
                    <b-form-input v-model="email" id="email" name="email" type="email" placeholder="Email Anda"></b-form-input>
                </b-form-group>
                <b-form-group label="Jenis Pelayanan" label-for="pelayanan">
                    <b-form-checkbox-group
                        id="pelayanan"
                        v-model="pelayanan"
                        :options="pelayananOpt"
                        name="pelayanan"
                    ></b-form-checkbox-group>
                </b-form-group>
                <b-form-group label="Apakah anda puas dengan pelayanan kami?" label-for="kepuasan">
                    <b-form-radio-group
                        id="kepuasan"
                        v-model="kepuasan"
                        :options="kepuasanOpt"
                    ></b-form-radio-group>
                </b-form-group>
                <b-form-group label="Saran dan Masukan" label-for="saran">
                    <b-form-textarea
                        v-model="saran"
                        id="saran"
                        name="saran"
                        placeholder="Saran dan masukan anda"
                        rows="3"
                        max-rows="6"
                    ></b-form-textarea>
                </b-form-group>
                <b-button squared type="submit">Kirim</b-button>
            </b-form>
        </b-container>
        {{pelayanan.join()}}
        {{kepuasan}}
    </div>
</template>

<script>
/* eslint-disable */
const {ipcRenderer} = require("electron")
    export default {
        methods: {
            saveSurvey(){
                // ipcRenderer.send('insert-survey', evt)
                ipcRenderer.send('insert-survey', {
                    nama: this.nama,
                    email: this.email,
                    kepuasan: this.kepuasan,
                    layanan: this.pelayanan.join(),
                    saran: this.saran
                })
            }
        },
        data() {
            return {
                pelayananOpt: [
                    {
                        text: 'Perpustakaan Tercetak',
                        value: 0
                    },
                    {
                        text: 'Perpustakaan Digital',
                        value: 1
                    },
                    {
                        text: 'Data Mikro',
                        value: 2
                    },
                    {
                        text: 'Konsultasi Statistik',
                        value: 3
                    },
                    {
                        text: 'Penjualan softcopy/hardcopy',
                        value: 4
                    },
                    {
                        text: 'Rekomendasi Statistik',
                        value: 5
                    }
                ],
                kepuasanOpt:[
                    {
                        text: 'Puas',
                        value: 1
                    },
                    {
                        text: 'Tidak Puas',
                        value: 0
                    }
                ],
                pelayanan: [],
                kepuasan:'',
                nama: '',
                email: '',
                saran: ''
            }
        },
    }
</script>
<style>
    .survey{
        width: 100%;
        height: 100vh;
    }
    .form-survey input, .form-survey textarea{
        border-radius: 0%;
    }
</style>