<template>
  <div class="about__detail">
    <div class="text__header">Hotel Detail</div>
    <el-form
      label-width="100px"
      :model="hotelDetails"
      style="max-width: 660px"
    >
      <el-form-item label="Name">
        <el-input v-model="hotelDetails.name" />
      </el-form-item>
      <el-form-item label="Country">
        <el-input v-model="hotelDetails.location.country" />
      </el-form-item>
      <el-form-item label="Address">
        <el-input v-model="hotelDetails.location.address" />
      </el-form-item>
      <el-form-item label="City">
        <el-input v-model="hotelDetails.location.city" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="loading" type="primary" @click="getUpdatDetails(hotelDetails)">
          {{ loading ? 'Saving...' : 'Submit' }}
        </el-button>
        <el-button @click="this.$router.push('/facts')">Back</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ElNotification } from 'element-plus';
import axios from 'axios';
import config from '../config';

export default {
  name: 'Home',
  data() {
    return {
      loading: false,
      errors: [],
      hotelDetails: {
        name: '',
        location: {
          address: '',
          city: '',
          country: '',
        },
      },
    };
  },
  mounted() {
    this.getDetails();
  },
  methods: {
    async getDetails() {
      try {
        const { id: detailId } = this.$route.params; // get id from url
        const { apiUrl } = config;
        this.loading = true;
        const response = await axios.get(`${apiUrl}/property/${detailId}`);
        const { data } = response.data;
        this.hotelDetails = data?.[0].property || [];
      } catch (e) {
        console.error({ message: e.message });
        // error handling stuff
        // push into array so we can store several error if any
        this.errors = [e];
      } finally {
        this.loading = false;
      }
    },
    async getUpdatDetails({ name, location }) {
      try {
        const { id: detailId } = this.$route.params;
        const { apiUrl } = config;
        this.loading = true;
        const payload = { name, location: JSON.stringify(location) };
        const response = await axios.put(`${apiUrl}/property/${detailId}`, payload);
        const { data } = response;

        if (data?.message) {
          ElNotification({
            title: 'Success',
            message: data.message,
            type: 'success',
          });

          // redirect into list page
          this.$router.push('/facts');
        }
      } catch (e) {
        console.error({ message: e.message });
        // error handling stuff
        // push into array so we can store several error if any
        this.errors = [e];
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
  .text__header {
    font-size: 1.3rem;
  }
</style>
