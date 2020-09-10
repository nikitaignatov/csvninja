<template>
  <div class="hello">
    <textarea v-model="input" rows="5" cols="80"></textarea>
    <textarea v-model="labelsInput" rows="5" cols="80"></textarea>
    <br />
    <select v-model="columns" multiple>
      <option disabled value="0">Please select one</option>
      <option v-for="column in headers" :key="column" v-bind:value="column">{{column}}</option>
    </select>
    <select v-model="selectedLabel">
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
    },
    onSelection: function(chartContext, { xaxis, yaxis }) {
      console.log(chartContext, xaxis, yaxis);
      console.log(
        this.selectedLabel,
        Math.round(xaxis.min),
        Math.round(xaxis.max)
      );
      for (var i = Math.round(xaxis.min); i < xaxis.max; i++) {
        this.data[3][i] = this.selectedLabel;
      }
      console.log(this.data[3]);
      var csv = _.unzip(this.data).map(x => x.join(","));
      csv = _.concat(this.headers.join(","), csv);
      csv = csv.join("\n");
      this.input = csv;
    }
  },
  computed: {
    data: function() {
      return this.converted.map(x => x.slice(1));
    },
    series: function() {
      var data = this.data;
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
    },
    labels: function() {
      return this.labelsInput.split("\n");
    }
  },
  data: function() {
    return {
      labelsInput: "unknown\nrest\nswing up\nswing down\nswitch hand",
      input:
        "x,y,z,label\n30,10,5\n40,2,44\n50,21,24\n50,21,24\n50,21,24\n5,21,24\n30,21,24\n50,21,24\n51,21,24\n10,21,24",
      columns: [],
      selectedLabel: 0,
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
          type: "area",
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: false,
              zoomout: false,
              pan: true,
              reset: true
            },
            autoSelected: "selection"
          },
          selection: {
            enabled: true,
            type: "x",
            fill: {
              color: "#24292e",
              opacity: 0.1
            },
            stroke: {
              width: 1,
              dashArray: 3,
              color: "#24292e",
              opacity: 0.4
            },
            xaxis: {
              min: undefined,
              max: undefined
            },
            yaxis: {
              min: undefined,
              max: undefined
            }
          },
          zoom: {
            enabled: true,
            type: "x",
            autoScaleYaxis: false,
            zoomedArea: {
              fill: {
                color: "#90CAF9",
                opacity: 0.4
              },
              stroke: {
                color: "#0D47A1",
                opacity: 0.4,
                width: 1
              }
            }
          },
          events: {
            selection: this.onSelection,
            zoomed: function(chartContext, { xaxis, yaxis }) {
              console.log(chartContext, xaxis, yaxis);
            }
          }
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