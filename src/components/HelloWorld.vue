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
    <button @click="annotateData">annotate</button>
    <div>
      <apexchart
        :options="options"
        height="300"
        width="800"
        :series="series.filter(x=>contains(x.name))"
      ></apexchart>
    </div>
    <h2>Output</h2>
    <pre>{{output}}</pre>
  </div>
</template>

<script>
import _ from "lodash";
const LABEL = "label";

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
      if (!yaxis) return;
      this.range = { from: Math.round(xaxis.min), to: Math.round(xaxis.max) };
    },
    annotateData: function() {
      for (var i = this.range.from; i < this.range.to; i++) {
        this.data[this.headers.indexOf(LABEL)][i] = this.selectedLabel;
      }
      this.convert();
      this.addAnnotation();
    },
    addAnnotation: function() {
      var m = this.options.annotations.xaxis;
      console.log("ann", m);
      m.push({
        x: this.range.from,
        x2: this.range.to,
        fillColor: "#B3F7CA",
        label: {
          text: this.selectedLabel
        }
      });
      this.options = {
        annotations: {
          xaxis: m
        }
      };
    },
    convert: function() {
      var data = _.unzip(this.data);
      var csv = data.map(x => x.join(","));
      csv = _.concat(this.headers.join(","), csv);
      csv = csv.join("\n");
      this.output = csv;
    }
  },
  computed: {
    annotations: function() {
      return [];
    },
    data: function() {
      var xs = this.converted.map(x => x.slice(1));
      for (var i = 0; i < xs[0].length; i++) {
        if (xs[this.headers.indexOf(LABEL)]) {
          xs[this.headers.indexOf(LABEL)][i] = this.labels[0];
        } else {
          xs.push([this.labels[0]]);
        }
      }
      return xs;
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
      var xs = this.converted.map(x => x.slice(0, 1)[0]);
      if (xs.indexOf(LABEL) < 0) {
        xs.push(LABEL);
      }
      console.log(xs);
      return xs;
    },
    labels: function() {
      return this.labelsInput.split("\n");
    }
  },
  data: function() {
    return {
      range: { from: null, to: null },
      labelsInput: "unknown\nrest\nswing up\nswing down\nswitch hand",
      output: "no labels",
      input:
        "x,y,z,label\n1,10,5\n2,2,44\n3,21,24\n5,21,24\n7,20,4\n5,18,4\n4,14,4\n2,21,2\n1,19,2\n2,21,5\n3,17,5\n3.5,12,1\n4,8,7\n5,1,30\n6,5,24\n7,12,17\n8,19,1\n9,21,3\n10,17,9\n11,19,2\n10,20,-4\n6,29,-9\n3,26,-1\n2,32,5\n4,33,12\n8,15,18",
      columns: [],
      selectedLabel: 0,
      options: {
        annotations: { xaxis: [] },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight",
          width: 1
        },
        markers: {
          size: 0
        },
        chart: {
          height: 160,
          id: "vuechart-example.1",
          group: "items",
          type: "line",
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
              color: "#222",
              opacity: 0.1
            },
            stroke: {
              width: 1,
              dashArray: 3,
              color: "#000",
              opacity: 0.4
            }
          },
          zoom: {
            enabled: true,
            type: "x"
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
        }
      }
    };
  }
};
</script> 