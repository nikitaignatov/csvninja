<template>
  <div class="hello">
    <textarea v-model="input" rows="5" cols="80"></textarea>
    <br />
    <select v-model="columns" multiple>
      <option disabled value="0">Please select one</option>
      <option v-for="column in headers" :key="column" v-bind:value="column">{{column}}</option>
    </select>
    <select v-model="selected">
      <option disabled value="0">Please select one</option>
      <option v-for="label in labels" :key="label" v-bind:value="label">{{label}}</option>
    </select>
    <div v-for="s in series" :key="s.name">
      <apexchart :options="options" height="160" width="800" v-if="contains(s.name)" :series="[s]"></apexchart>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    contains: function(s) {
      return _.includes(this.columns, s);
    }
  },
  computed: {
    series: function() {
      var data = this.converted.map(x => x.slice(1));
      return this.headers.map((x, i) => {
        return { name: x, data: data[i] };
      });
    },
    converted: function() {
      var lines = this.input.split("\n").map(x => x.split(","));
      return _.zip.apply(_, lines);
    },
    headers: function() {
      return this.converted.map(x => x.slice(0, 1)[0]);
    }
  },
  data: function() {
    return {
      input:
        "x,y,z,label\n30,10,5\n40,2,44\n50,21,24\n50,21,24\n50,21,24\n5,21,24\n30,21,24\n50,21,24\n51,21,24\n10,21,24",
      columns: [],
      labels: ["unknown", "swing_up", "swing_down"],
      selected: 0,
      options: {
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        markers: {
          size: 4
        },
        chart: {
          height: 60,
          id: "vuechart-example.1",
          group: "items",
          type: "area"
        },
        xaxis: {
          type: "numeric"
        },
        yaxis: {
          labels: {
            minWidth: 40
          }
        }
      }
    };
  }
};
</script> 