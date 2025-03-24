<template>
  <div class="flex flex-col col-span-full sm:col-span-6 overflow-x-auto">

    <div v-if="showData.length" class="bg-white dark:bg-gray-800 shadow-xs rounded-xl flex flex-col justify-center">
      <table class="table-auto w-full dark:text-gray-300" cellspacing="0">
        <thead class="text-l uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs">
          <tr>
            <th v-for="(value, idx) in headers" scope="col" class="p-3 font-semibold" :key="value" :class="`${idx == this.greenYear ? 'text-green-500': ''} ${getWidth(idx)}`">
              <div class="flex" :class="`${idx == 0 ? '': 'justify-center'}`">
                {{ value }}
                <img v-if="sortStatus[idx] == 0" :src="OriginSVG" @click="changeSortStatus(idx)">
                <img v-else-if="sortStatus[idx] == 1" :src="AscendSVG" @click="changeSortStatus(idx)">
                <img v-else-if="sortStatus[idx] == -1" :src="DescendSVG" @click="changeSortStatus(idx)">
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
          <tr v-for="item in showUnitData" :key="item.category">
            <td :title="item.category" class="p-3">
              <div class="flex items-center fix-width-l fixed-col dark:text-gray-100 font-medium text-start">
                {{ item.category }}
              </div>
            </td>
            <td :title="item.label" class="p-3">
              <div class="flex items-center fix-width-m fixed-col justify-center">
                <StatusCard :label="item.label"></StatusCard>
              </div>
            </td>
            <td v-for="(value, idx) in item.values" :key="value" class="p-3 text-center" :class="`${idx == this.greenYear-2 ? 'text-green-500': ''}`"> {{ formatValue(value) }}
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination v-if="showData.length" :pageSize="showUnit" :total="showData.length" @updateIndex="updateIndex"></Pagination>
    </div>

  </div>
</template>

<script>
  import { formatValue } from '../utils/Utils';
  import Pagination from "../components/Pagination.vue";
  import OriginSVG from "../images/original.svg";
  import AscendSVG from "../images/ascend.svg";
  import DescendSVG from "../images/descend.svg";
import StatusCard from '../components/StatusCard.vue';

  export default {
    name: "Table",
    components: { Pagination, StatusCard },
    props: ['dataset', 'headers', 'searchData', 'selectedFilters'],
    data() {
      return {
        showUnitData: [],
        showData: [],
        showUnit: 10,
        pageStart: 0,
        pageEnd: this.showUnit,
        greenYear: 7,

        // -2 for display:none; 1 for ascending; -1 for descending; 0 for original order
        sortStatus: [-2, -2],
        changedIdx: -1,
        AscendSVG,
        DescendSVG,
        OriginSVG
      };
    },
    watch: {
      searchData(newV, _oldV) {
        this.showData = []
        for (let item of this.dataset) {
          if (item.category.toLowerCase().includes(newV) && this.selectedFilters.indexOf(item.label) > -1) {
            this.showData.push(item);
          }
        }
        this.showUnitData = this.showData.slice(0, this.showUnit);
      },
      selectedFilters(newV, _oldV) {
        this.showData = []
        for (let item of this.dataset) {
          if (newV.indexOf(item.label) > -1 && item.category.toLowerCase().includes(this.searchData)) {
            this.showData.push(item);
          }
        }
        this.showUnitData = this.showData.slice(0, this.showUnit);
      },
      sortStatus: {
        handler(newValue, oldValue) {
          if (this.changedIdx == -1) {
            // Restore the original order
            this.showData.sort((a, b) => a['index'] - b['index']);
          } else if (this.sortStatus[this.changedIdx] == 1) {
            // Ascending
            this.showData.sort((a, b) => a.values[this.changedIdx - 2] - b.values[this.changedIdx - 2]);
          } else if (this.sortStatus[this.changedIdx] == -1) {
            // Descending
            this.showData.sort((a, b) => b.values[this.changedIdx - 2] - a.values[this.changedIdx - 2]);
          }
          this.showUnitData = this.showData.slice(this.pageStart, this.pageEnd);
        },
        deep: true,
      }
    },
    created() {
      for (let i = 0; i <= this.headers.length; i++) {
        this.sortStatus.push(0);
      }
      this.sortStatus[this.greenYear] = -2;  // 2019
      this.showData = this.dataset;
      this.showUnitData = this.showData.slice(this.pageStart, this.pageEnd);
    },
    methods: {
      updateIndex(start, end) {
        this.pageStart = start;
        this.pageEnd = end;
        this.showUnitData = this.showData.slice(start, end)
      },
      formatValue(value) {
        if (value == 0) return '-';
        return formatValue(value);
      },
      changeSortStatus(idx) {
        if (this.sortStatus[idx] == 0) {
          // Descending
          this.sortStatus[idx] = -1;
          if (this.changedIdx != -1) {
            this.sortStatus[this.changedIdx] = 0;
          }
          this.changedIdx = idx;
        }
        else if (this.sortStatus[idx] == -1) {
          // Ascending
          this.sortStatus[idx] = 1;
        }
        else {
          this.changedIdx = -1;
          this.sortStatus[idx] = 0;
        }
      },
      getWidth(idx) {
        if (idx == 0) return 'fix-width-l fixed-col';
        if (idx == 1) return 'fix-width-m fixed-col';
        else return '';
      }
    },
  }
</script>

<style scoped>
  img {
    width: 20px;
    cursor: pointer;
  }

  .fix-width-l {
    width: 10rem;
  }

  .fix-width-m {
    width: 5.5rem;
  }

  .fixed-col {
    position: sticky;
    left: 0;
    z-index: 1;
  }
</style>