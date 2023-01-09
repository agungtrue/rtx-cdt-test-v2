<template>
  <div class="about">
    <!-- 8.
      Display the data with a structured table in following columns,
      element-ui is ready for use
    -->
    <!-- loading -->
    <div v-if="loading">Please wait...</div>
    <!-- error handling stuff -->
    <div v-else-if="errors.length" v-for="err in errors" :key="err.message">
      <p>
        {{ err.message }}
        {{ err.response?.config ? `your requested: ${err.response.config.url}` : '' }}
      </p>
    </div>
    <!-- no data -->
    <div v-else-if="!hotels.length">No data</div>
    <!-- data exists -->
    <div class="table-container" v-if="hotels.length">
      <el-table
        :data="hotels"
        stripe style="width: 100%; margin-bottom: 15px;"
      >
        <el-table-column prop="property.name" label="Property Name" width="300" />
        <el-table-column prop="property.location.country" label="Country" width="180" />
        <el-table-column prop="property.trustYou.score" label="Score" />
        <el-table-column prop="property.name" label="Operations" width="180">
            <!-- <DropDown :property="scope.row.property"/> -->
            <template #default="scope">
              <el-dropdown>
                <span class="el-dropdown-link">
                  Action
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      @click.prevent="updateProperty(scope.row.property)"
                    >
                        Edit
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.prevent="deleteProperty(scope.row.property)"
                    >
                      Delete
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :page-sizes="[5, 10]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- property.name | property.location.country | property.reviews.summary.score -->
    <!-- 9. Do a simple pagination of 5 per page-->
    <!-- 10. Hide the entry without country and/or score-->

  </div>
</template>

<style>
  .about {
    padding: 0 4rem 0 4rem;
  }

  .about .table-container .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
</style>

<script>
// import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';
import config from '../config';

export default {
  data() {
    return {
      loading: false,
      hotels: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      errors: [],
    };
  },
  components: {
    // Modal,
  },
  mounted() {
    // call api
    this.getHotels();
  },
  methods: {
    async getHotels(offset = 0, limit = 5) {
      try {
        const queryParams = `?offset=${offset}&limit=${limit}`;
        const { apiUrl } = config;
        this.loading = true;
        const response = await axios.get(`${apiUrl}/property${queryParams}`);
        const { data, total } = response.data;
        this.hotels = this.filterResponse(data || []);
        this.total = total;
      } catch (e) {
        console.error({ message: e.message });
        // error handling stuff
        // push into array so we can store several error if any
        this.errors = [e];
      } finally {
        this.loading = false;
      }
    },
    filterResponse(payload) {
      return payload.filter(
        // filter has with country and score
        (hotel) => (hotel.property?.location?.country && hotel.property?.trustYou?.score),
      );
    },
    async handleCurrentChange(page) {
      const { offset, limit } = this.handleQueryParamsPagination({ pageParams: page });
      await this.getHotels(offset, limit);
    },
    async handleSizeChange(size) {
      const { offset, limit } = this.handleQueryParamsPagination({ sizeParams: size });
      await this.getHotels(offset, limit);
    },
    handleQueryParamsPagination({ pageParams, sizeParams }) {
      // if sizeParams changed, then we need to set to default
      // means was 0, else just do pagination things
      const offset = sizeParams ? 0 : ((pageParams || this.currentPage) - 1) * this.pageSize;
      const limit = sizeParams || this.pageSize;
      console.info({
        offset, limit, pageParams, sizeParams,
      });

      // update state
      if (pageParams) {
        this.currentPage = pageParams;
      } else if (sizeParams) {
        // reset to page 1
        this.resetPages();
      }

      return { offset, limit };
    },
    resetPages() {
      this.currentPage = 1;
      this.pageSize = 5;
    },
    async updateProperty({ id }) {
      console.info({ id });
      this.$router.push(`/fact/${id}`);
    },
    async deleteProperty({ id }) {
      try {
        ElMessageBox.alert('Are you sure you want to delete?', 'Confirmation', {
          confirmButtonText: 'Yes',
          callback: async (action) => {
            // if the action was confirm just call the api
            if (action === 'confirm') {
              const { apiUrl } = config;
              const { data: response } = await axios.delete(`${apiUrl}/property/${id}`); // start delete
              await this.getHotels(); // refresh page
              this.resetPages(); // back into default pages
              ElMessage({
                type: 'succes',
                message: `${response.message}`,
              });
            }
          },
        });
        // const { apiUrl } = config;
        // await axios.delete(`${apiUrl}/property/${id}`); // start delete
        // await this.getHotels(); // refresh page
        // this.resetPages(); // back into default pages
      } catch (e) {
        console.error({ message: e.message });
      }
    },
  },
};

</script>
