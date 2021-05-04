<template>
    <div class="w-100 d-flex flex-row">
        <div class="side-background"></div>
        <div class="survey d-flex flex-column justify-content-center">
            <b-container>
                <h1 class="mb-4">Survey Kepuasan</h1>
                <b-form @submit.stop.prevent @submit="saveSurvey" class="form-survey">
                    <b-form-group label="Nama Lengkap" label-for="nama" required>
                        <b-form-input required v-model="nama" id="nama" name="nama" type="text" placeholder="Nama Lengkap Anda"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Email" label-for="email" required>
                        <b-form-input required v-model="email" id="email" name="email" type="email" placeholder="Email Anda"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Jenis Pelayanan" label-for="pelayanan" >
                        <b-form-checkbox-group
                            id="pelayanan"
                            v-model="pelayanan"
                            :options="pelayananOpt"
                            name="pelayanan"
                            required
                        ></b-form-checkbox-group>
                    </b-form-group>
                    <b-form-group label="Apakah anda puas dengan pelayanan kami?" label-for="kepuasan">
                        <b-form-radio-group
                            id="kepuasan"
                            v-model="kepuasan"
                            :options="kepuasanOpt"
                            required
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
                    <div class="d-flex flex-row justify-content-end">
                        <b-button squared type="submit">Kirim Survey</b-button>
                    </div>
                </b-form>
            </b-container>
        </div>
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
                this.$router.push("/")
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
        width: 78%;
        height: 100vh;
    }
    .side-background{
        width: 22%;
        height: 100vh;
        background-image: url('../assets/pelayanan.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .form-survey input, .form-survey textarea{
        border-radius: 0%;
    }
</style>